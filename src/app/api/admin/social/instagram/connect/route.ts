import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { isAdmin } from '@/lib/admin-guard';

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const clientId = process.env.META_APP_ID;
  const redirectUri = `${process.env.NEXTAUTH_URL}/api/admin/social/instagram/callback`;

  if (!clientId) {
    return NextResponse.json({ error: 'META_APP_ID nicht konfiguriert.' }, { status: 503 });
  }

  const state = randomBytes(32).toString('base64url');
  const scope = 'instagram_basic,instagram_content_publish,pages_read_engagement';
  const url = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code&state=${state}`;

  const response = NextResponse.redirect(url);
  response.cookies.set('instagram_oauth_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/api/admin/social/instagram/callback',
    maxAge: 10 * 60,
  });
  return response;
}
