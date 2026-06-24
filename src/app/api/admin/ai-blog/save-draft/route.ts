import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';
import { normalizeBlogContent } from '@/lib/blog-content';

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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
        content: normalizeBlogContent(content || ''),
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
