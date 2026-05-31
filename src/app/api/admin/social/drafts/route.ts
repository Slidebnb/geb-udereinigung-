import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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
