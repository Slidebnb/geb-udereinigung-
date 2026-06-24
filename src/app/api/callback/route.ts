import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { escapeHtml } from '@/lib/html';
import { sendNotificationMail } from '@/lib/mail';
import { publicFormRateLimit } from '@/lib/rate-limit';

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(40),
  service: z.string().trim().max(120).optional().or(z.literal('')),
  preferredTime: z.string().trim().max(80).optional().or(z.literal('')),
  source: z.string().trim().max(120).optional().or(z.literal('')),
  privacy: z.literal(true),
  website: z.string().max(0).optional().or(z.literal('')),
});

export async function POST(request: Request) {
  const limited = publicFormRateLimit(request, 'callback');
  if (limited) return limited;

  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message || 'Ungueltige Eingabe.' }, { status: 400 });
    }
    const data = parsed.data;
    if (data.website) return NextResponse.json({ ok: true });

    const message = [
      'Sofort-Rueckruf angefordert.',
      data.service ? `Leistung: ${data.service}` : '',
      data.preferredTime ? `Gewuenschte Rueckrufzeit: ${data.preferredTime}` : '',
      data.source ? `Quelle: ${data.source}` : '',
    ].filter(Boolean).join('\n');

    const mailSent = await sendNotificationMail({
      subject: 'Sofort-Rueckruf angefordert',
      html: `<div style="font-family:Arial;color:#172033"><h2>Sofort-Rueckruf</h2><p><strong>Name:</strong> ${escapeHtml(data.name)}</p><p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p><p><strong>Leistung:</strong> ${escapeHtml(data.service || 'nicht angegeben')}</p><p><strong>Rueckrufzeit:</strong> ${escapeHtml(data.preferredTime || 'flexibel')}</p><p><strong>Quelle:</strong> ${escapeHtml(data.source || 'Website')}</p></div>`,
    });

    const created = await prisma.contactRequest.create({
      data: {
        name: data.name,
        email: 'rueckruf@huwa-gebaeudedienste.de',
        phone: data.phone,
        subject: 'Sofort-Rueckruf',
        message,
        mailSent,
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (error) {
    console.error('[api/callback]', error);
    return NextResponse.json({ error: 'Serverfehler. Bitte versuchen Sie es spaeter erneut.' }, { status: 500 });
  }
}
