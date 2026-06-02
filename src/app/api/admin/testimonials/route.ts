import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';
import { testimonialSchema } from '@/lib/validations';

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
  // Array direkt zurückgeben – passend zum Admin-Frontend.
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const body = await request.json();
  const parsed = testimonialSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message }, { status: 400 });
  }
  const testimonial = await prisma.testimonial.create({
    data: {
      name: parsed.data.name,
      role: parsed.data.role || null,
      company: parsed.data.company || null,
      content: parsed.data.content,
      rating: parsed.data.rating,
      location: parsed.data.location || null,
      published: parsed.data.published ?? true,
    },
  });
  // Testimonial direkt zurückgeben – passend zum Admin-Frontend.
  return NextResponse.json(testimonial);
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const body = await request.json();
  const { id } = body;
  if (!id) return NextResponse.json({ error: 'ID fehlt.' }, { status: 400 });

  const data: Record<string, unknown> = {};
  if (body.published !== undefined) data.published = Boolean(body.published);
  if (body.name !== undefined) data.name = body.name;
  if (body.role !== undefined) data.role = body.role || null;
  if (body.company !== undefined) data.company = body.company || null;
  if (body.content !== undefined) data.content = body.content;
  if (body.rating !== undefined) data.rating = Number(body.rating);
  if (body.location !== undefined) data.location = body.location || null;

  const testimonial = await prisma.testimonial.update({ where: { id }, data });
  return NextResponse.json({ ok: true, testimonial });
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const url = new URL(request.url);
  let id = url.searchParams.get('id');
  if (!id) {
    try {
      const body = await request.json();
      id = body?.id ?? null;
    } catch {
      id = null;
    }
  }
  if (!id) return NextResponse.json({ error: 'ID fehlt.' }, { status: 400 });
  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
