import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.socialAccount.deleteMany({
    where: { platform: 'instagram' },
  });

  return NextResponse.json({ ok: true });
}
