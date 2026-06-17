import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';
import { decryptToken } from '@/lib/token-crypto';

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { postId } = await req.json();
  if (!postId) {
    return NextResponse.json({ error: 'postId fehlt.' }, { status: 400 });
  }

  // Lade den Social Post
  const socialPost = await prisma.socialPost.findUnique({ where: { id: postId } });
  if (!socialPost) {
    return NextResponse.json({ error: 'Post nicht gefunden.' }, { status: 404 });
  }

  // Lade den verbundenen Instagram Account
  const account = await prisma.socialAccount.findFirst({
    where: { platform: 'instagram', status: 'connected' },
  });

  if (!account) {
    return NextResponse.json({ error: 'Kein verbundenes Instagram-Konto.' }, { status: 400 });
  }

  const caption = [socialPost.caption, socialPost.hashtags].filter(Boolean).join('\n\n');
  const imageUrl = socialPost.imageUrl;
  let accessToken: string;
  try {
    accessToken = decryptToken(account.accessToken);
  } catch (error) {
    console.error('[social/publish-instagram] token decrypt failed', error);
    return NextResponse.json(
      { error: 'Instagram-Token ist nicht lesbar. Bitte Konto neu verbinden.' },
      { status: 503 }
    );
  }
  const igAccountId = account.accountId;

  try {
    if (!imageUrl) {
      // Ohne Bild: nur als Text-Post (Reels/Stories benötigen Medien — für Feed ein Bild erforderlich)
      await prisma.socialPost.update({
        where: { id: postId },
        data: {
          status: 'failed',
          error: 'Kein Bild vorhanden. Instagram Feed-Posts benötigen ein Bild.',
        },
      });
      return NextResponse.json(
        { error: 'Kein Bild vorhanden. Instagram Feed-Posts benötigen ein Bild.' },
        { status: 400 }
      );
    }

    // Step 1: Media Container erstellen
    const containerRes = await fetch(
      `https://graph.facebook.com/v18.0/${igAccountId}/media`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: imageUrl,
          caption,
          access_token: accessToken,
        }),
      }
    );

    const containerData = await containerRes.json();

    if (!containerData.id) {
      const errMsg = containerData.error?.message || 'Container-Erstellung fehlgeschlagen.';
      await prisma.socialPost.update({
        where: { id: postId },
        data: { status: 'failed', error: errMsg },
      });
      return NextResponse.json({ error: errMsg }, { status: 502 });
    }

    // Step 2: Veröffentlichen
    const publishRes = await fetch(
      `https://graph.facebook.com/v18.0/${igAccountId}/media_publish`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creation_id: containerData.id,
          access_token: accessToken,
        }),
      }
    );

    const publishData = await publishRes.json();

    if (!publishData.id) {
      const errMsg = publishData.error?.message || 'Veröffentlichung fehlgeschlagen.';
      await prisma.socialPost.update({
        where: { id: postId },
        data: { status: 'failed', error: errMsg },
      });
      return NextResponse.json({ error: errMsg }, { status: 502 });
    }

    // Erfolg — Status updaten
    await prisma.socialPost.update({
      where: { id: postId },
      data: {
        status: 'published',
        publishedAt: new Date(),
        externalId: publishData.id,
        error: null,
      },
    });

    return NextResponse.json({ ok: true, externalId: publishData.id });
  } catch (error) {
    console.error('[social/publish-instagram]', error);
    await prisma.socialPost.update({
      where: { id: postId },
      data: { status: 'failed', error: 'Interner Fehler.' },
    }).catch(() => null);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
