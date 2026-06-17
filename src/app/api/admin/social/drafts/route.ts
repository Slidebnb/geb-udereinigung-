import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const posts = await prisma.socialPost.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      platform: true,
      type: true,
      status: true,
      caption: true,
      createdAt: true,
      scheduledAt: true,
      publishedAt: true,
    },
  });

  return NextResponse.json({ posts });
}
