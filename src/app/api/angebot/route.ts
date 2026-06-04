import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { quoteSchema } from '@/lib/validations';
import { sendNotificationMail, sendDirectMail, renderQuoteMail, renderQuoteConfirmation } from '@/lib/mail';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0].trim()
      || headersList.get('x-real-ip')
      || '0.0.0.0';

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
        { status: 429 }
      );
    }

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

    const mailSent = await sendNotificationMail({
      subject: `Neue Angebotsanfrage: ${data.service}`,
      html: renderQuoteMail(data),
      replyTo: data.email,
    });

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
        mailSent,
      },
    });

    // Bestätigungs-E-Mail an Kunden (fire-and-forget)
    sendDirectMail({
      to: data.email,
      subject: 'Ihre Angebotsanfrage bei Huwa Gebäudereinigung',
      html: renderQuoteConfirmation(data.name, data.service),
      replyTo: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    }).catch(() => {});

    return NextResponse.json({ ok: true, id: created.id });
  } catch (error) {
    console.error('[api/angebot]', error);
    return NextResponse.json(
      { error: 'Serverfehler. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
}
