import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { isAdmin } from '@/lib/admin-guard';

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, email, password, notes } = body as {
      name: string;
      email: string;
      password: string;
      notes?: string;
    };

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, E-Mail und Passwort sind erforderlich.' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'E-Mail-Adresse bereits vergeben.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'kunde',
      },
    });

    return NextResponse.json({ success: true, id: user.id });
  } catch (err) {
    console.error('[api/admin/kunden/create]', err);
    return NextResponse.json({ error: 'Interner Serverfehler.' }, { status: 500 });
  }
}
