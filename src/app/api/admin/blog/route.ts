import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';
import { blogPostSchema } from '@/lib/validations';

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const body = await request.json();
  const parsed = blogPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message }, { status: 400 });
  }

  const existing = await prisma.blogPost.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return NextResponse.json({ error: 'Dieser Slug existiert bereits.' }, { status: 409 });
  }

  const post = await prisma.blogPost.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      coverImage: parsed.data.coverImage || null,
      author: parsed.data.author || 'Huwa Team',
      category: parsed.data.category || 'Reinigung',
      metaTitle: parsed.data.metaTitle || null,
      metaDesc: parsed.data.metaDesc || null,
      published: parsed.data.published ?? true,
    },
  });
  return NextResponse.json({ ok: true, post });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const body = await request.json();
  const { id, ...rest } = body;
  if (!id) return NextResponse.json({ error: 'ID fehlt.' }, { status: 400 });

  const parsed = blogPostSchema.safeParse(rest);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message }, { status: 400 });
  }

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      coverImage: parsed.data.coverImage || null,
      author: parsed.data.author || 'Huwa Team',
      category: parsed.data.category || 'Reinigung',
      metaTitle: parsed.data.metaTitle || null,
      metaDesc: parsed.data.metaDesc || null,
      published: parsed.data.published ?? true,
    },
  });
  return NextResponse.json({ ok: true, post });
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: 'ID fehlt.' }, { status: 400 });
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
