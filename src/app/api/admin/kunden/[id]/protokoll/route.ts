import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { date, type, location, duration, staff, notes, tasks, status } = body as {
      date: string;
      type: string;
      location: string;
      duration?: string;
      staff?: string;
      notes?: string;
      tasks: string[];
      status?: string;
    };

    if (!date || !type || !location || !tasks) {
      return NextResponse.json({ error: 'Datum, Leistungsart, Standort und Aufgaben sind erforderlich.' }, { status: 400 });
    }

    const customer = await prisma.user.findUnique({ where: { id: params.id } });
    if (!customer || customer.role !== 'kunde') {
      return NextResponse.json({ error: 'Kunde nicht gefunden.' }, { status: 404 });
    }

    const protocol = await prisma.cleaningProtocol.create({
      data: {
        customerId: params.id,
        date: new Date(date),
        type,
        location,
        duration: duration || null,
        staff: staff || null,
        notes: notes || null,
        status: status || 'abgeschlossen',
        tasks: JSON.stringify(tasks),
      },
    });

    return NextResponse.json({ success: true, id: protocol.id });
  } catch (err) {
    console.error('[api/admin/kunden/[id]/protokoll]', err);
    return NextResponse.json({ error: 'Interner Serverfehler.' }, { status: 500 });
  }
}
