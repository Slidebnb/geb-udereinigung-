import nodemailer from 'nodemailer';

interface MailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

interface DirectMailOptions extends MailOptions {
  to: string;
}

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass || host === 'smtp.example.com') {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

/**
 * Sendet eine Benachrichtigung an die hinterlegte Kontakt-E-Mail.
 * Wenn kein SMTP konfiguriert ist, wird die Nachricht nur geloggt
 * (Anfrage wurde bereits in der Datenbank gespeichert).
 */
export async function sendNotificationMail({ subject, html, replyTo }: MailOptions): Promise<boolean> {
  const transport = getTransport();
  const to = process.env.CONTACT_EMAIL || process.env.SMTP_USER;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  if (!transport || !to || !from) {
    console.info('[mail] SMTP nicht konfiguriert – Benachrichtigung wird nur protokolliert:', subject);
    return false;
  }

  try {
    await transport.sendMail({ from, to, subject, html, replyTo });
    return true;
  } catch (error) {
    console.error('[mail] Fehler beim Senden der Benachrichtigung:', error);
    return false;
  }
}

/**
 * Sendet eine E-Mail direkt an eine angegebene Empfängeradresse.
 * Nützlich für Bestätigungs-Mails an Nutzer.
 */
export async function sendDirectMail({ to, subject, html, replyTo }: DirectMailOptions): Promise<boolean> {
  const transport = getTransport();
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  if (!transport || !from) {
    console.info('[mail] SMTP nicht konfiguriert – Direktmail wird nur protokolliert:', subject);
    return false;
  }

  try {
    await transport.sendMail({ from, to, subject, html, replyTo });
    return true;
  } catch (error) {
    console.error('[mail] Fehler beim Senden der Direktmail:', error);
    return false;
  }
}

export function renderContactMail(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): string {
  return `
    <div style="font-family: Arial, sans-serif; color: #1a3a6b;">
      <h2 style="color:#1a3a6b;">Neue Kontaktanfrage</h2>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:4px 12px 4px 0;"><strong>Name:</strong></td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;"><strong>E-Mail:</strong></td><td>${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;"><strong>Telefon:</strong></td><td>${escapeHtml(data.phone || '–')}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;"><strong>Betreff:</strong></td><td>${escapeHtml(data.subject || '–')}</td></tr>
      </table>
      <h3 style="color:#1a3a6b;">Nachricht</h3>
      <p style="white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
  `;
}

export function renderQuoteMail(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  area?: string;
  frequency?: string;
  estimatedMin?: number;
  estimatedMax?: number;
  message?: string;
}): string {
  const estimate =
    data.estimatedMin && data.estimatedMax
      ? `${data.estimatedMin} € – ${data.estimatedMax} €`
      : '–';
  return `
    <div style="font-family: Arial, sans-serif; color: #1a3a6b;">
      <h2 style="color:#1a3a6b;">Neue Angebotsanfrage</h2>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:4px 12px 4px 0;"><strong>Leistung:</strong></td><td>${escapeHtml(data.service)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;"><strong>Fläche/Umfang:</strong></td><td>${escapeHtml(data.area || '–')}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;"><strong>Intervall:</strong></td><td>${escapeHtml(data.frequency || '–')}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;"><strong>Geschätzter Preis:</strong></td><td>${estimate}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;"><strong>Name:</strong></td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;"><strong>Firma:</strong></td><td>${escapeHtml(data.company || '–')}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;"><strong>E-Mail:</strong></td><td>${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;"><strong>Telefon:</strong></td><td>${escapeHtml(data.phone || '–')}</td></tr>
      </table>
      ${data.message ? `<h3 style="color:#1a3a6b;">Nachricht</h3><p style="white-space:pre-wrap;">${escapeHtml(data.message)}</p>` : ''}
    </div>
  `;
}

export function renderContactConfirmation(name: string): string {
  return `
    <div style="font-family:Arial,sans-serif;color:#1a3a6b;max-width:600px;">
      <div style="background:linear-gradient(135deg,#0C2340,#1B3E62);padding:32px 24px;border-radius:12px 12px 0 0;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:24px;">Vielen Dank, ${escapeHtml(name)}!</h1>
      </div>
      <div style="background:#f8fafc;padding:32px 24px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none;">
        <p style="font-size:16px;line-height:1.6;">wir haben Ihre Nachricht erhalten und melden uns <strong>innerhalb von 24 Stunden</strong> persönlich bei Ihnen.</p>
        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin:24px 0;">
          <p style="margin:0 0 8px;color:#64748b;font-size:14px;">Bei dringenden Anfragen erreichen Sie uns direkt:</p>
          <a href="tel:026019131820" style="color:#4BB8F5;font-size:18px;font-weight:bold;text-decoration:none;">02601 9131820</a>
          <p style="margin:8px 0 0;color:#64748b;font-size:13px;">Mo–Fr 07:00–18:00 · Sa 08:00–14:00 Uhr</p>
        </div>
        <p style="color:#64748b;font-size:13px;margin:0;">Huwa Gebäudereinigung & Hausmeisterdienste GmbH · An der Wies 2 · 56567 Neuwied</p>
      </div>
    </div>
  `;
}

export function renderQuoteConfirmation(name: string, service: string): string {
  return `
    <div style="font-family:Arial,sans-serif;color:#1a3a6b;max-width:600px;">
      <div style="background:linear-gradient(135deg,#0C2340,#1B3E62);padding:32px 24px;border-radius:12px 12px 0 0;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:24px;">Anfrage erhalten, ${escapeHtml(name)}!</h1>
      </div>
      <div style="background:#f8fafc;padding:32px 24px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none;">
        <p style="font-size:16px;line-height:1.6;">Ihre Angebotsanfrage für <strong>${escapeHtml(service)}</strong> ist bei uns eingegangen. Wir prüfen Ihren Bedarf und erstellen ein individuelles Festpreisangebot.</p>
        <p style="font-size:16px;">Sie erhalten Ihr persönliches Angebot <strong>innerhalb von 24 Stunden</strong>.</p>
        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin:24px 0;">
          <p style="margin:0 0 8px;color:#64748b;font-size:14px;">Für Rückfragen erreichen Sie uns direkt:</p>
          <a href="tel:026019131820" style="color:#4BB8F5;font-size:18px;font-weight:bold;text-decoration:none;">02601 9131820</a>
          <p style="margin:8px 0 0;color:#64748b;font-size:13px;">Mo–Fr 07:00–18:00 · Sa 08:00–14:00 Uhr</p>
        </div>
        <p style="color:#64748b;font-size:13px;margin:0;">Huwa Gebäudereinigung & Hausmeisterdienste GmbH · An der Wies 2 · 56567 Neuwied</p>
      </div>
    </div>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
