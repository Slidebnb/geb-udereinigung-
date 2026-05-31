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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
