import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendNotificationMail, sendDirectMail } from '@/lib/mail';
import { siteConfig } from '@/lib/site';
import { escapeHtml } from '@/lib/html';
import { publicFormRateLimit } from '@/lib/rate-limit';
import { publicDownloadCatalog } from '@/lib/operations-catalog';
import { createDownloadToken } from '@/lib/download-token';

const schema = z.object({ name: z.string().min(2), email: z.string().email(), company: z.string().optional(), documentKey: z.string().min(1), source: z.string().optional(), privacy: z.literal(true), newsletter: z.boolean().optional() });

export async function POST(request: Request) {
  const limited = publicFormRateLimit(request, 'checkliste'); if (limited) return limited;
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0]?.message || 'Ungültige Eingabe.' }, { status: 400 });
    const data = parsed.data;
    const document = publicDownloadCatalog.find(item => item.key === data.documentKey);
    if (!document) return NextResponse.json({ error: 'Unbekannte Checkliste.' }, { status: 400 });
    await prisma.downloadLead.create({ data: { name: data.name, company: data.company || null, email: data.email, documentKey: data.documentKey, source: data.source || 'downloadbibliothek', newsletter: Boolean(data.newsletter) } });
    if (data.newsletter) await prisma.newsletterSubscriber.upsert({ where: { email: data.email }, update: {}, create: { email: data.email } });
    const token = createDownloadToken(data.documentKey, data.email);
    const downloadUrl = `${siteConfig.url}/api/downloads/checklist/${data.documentKey}?token=${encodeURIComponent(token)}`;
    await Promise.all([
      sendDirectMail({ to: data.email, subject: `Ihre Checkliste: ${document.title}`, html: `<div style="font-family:Arial;color:#172033"><h2>Hallo ${escapeHtml(data.name)},</h2><p>vielen Dank für Ihr Interesse. Ihre Checkliste steht sieben Tage lang bereit.</p><p><a href="${downloadUrl}" style="background:#1768e5;color:white;padding:12px 20px;text-decoration:none;border-radius:6px">Checkliste als PDF herunterladen</a></p><p>Huwa Gebäudereinigung &amp; Hausmeisterdienste</p></div>` }),
      sendNotificationMail({ subject: `Checklisten-Download: ${document.title}`, replyTo: data.email, html: `<p><strong>${escapeHtml(data.name)}</strong> (${escapeHtml(data.company || 'ohne Firma')}) hat „${escapeHtml(document.title)}“ angefordert.</p><p>${escapeHtml(data.email)}</p>` }),
    ]);
    return NextResponse.json({ ok: true, downloadUrl: `/api/downloads/checklist/${data.documentKey}?token=${encodeURIComponent(token)}` });
  } catch (error) { console.error('[api/checkliste]', error); return NextResponse.json({ error: 'Serverfehler. Bitte versuchen Sie es später erneut.' }, { status: 500 }); }
}
