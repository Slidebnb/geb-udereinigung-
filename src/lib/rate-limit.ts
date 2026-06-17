import { NextResponse } from 'next/server';

type RateLimitOptions = {
  keyPrefix: string;
  limit: number;
  windowMs: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0]?.trim() || 'unknown';

  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

export function rateLimit(request: Request, options: RateLimitOptions): NextResponse | null {
  const now = Date.now();
  const ip = getClientIp(request);
  const key = `${options.keyPrefix}:${ip}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + options.windowMs });
    return null;
  }

  current.count += 1;
  if (current.count <= options.limit) return null;

  const retryAfter = Math.ceil((current.resetAt - now) / 1000);
  return NextResponse.json(
    { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
    {
      status: 429,
      headers: { 'Retry-After': String(retryAfter) },
    }
  );
}

export function publicFormRateLimit(request: Request, keyPrefix: string): NextResponse | null {
  return rateLimit(request, { keyPrefix, limit: 5, windowMs: 10 * 60 * 1000 });
}
