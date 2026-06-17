import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { platform, type, caption, hashtags, imageUrl, mediaUrls, blogPostId } =
    await req.json();

  if (!caption) {
    return NextResponse.json({ error: 'Caption fehlt.' }, { status: 400 });
  }

  try {
    const post = await prisma.socialPost.create({
      data: {
        platform: platform || 'instagram',
        type: type || 'feed',
        caption,
        hashtags: hashtags || null,
        imageUrl: imageUrl || null,
        mediaUrls: mediaUrls || null,
        blogPostId: blogPostId || null,
        status: 'draft',
      },
    });

    return NextResponse.json({ ok: true, id: post.id });
  } catch (error) {
    console.error('[social/save-draft]', error);
    return NextResponse.json({ error: 'Speichern fehlgeschlagen.' }, { status: 500 });
  }
}
