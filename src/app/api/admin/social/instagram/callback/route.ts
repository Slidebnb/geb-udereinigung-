import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';
import { encryptToken, hasTokenEncryptionKey } from '@/lib/token-crypto';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const error = req.nextUrl.searchParams.get('error');
  const state = req.nextUrl.searchParams.get('state');
  const expectedState = req.cookies.get('instagram_oauth_state')?.value;
  const baseUrl = process.env.NEXTAUTH_URL || '';

  const redirectWithClearedState = (target: string) => {
    const response = NextResponse.redirect(target);
    response.cookies.set('instagram_oauth_state', '', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/api/admin/social/instagram/callback',
      maxAge: 0,
    });
    return response;
  };

  if (!(await isAdmin())) {
    return redirectWithClearedState(`${baseUrl}/admin/social?error=unauthorized`);
  }

  if (error || !code || !state || !expectedState || state !== expectedState) {
    return redirectWithClearedState(`${baseUrl}/admin/social?error=oauth_failed`);
  }

  if (!hasTokenEncryptionKey()) {
    return redirectWithClearedState(`${baseUrl}/admin/social?error=token_key_missing`);
  }

  try {
    const clientId = process.env.META_APP_ID;
    const clientSecret = process.env.META_APP_SECRET;
    const redirectUri = `${baseUrl}/api/admin/social/instagram/callback`;

    // Access Token holen
    const tokenRes = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${clientSecret}&code=${code}`
    );
    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return redirectWithClearedState(`${baseUrl}/admin/social?error=token_failed`);
    }

    // Nutzerinfo holen
    const meRes = await fetch(
      `https://graph.facebook.com/v18.0/me?fields=id,name&access_token=${tokenData.access_token}`
    );
    const meData = await meRes.json();

    const accountId = meData.id || 'instagram';
    const expiresAt =
      tokenData.expires_in
        ? new Date(Date.now() + (tokenData.expires_in as number) * 1000)
        : null;

    // Token speichern (in Produktion verschlüsseln!)
    await prisma.socialAccount.upsert({
      where: { id: accountId },
      create: {
        id: accountId,
        platform: 'instagram',
        accountId: accountId,
        username: meData.name || null,
        accessToken: encryptToken(tokenData.access_token),
        tokenExpiresAt: expiresAt,
        status: 'connected',
      },
      update: {
        accessToken: encryptToken(tokenData.access_token),
        username: meData.name || null,
        tokenExpiresAt: expiresAt,
        status: 'connected',
      },
    });

    return redirectWithClearedState(`${baseUrl}/admin/social?success=connected`);
  } catch (err) {
    console.error('[instagram/callback]', err);
    return redirectWithClearedState(`${baseUrl}/admin/social?error=server_error`);
  }
}
