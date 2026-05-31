import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendNotificationMail } from '@/lib/mail';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  objektAnzahl: z.string().min(1),
  gesamtflaeche: z.string().min(1),
  flaechenarten: z.array(z.string()).min(1),
  adresse: z.string().min(5),
  besonderheiten: z.string().optional().or(z.literal('')),
  starttermin: z.string().min(1),
  privacy: z.literal(true),
  website: z.string().max(0).optional().or(z.literal('')),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderWinterdienstMail(data: z.infer<typeof schema>): string {
  return `
    <div style="font-family: Arial, sans-serif; color: #1a3a6b;">
      <h2 style="color:#0C2340;">Neue Winterdienst-Anmeldung 2025/2026</h2>
      <table style="border-collapse:collapse; width:100%;">
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap;">Name / Firma:</td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap;">E-Mail:</td><td>${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap;">Telefon:</td><td>${escapeHtml(data.phone)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap;">Anzahl Objekte:</td><td>${escapeHtml(data.objektAnzahl)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap;">Gesamtfläche:</td><td>${escapeHtml(data.gesamtflaeche)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap;">Flächenarten:</td><td>${escapeHtml(data.flaechenarten.join(', '))}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap;">Objekt-Adresse:</td><td>${escapeHtml(data.adresse)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap;">Wunsch-Starttermin:</td><td>${escapeHtml(data.starttermin)}</td></tr>
        ${data.besonderheiten ? `<tr><td style="padding:4px 12px 4px 0; font-weight:bold; white-space:nowrap; vertical-align:top;">Besonderheiten:</td><td style="white-space:pre-wrap;">${escapeHtml(data.besonderheiten)}</td></tr>` : ''}
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

    // Honeypot check
    if (data.website) {
      return NextResponse.json({ ok: true });
    }

    const messageText = [
      `Anzahl Objekte: ${data.objektAnzahl}`,
      `Gesamtfläche: ${data.gesamtflaeche}`,
      `Flächenarten: ${data.flaechenarten.join(', ')}`,
      `Adresse: ${data.adresse}`,
      `Wunsch-Starttermin: ${data.starttermin}`,
      data.besonderheiten ? `Besonderheiten: ${data.besonderheiten}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const mailSent = await sendNotificationMail({
      subject: `Winterdienst-Anmeldung 2025/2026: ${data.name}`,
      html: renderWinterdienstMail(data),
      replyTo: data.email,
    });

    const created = await prisma.quoteRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: 'Winterdienst 2025/2026',
        area: data.gesamtflaeche,
        frequency: 'Saisonal',
        message: messageText,
        mailSent,
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (error) {
    console.error('[api/winterdienst-anmeldung]', error);
    return NextResponse.json(
      { error: 'Serverfehler. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
}
