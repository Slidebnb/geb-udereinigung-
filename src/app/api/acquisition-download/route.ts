import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendDirectMail, sendNotificationMail } from '@/lib/mail';
import { escapeHtml } from '@/lib/html';
import { publicFormRateLimit } from '@/lib/rate-limit';
import { createDownloadToken } from '@/lib/download-token';
import { siteConfig } from '@/lib/site';
import { ACQUISITION_DOCUMENT_KEY } from '@/lib/public-acquisition';

const schema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  company: z.string().trim().optional(),
  privacy: z.literal(true),
  newsletter: z.boolean().optional(),
});

export async function POST(request: Request) {
  const limited = publicFormRateLimit(request, 'leistungsuebersicht');
  if (limited) return limited;

  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message || 'Ungültige Eingabe.' }, { status: 400 });
    }

    const data = parsed.data;
    await prisma.downloadLead.create({
      data: {
        name: data.name,
        company: data.company || null,
        email: data.email,
        documentKey: ACQUISITION_DOCUMENT_KEY,
        source: 'leistungsuebersicht-download',
        newsletter: Boolean(data.newsletter),
      },
    });

    if (data.newsletter) {
      await prisma.newsletterSubscriber.upsert({
        where: { email: data.email },
        update: {},
        create: { email: data.email },
      });
    }

    const token = createDownloadToken(ACQUISITION_DOCUMENT_KEY, data.email);
    const relativeDownloadUrl = `/api/downloads/acquisition?token=${encodeURIComponent(token)}`;
    const absoluteDownloadUrl = `${siteConfig.url}${relativeDownloadUrl}`;

    await Promise.all([
      sendDirectMail({
        to: data.email,
        subject: 'Ihre Huwa Leistungsübersicht als PDF',
        html: `<div style="font-family:Arial;color:#172033"><h2>Hallo ${escapeHtml(data.name)},</h2><p>vielen Dank für Ihr Interesse. Die Huwa Leistungsübersicht steht sieben Tage lang als PDF bereit.</p><p><a href="${absoluteDownloadUrl}" style="background:#1768e5;color:white;padding:12px 20px;text-decoration:none;border-radius:6px">Leistungsübersicht herunterladen</a></p><p>Wenn Sie möchten, prüfen wir Ihr Objekt auch persönlich und erstellen ein passendes Angebot.</p><p>Huwa Gebäudereinigung &amp; Hausmeisterdienste</p></div>`,
      }),
      sendNotificationMail({
        subject: 'Download: Huwa Leistungsübersicht',
        replyTo: data.email,
        html: `<p><strong>${escapeHtml(data.name)}</strong> (${escapeHtml(data.company || 'ohne Firma')}) hat die Huwa Leistungsübersicht angefordert.</p><p>${escapeHtml(data.email)}</p>`,
      }),
    ]);

    return NextResponse.json({ ok: true, downloadUrl: relativeDownloadUrl });
  } catch (error) {
    console.error('[api/acquisition-download]', error);
    return NextResponse.json({ error: 'Serverfehler. Bitte versuchen Sie es später erneut.' }, { status: 500 });
  }
}
