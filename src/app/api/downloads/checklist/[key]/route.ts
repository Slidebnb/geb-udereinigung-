import { NextResponse } from 'next/server';
import { verifyDownloadToken } from '@/lib/download-token';
import { createChecklistPdf } from '@/lib/checklist-pdf';

export async function GET(request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const token = new URL(request.url).searchParams.get('token') || '';
  if (!verifyDownloadToken(token, key)) return NextResponse.json({ error: 'Der Download-Link ist ungültig oder abgelaufen.' }, { status: 403 });
  try {
    const bytes = await createChecklistPdf(key);
    return new NextResponse(Buffer.from(bytes), { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="huwa-${key}-checkliste.pdf"`, 'Cache-Control': 'private, no-store' } });
  } catch { return NextResponse.json({ error: 'Checkliste nicht gefunden.' }, { status: 404 }); }
}
