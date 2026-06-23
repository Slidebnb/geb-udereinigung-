import { NextResponse } from 'next/server';
import { verifyDownloadToken } from '@/lib/download-token';
import { ACQUISITION_DOCUMENT_KEY, createPublicAcquisitionPdf } from '@/lib/public-acquisition';

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token') || '';
  if (!verifyDownloadToken(token, ACQUISITION_DOCUMENT_KEY)) {
    return NextResponse.json({ error: 'Der Download-Link ist ungültig oder abgelaufen.' }, { status: 403 });
  }

  try {
    const bytes = await createPublicAcquisitionPdf();
    return new NextResponse(Buffer.from(bytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="huwa-leistungsuebersicht.pdf"',
        'Cache-Control': 'private, no-store',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Die Leistungsübersicht konnte nicht erstellt werden.' }, { status: 500 });
  }
}
