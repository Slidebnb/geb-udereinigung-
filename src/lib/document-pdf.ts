import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

type PdfData = {
  documentType: string;
  number: string;
  title: string;
  status: string;
  customer: { name: string; company?: string | null; street?: string | null; zip?: string | null; city?: string | null };
  object?: { name: string; street: string; zip: string; city: string } | null;
  netTotal?: number;
  vatRate?: number;
  grossTotal?: number;
  body: string;
  company: { name: string; representative: string; street: string; zip: string; city: string; taxNumber?: string; vatId?: string };
};

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 52;
const euro = (value: number) => new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) + ' EUR';

function wrapText(text: string, maxChars: number) {
  const paragraphs = text.replace(/\r/g, '').split('\n');
  const lines: string[] = [];
  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) { lines.push(''); continue; }
    const words = paragraph.split(/\s+/);
    let line = '';
    for (const word of words) {
      if (`${line} ${word}`.trim().length > maxChars && line) {
        lines.push(line);
        line = word;
      } else {
        line = `${line} ${word}`.trim();
      }
    }
    if (line) lines.push(line);
  }
  return lines;
}

export async function createDocumentPdf(data: PdfData) {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  const footer = () => {
    page.drawLine({ start: { x: MARGIN, y: 36 }, end: { x: PAGE_WIDTH - MARGIN, y: 36 }, thickness: 0.5, color: rgb(0.82, 0.85, 0.9) });
    page.drawText(`${data.company.name} | ${data.number}`, { x: MARGIN, y: 22, size: 8, font: regular, color: rgb(0.38, 0.43, 0.5) });
  };
  const nextPage = () => {
    footer();
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = PAGE_HEIGHT - MARGIN;
  };
  const line = (text: string, options: { size?: number; font?: typeof regular; color?: ReturnType<typeof rgb>; gap?: number } = {}) => {
    const size = options.size ?? 10;
    const gap = options.gap ?? 15;
    if (y < 62) nextPage();
    page.drawText(text, { x: MARGIN, y, size, font: options.font ?? regular, color: options.color ?? rgb(0.08, 0.13, 0.22) });
    y -= gap;
  };

  page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 112, width: PAGE_WIDTH, height: 112, color: rgb(0.035, 0.16, 0.31) });
  page.drawText('HUWA', { x: MARGIN, y: PAGE_HEIGHT - 63, size: 27, font: bold, color: rgb(1, 1, 1) });
  page.drawText('GEBÄUDEDIENSTE', { x: MARGIN, y: PAGE_HEIGHT - 80, size: 8, font: bold, color: rgb(0.68, 0.82, 1) });
  page.drawText(data.documentType.toUpperCase(), { x: 350, y: PAGE_HEIGHT - 60, size: 11, font: bold, color: rgb(1, 1, 1) });
  page.drawText(data.number, { x: 350, y: PAGE_HEIGHT - 79, size: 10, font: regular, color: rgb(0.82, 0.88, 0.96) });
  y = PAGE_HEIGHT - 145;

  if (data.status !== 'final') {
    page.drawRectangle({ x: MARGIN, y: y - 5, width: PAGE_WIDTH - MARGIN * 2, height: 28, color: rgb(1, 0.95, 0.82) });
    page.drawText('ENTWURF - NOCH NICHT RECHTLICH FREIGEGEBEN', { x: MARGIN + 12, y: y + 5, size: 9, font: bold, color: rgb(0.65, 0.34, 0.02) });
    y -= 48;
  }

  line(data.title, { size: 20, font: bold, gap: 30 });
  line(`Kunde: ${data.customer.company || data.customer.name}`, { font: bold });
  line(`${data.customer.name}${data.customer.street ? ` | ${data.customer.street}, ${data.customer.zip || ''} ${data.customer.city || ''}` : ''}`, { color: rgb(0.35, 0.4, 0.48), gap: 22 });
  if (data.object) {
    line(`Objekt: ${data.object.name}`, { font: bold });
    line(`${data.object.street}, ${data.object.zip} ${data.object.city}`, { color: rgb(0.35, 0.4, 0.48), gap: 25 });
  }

  if (typeof data.netTotal === 'number') {
    page.drawRectangle({ x: MARGIN, y: y - 60, width: PAGE_WIDTH - MARGIN * 2, height: 72, color: rgb(0.95, 0.97, 1) });
    page.drawText('Netto', { x: MARGIN + 14, y: y - 7, size: 9, font: regular });
    page.drawText(euro(data.netTotal), { x: MARGIN + 14, y: y - 28, size: 13, font: bold });
    page.drawText(`USt. ${data.vatRate ?? 19}%`, { x: 220, y: y - 7, size: 9, font: regular });
    page.drawText(euro((data.grossTotal ?? 0) - data.netTotal), { x: 220, y: y - 28, size: 13, font: bold });
    page.drawText('Brutto', { x: 385, y: y - 7, size: 9, font: regular });
    page.drawText(euro(data.grossTotal ?? 0), { x: 385, y: y - 28, size: 13, font: bold, color: rgb(0.06, 0.3, 0.73) });
    y -= 88;
  }

  for (const textLine of wrapText(data.body, 92)) {
    const heading = /^\d+\.|^[A-ZÄÖÜ][A-ZÄÖÜ\s\/-]{5,}$/.test(textLine);
    line(textLine || ' ', { size: heading ? 11 : 9.5, font: heading ? bold : regular, gap: heading ? 19 : 14 });
  }

  y -= 12;
  line('Ort, Datum: ______________________________', { gap: 28 });
  line('Auftraggeber: ___________________________    Auftragnehmer: ___________________________', { size: 9 });
  footer();
  return pdf.save();
}
