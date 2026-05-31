import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { newsletterSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || 'Ungültige E-Mail-Adresse.' },
        { status: 400 }
      );
    }

    const email = parsed.data.email.toLowerCase();

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[api/newsletter]', error);
    return NextResponse.json(
      { error: 'Serverfehler. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
}
