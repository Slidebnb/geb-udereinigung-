import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validations';
import { sendNotificationMail, renderContactMail } from '@/lib/mail';
import { publicFormRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const limited = publicFormRateLimit(request, 'contact');
  if (limited) return limited;

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || 'Ungültige Eingabe.' },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message, website } = parsed.data;

    // Honeypot
    if (website) {
      return NextResponse.json({ ok: true });
    }

    const mailSent = await sendNotificationMail({
      subject: `Neue Kontaktanfrage von ${name}`,
      html: renderContactMail({ name, email, phone, subject, message }),
      replyTo: email,
    });

    const created = await prisma.contactRequest.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
        mailSent,
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (error) {
    console.error('[api/contact]', error);
    return NextResponse.json(
      { error: 'Serverfehler. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
}
