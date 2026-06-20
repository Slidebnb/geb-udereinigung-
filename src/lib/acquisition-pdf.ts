import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { serviceModuleMap } from '@/lib/document-generator/service-modules';

export type AcquisitionPdfInput = {
  title: string;
  audience: string;
  intro: string;
  serviceKeys: string[];
  callToAction: string;
};

export type AcquisitionPdfCompany = {
  name: string;
  street: string;
  zip: string;
  city: string;
  phone: string;
  email: string;
  website: string;
};

const WIDTH = 595.28;
const HEIGHT = 841.89;
const MARGIN = 48;
const navy = rgb(0.027, 0.09, 0.16);
const blue = rgb(0.08, 0.43, 0.82);
const green = rgb(0.02, 0.67, 0.25);
const ink = rgb(0.07, 0.11, 0.18);
const muted = rgb(0.35, 0.41, 0.49);
const lineColor = rgb(0.86, 0.89, 0.93);

function pdfSafe(text: string) {
  return text
    .normalize('NFC')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/…/g, '...')
    .replace(/•/g, '-')
    .replace(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\u00FF]/g, '');
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number) {
  const lines: string[] = [];
  for (const paragraph of pdfSafe(text).replace(/\r/g, '').split('\n')) {
    if (!paragraph.trim()) { lines.push(''); continue; }
    let current = '';
    for (const word of paragraph.trim().split(/\s+/)) {
      const candidate = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) > maxWidth && current) { lines.push(current); current = word; }
      else current = candidate;
    }
    if (current) lines.push(current);
  }
  return lines;
}

function drawLines(page: PDFPage, lines: string[], options: { x: number; y: number; font: PDFFont; size: number; color: ReturnType<typeof rgb>; leading: number }) {
  let y = options.y;
  for (const text of lines) { page.drawText(text, { x: options.x, y, font: options.font, size: options.size, color: options.color }); y -= options.leading; }
  return y;
}

export async function createAcquisitionPdf(input: AcquisitionPdfInput, company: AcquisitionPdfCompany) {
  const modules = input.serviceKeys.map(key => serviceModuleMap.get(key)).filter((module): module is NonNullable<typeof module> => Boolean(module));
  if (!modules.length) throw new Error('Mindestens eine gültige Dienstleistung ist erforderlich.');
  const pdf = await PDFDocument.create();
  pdf.setTitle(input.title);
  pdf.setAuthor(company.name);
  pdf.setSubject(`Leistungsübersicht für ${input.audience}`);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const logo = await pdf.embedPng(await readFile(path.join(process.cwd(), 'public', 'brand', 'huwa-logo.png')));
  const pages: PDFPage[] = [];

  const addFooter = (page: PDFPage, pageNumber: number) => {
    page.drawLine({ start: { x: MARGIN, y: 38 }, end: { x: WIDTH - MARGIN, y: 38 }, thickness: 0.6, color: lineColor });
    page.drawText(pdfSafe(`${company.name} | ${company.phone} | ${company.email}`), { x: MARGIN, y: 23, size: 7.5, font: regular, color: muted });
    page.drawText(String(pageNumber), { x: WIDTH - MARGIN - 5, y: 23, size: 8, font: bold, color: muted });
  };

  const cover = pdf.addPage([WIDTH, HEIGHT]);
  pages.push(cover);
  cover.drawRectangle({ x: 0, y: HEIGHT - 350, width: WIDTH, height: 350, color: navy });
  cover.drawRectangle({ x: 0, y: HEIGHT - 356, width: WIDTH * 0.64, height: 6, color: blue });
  cover.drawRectangle({ x: WIDTH * 0.64, y: HEIGHT - 356, width: WIDTH * 0.36, height: 6, color: green });
  cover.drawImage(logo, { x: MARGIN, y: HEIGHT - 120, width: 87, height: 81 });
  cover.drawText('LEISTUNGSÜBERSICHT', { x: MARGIN, y: HEIGHT - 163, size: 10, font: bold, color: rgb(0.55, 0.77, 1) });
  const titleLines = wrap(input.title, bold, 27, WIDTH - MARGIN * 2);
  let coverY = drawLines(cover, titleLines, { x: MARGIN, y: HEIGHT - 207, font: bold, size: 27, color: rgb(1, 1, 1), leading: 33 });
  coverY -= 12;
  drawLines(cover, wrap(`Für ${input.audience}`, regular, 12, WIDTH - MARGIN * 2), { x: MARGIN, y: coverY, font: regular, size: 12, color: rgb(0.82, 0.89, 0.96), leading: 17 });

  let y = HEIGHT - 408;
  cover.drawText('ZUVERLÄSSIGE DIENSTLEISTUNGEN AUS EINER HAND', { x: MARGIN, y, size: 10, font: bold, color: blue });
  y -= 30;
  y = drawLines(cover, wrap(input.intro, regular, 11, WIDTH - MARGIN * 2), { x: MARGIN, y, font: regular, size: 11, color: ink, leading: 17 });
  y -= 24;
  cover.drawText('Ausgewählte Leistungsbereiche', { x: MARGIN, y, size: 13, font: bold, color: ink });
  y -= 24;
  const columns = [MARGIN, 305];
  modules.forEach((module, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const itemY = y - row * 28;
    cover.drawRectangle({ x: columns[column], y: itemY - 2, width: 8, height: 8, color: index % 3 === 1 ? green : blue });
    cover.drawText(module.title, { x: columns[column] + 17, y: itemY - 3, size: 9.5, font: bold, color: ink });
  });
  cover.drawRectangle({ x: MARGIN, y: 74, width: WIDTH - MARGIN * 2, height: 72, color: rgb(0.95, 0.98, 1), borderColor: rgb(0.76, 0.86, 0.96), borderWidth: 0.8 });
  cover.drawText('PERSÖNLICH. VERBINDLICH. REGIONAL.', { x: MARGIN + 17, y: 121, size: 9, font: bold, color: blue });
  drawLines(cover, wrap(input.callToAction, regular, 9.5, WIDTH - MARGIN * 2 - 34), { x: MARGIN + 17, y: 101, font: regular, size: 9.5, color: ink, leading: 14 });
  addFooter(cover, 1);

  let page = pdf.addPage([WIDTH, HEIGHT]);
  pages.push(page);
  let pageY = HEIGHT - 92;
  const drawPageHeader = (target: PDFPage) => {
    target.drawImage(logo, { x: MARGIN, y: HEIGHT - 78, width: 43, height: 40 });
    target.drawText('UNSERE LEISTUNGEN', { x: 105, y: HEIGHT - 57, size: 9, font: bold, color: blue });
    target.drawText('Modular auf Ihr Objekt abgestimmt', { x: 105, y: HEIGHT - 74, size: 9, font: regular, color: muted });
    target.drawLine({ start: { x: MARGIN, y: HEIGHT - 88 }, end: { x: WIDTH - MARGIN, y: HEIGHT - 88 }, thickness: 0.8, color: lineColor });
  };
  drawPageHeader(page);

  for (const [index, module] of modules.entries()) {
    const optionLines = module.options.flatMap(option => wrap(`- ${option.label}`, regular, 9, WIDTH - MARGIN * 2 - 34));
    const descriptionLines = wrap(module.description, regular, 9.5, WIDTH - MARGIN * 2 - 34);
    const blockHeight = 58 + descriptionLines.length * 14 + optionLines.length * 13;
    if (pageY - blockHeight < 75) {
      page = pdf.addPage([WIDTH, HEIGHT]); pages.push(page); drawPageHeader(page); pageY = HEIGHT - 112;
    }
    page.drawRectangle({ x: MARGIN, y: pageY - blockHeight + 12, width: WIDTH - MARGIN * 2, height: blockHeight, color: rgb(0.985, 0.99, 1), borderColor: lineColor, borderWidth: 0.7 });
    page.drawRectangle({ x: MARGIN, y: pageY - blockHeight + 12, width: 5, height: blockHeight, color: index % 3 === 1 ? green : blue });
    page.drawText(`${String(index + 1).padStart(2, '0')}  ${module.title}`, { x: MARGIN + 20, y: pageY - 21, size: 13, font: bold, color: navy });
    let contentY = pageY - 42;
    contentY = drawLines(page, descriptionLines, { x: MARGIN + 20, y: contentY, font: regular, size: 9.5, color: muted, leading: 14 }) - 8;
    drawLines(page, optionLines, { x: MARGIN + 20, y: contentY, font: regular, size: 9, color: ink, leading: 13 });
    pageY -= blockHeight + 14;
  }

  if (pageY < 155) { page = pdf.addPage([WIDTH, HEIGHT]); pages.push(page); drawPageHeader(page); pageY = HEIGHT - 130; }
  const target = pages[pages.length - 1];
  target.drawRectangle({ x: MARGIN, y: pageY - 80, width: WIDTH - MARGIN * 2, height: 88, color: navy });
  target.drawText('LASSEN SIE UNS IHR OBJEKT KENNENLERNEN', { x: MARGIN + 18, y: pageY - 24, size: 11, font: bold, color: rgb(1, 1, 1) });
  drawLines(target, wrap(input.callToAction, regular, 9.5, WIDTH - MARGIN * 2 - 36), { x: MARGIN + 18, y: pageY - 45, font: regular, size: 9.5, color: rgb(0.84, 0.9, 0.96), leading: 14 });
  target.drawText(pdfSafe(`${company.street}, ${company.zip} ${company.city}  |  ${company.website}`), { x: MARGIN + 18, y: pageY - 69, size: 8, font: bold, color: rgb(0.47, 0.76, 1) });
  pages.forEach((item, index) => { if (index > 0) addFooter(item, index + 1); });
  return pdf.save();
}
