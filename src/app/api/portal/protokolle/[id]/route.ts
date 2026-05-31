import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'kunde') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const protocol = await prisma.cleaningProtocol.findFirst({
    where: { id: params.id, customerId: session.user.id },
    include: { customer: { select: { name: true, email: true } } },
  });
  if (!protocol) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(protocol);
}
