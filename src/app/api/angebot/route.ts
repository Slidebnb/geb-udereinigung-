import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { quoteSchema } from '@/lib/validations';
import { sendNotificationMail, renderQuoteMail } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = quoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || 'Ungültige Eingabe.' },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (data.website) {
      return NextResponse.json({ ok: true });
    }

    const created = await prisma.quoteRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        service: data.service,
        area: data.area || null,
        frequency: data.frequency || null,
        estimatedMin: data.estimatedMin ?? null,
        estimatedMax: data.estimatedMax ?? null,
        message: data.message || null,
      },
    });

    await sendNotificationMail({
      subject: `Neue Angebotsanfrage: ${data.service}`,
      html: renderQuoteMail(data),
      replyTo: data.email,
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (error) {
    console.error('[api/angebot]', error);
    return NextResponse.json(
      { error: 'Serverfehler. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
}
