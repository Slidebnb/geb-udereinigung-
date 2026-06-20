import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

const filenamePattern = /^client-logo-[0-9a-f-]+\.(png|jpg|webp)$/i;
const contentTypes: Record<string, string> = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp' };

async function loadLogo(filename: string) {
  if (!filenamePattern.test(filename) || path.basename(filename) !== filename) return null;
  const locations = [
    path.join(process.cwd(), 'storage', 'client-logos', filename),
    path.join(process.cwd(), 'public', 'uploads', filename),
  ];
  for (const location of locations) {
    try { return await readFile(location); } catch { /* Try the legacy location next. */ }
  }
  return null;
}

export async function GET(_: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  const file = await loadLogo(filename);
  if (!file) return new NextResponse('Nicht gefunden.', { status: 404 });
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  return new NextResponse(file, {
    headers: {
      'Content-Type': contentTypes[extension] || 'application/octet-stream',
      'Content-Length': String(file.length),
      'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export async function HEAD(request: Request, context: { params: Promise<{ filename: string }> }) {
  const response = await GET(request, context);
  return new NextResponse(null, { status: response.status, headers: response.headers });
}
