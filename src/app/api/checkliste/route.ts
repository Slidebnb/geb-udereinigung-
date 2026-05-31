import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendNotificationMail } from '@/lib/mail';
import { siteConfig } from '@/lib/site';

const checklisteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  privacy: z.literal(true),
  newsletter: z.boolean().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = checklisteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || 'Ungültige Eingabe.' },
        { status: 400 },
      );
    }

    const { name, email, newsletter } = parsed.data;

    // Upsert into NewsletterSubscriber — store the lead regardless of newsletter opt-in
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    // Send confirmation to user
    await sendNotificationMail({
      subject: 'Ihre kostenlose Haustechnik-Checkliste von Huwa',
      html: `
        <div style="font-family: Arial; color: #1a2e4a;">
          <h2>Hallo ${name},</h2>
          <p>vielen Dank für Ihr Interesse! Hier ist Ihre kostenlose Checkliste:</p>
          <p>
            <a href="${siteConfig.url}/downloads/haustechnik-checkliste.html"
               style="background: #0C2340; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Checkliste öffnen &amp; drucken
            </a>
          </p>
          <p style="color: #666; font-size: 14px;">
            Tipp: Im Browser über Datei → Drucken → "Als PDF speichern" können Sie die Checkliste als PDF speichern.
          </p>
          <hr>
          <p style="font-size: 13px; color: #888;">
            Huwa Gebäudereinigung &amp; Hausmeisterdienste | ${siteConfig.phone} | ${siteConfig.email}
          </p>
        </div>
      `,
      replyTo: email,
    });

    // Send admin notification
    const adminHtml = `
      <div style="font-family: Arial; color: #1a2e4a;">
        <h2 style="color:#1a2e4a;">Neuer Checklisten-Download</h2>
        <table style="border-collapse:collapse;">
          <tr><td style="padding:4px 12px 4px 0;"><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;"><strong>E-Mail:</strong></td><td>${email}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;"><strong>Newsletter:</strong></td><td>${newsletter ? 'Ja' : 'Nein'}</td></tr>
        </table>
      </div>
    `;

    const adminTo = process.env.CONTACT_EMAIL;
    if (adminTo) {
      await sendNotificationMail({
        subject: `Checklisten-Download: ${name} (${email})`,
        html: adminHtml,
        replyTo: email,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[api/checkliste]', error);
    return NextResponse.json(
      { error: 'Serverfehler. Bitte versuchen Sie es später erneut.' },
      { status: 500 },
    );
  }
}
