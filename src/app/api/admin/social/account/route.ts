import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const account = await prisma.socialAccount.findFirst({
    where: { platform: 'instagram' },
    select: {
      id: true,
      platform: true,
      username: true,
      status: true,
      tokenExpiresAt: true,
    },
  });

  return NextResponse.json({ account: account || null });
}

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.socialAccount.deleteMany({
    where: { platform: 'instagram' },
  });

  return NextResponse.json({ ok: true });
}
