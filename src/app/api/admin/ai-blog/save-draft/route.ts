import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const {
    title,
    slug,
    excerpt,
    content,
    metaTitle,
    metaDesc,
    category,
    targetKeyword,
    targetCity,
    targetService,
    aiPrompt,
    contentStatus,
  } = await req.json();

  try {
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        metaTitle: metaTitle || title,
        metaDesc: metaDesc || excerpt,
        category: category || 'Ratgeber',
        author: 'Huwa Team',
        published: false,
        aiGenerated: true,
        aiPrompt: aiPrompt || null,
        targetKeyword: targetKeyword || null,
        targetCity: targetCity || null,
        targetService: targetService || null,
        contentStatus: contentStatus || 'draft',
      },
    });
    return NextResponse.json({ ok: true, id: post.id });
  } catch (error: unknown) {
    const prismaError = error as { code?: string };
    if (prismaError.code === 'P2002') {
      return NextResponse.json(
        { error: 'Slug bereits vorhanden. Bitte anderen Slug wählen.' },
        { status: 409 }
      );
    }
    console.error('[ai-blog/save-draft]', error);
    return NextResponse.json({ error: 'Speichern fehlgeschlagen.' }, { status: 500 });
  }
}
