import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'kunde') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  const protocols = await prisma.cleaningProtocol.findMany({
    where: { customerId: userId },
    orderBy: { date: 'desc' },
  });
  return NextResponse.json(protocols);
}
