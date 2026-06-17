import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { id: true, title: true, slug: true },
    orderBy: { publishedAt: 'desc' },
    take: 50,
  });

  return NextResponse.json({ posts });
}
