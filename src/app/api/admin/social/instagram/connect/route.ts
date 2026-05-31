import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const clientId = process.env.META_APP_ID;
  const redirectUri = `${process.env.NEXTAUTH_URL}/api/admin/social/instagram/callback`;

  if (!clientId) {
    return NextResponse.json({ error: 'META_APP_ID nicht konfiguriert.' }, { status: 503 });
  }

  const scope = 'instagram_basic,instagram_content_publish,pages_read_engagement';
  const url = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;

  return NextResponse.redirect(url);
}
