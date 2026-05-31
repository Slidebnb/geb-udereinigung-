import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendNotificationMail } from '@/lib/mail';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  adresse: z.string().min(5),
  flaeche: z.string().optional().or(z.literal('')),
  haeufigkeit: z.string().min(1),
  starttermin: z.string().optional().or(z.literal('')),
  anmerkungen: z.string().optional().or(z.literal('')),
  leistungen: z.array(z.string()).min(1),
  privacy: z.literal(true),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderGartenpflegeMail(data: z.infer<typeof schema>): string {
  return `
    <div style="font-family: Arial, sans-serif; color: #1a3a6b;">
      <h2 style="color:#0C2340;">Neue Gartenpflege-Anfrage</h2>
      <table style="border-collapse:collapse; width:100%;">
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap;">Name / Firma:</td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap;">E-Mail:</td><td>${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap;">Telefon:</td><td>${escapeHtml(data.phone)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap;">Objekt-Adresse:</td><td>${escapeHtml(data.adresse)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap;">Fläche:</td><td>${escapeHtml(data.flaeche || '–')}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap;">Häufigkeit:</td><td>${escapeHtml(data.haeufigkeit)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap;">Starttermin:</td><td>${escapeHtml(data.starttermin || '–')}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap; vertical-align:top;">Gewünschte Leistungen:</td><td>${escapeHtml(data.leistungen.join(', '))}</td></tr>
        ${data.anmerkungen ? `<tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap; vertical-align:top;">Anmerkungen:</td><td style="white-space:pre-wrap;">${escapeHtml(data.anmerkungen)}</td></tr>` : ''}
      </table>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || 'Ungültige Eingabe.' },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const messageText = [
      `Gewünschte Leistungen: ${data.leistungen.join(', ')}`,
      `Adresse: ${data.adresse}`,
      `Häufigkeit: ${data.haeufigkeit}`,
      data.flaeche ? `Fläche: ${data.flaeche}` : null,
      data.starttermin ? `Starttermin: ${data.starttermin}` : null,
      data.anmerkungen ? `Anmerkungen: ${data.anmerkungen}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const mailSent = await sendNotificationMail({
      subject: `Gartenpflege-Anfrage: ${data.name}`,
      html: renderGartenpflegeMail(data),
      replyTo: data.email,
    });

    const created = await prisma.quoteRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: 'Gartenpflege',
        area: data.flaeche || null,
        frequency: data.haeufigkeit,
        message: messageText,
        mailSent,
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (error) {
    console.error('[api/gartenpflege-anfrage]', error);
    return NextResponse.json(
      { error: 'Serverfehler. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
}
