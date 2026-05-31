import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const error = req.nextUrl.searchParams.get('error');
  const baseUrl = process.env.NEXTAUTH_URL || '';

  if (error || !code) {
    return NextResponse.redirect(`${baseUrl}/admin/social?error=oauth_failed`);
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
      return NextResponse.redirect(`${baseUrl}/admin/social?error=token_failed`);
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
        accessToken: tokenData.access_token,
        tokenExpiresAt: expiresAt,
        status: 'connected',
      },
      update: {
        accessToken: tokenData.access_token,
        username: meData.name || null,
        tokenExpiresAt: expiresAt,
        status: 'connected',
      },
    });

    return NextResponse.redirect(`${baseUrl}/admin/social?success=connected`);
  } catch (err) {
    console.error('[instagram/callback]', err);
    return NextResponse.redirect(`${baseUrl}/admin/social?error=server_error`);
  }
}
