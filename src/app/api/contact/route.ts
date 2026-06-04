import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validations';
import { sendNotificationMail, sendDirectMail, renderContactMail, renderContactConfirmation } from '@/lib/mail';
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
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || 'Ungültige Eingabe.' },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message, website } = parsed.data;

    if (website) {
      return NextResponse.json({ ok: true });
    }

    const mailSent = await sendNotificationMail({
      subject: `Neue Kontaktanfrage von ${name}`,
      html: renderContactMail({ name, email, phone, subject, message }),
      replyTo: email,
    });

    const created = await prisma.contactRequest.create({
      data: { name, email, phone: phone || null, subject: subject || null, message, mailSent },
    });

    // Bestätigungs-E-Mail an Kunden (fire-and-forget, kein Fehler wenn SMTP fehlt)
    sendDirectMail({
      to: email,
      subject: 'Ihre Anfrage bei Huwa Gebäudereinigung',
      html: renderContactConfirmation(name),
      replyTo: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    }).catch(() => {});

    return NextResponse.json({ ok: true, id: created.id });
  } catch (error) {
    console.error('[api/contact]', error);
    return NextResponse.json(
      { error: 'Serverfehler. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
}
