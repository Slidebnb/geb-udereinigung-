import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/admin-guard';

const ALLOWED_IMAGE_TYPES = new Map([
  ['image/png', 'png'],
  ['image/jpeg', 'jpg'],
  ['image/webp', 'webp'],
  ['image/avif', 'avif'],
  ['image/gif', 'gif'],
]);

function safeBaseName(name: string) {
  return name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'titelbild';
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'Keine Datei ausgewählt.' }, { status: 400 });
  }

  const originalExt = file.name.split('.').pop()?.toLowerCase() || '';
  const normalizedExt = originalExt === 'jpeg' ? 'jpg' : originalExt;
  const expectedExt = ALLOWED_IMAGE_TYPES.get(file.type);

  if (!expectedExt || normalizedExt !== expectedExt) {
    return NextResponse.json(
      { error: 'Nur PNG, JPG, WebP, AVIF oder GIF sind erlaubt. SVG ist für Blogbilder deaktiviert.' },
      { status: 400 }
    );
  }

  if (file.size > 4 * 1024 * 1024) {
    return NextResponse.json({ error: 'Datei zu groß (max. 4 MB).' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `blog-${Date.now()}-${safeBaseName(file.name)}.${expectedExt}`;
  const uploadsDir = join(process.cwd(), 'public', 'uploads', 'blog');

  await mkdir(uploadsDir, { recursive: true });
  await writeFile(join(uploadsDir, filename), buffer);

  const url = `/uploads/blog/${filename}`;
  revalidatePath('/blog');

  return NextResponse.json({ url });
}
