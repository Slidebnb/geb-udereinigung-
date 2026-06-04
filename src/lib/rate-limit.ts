const store = new Map<string, { count: number; resetAt: number }>();

/**
 * Einfaches In-Memory-Ratelimit (kein Redis nötig, single-process).
 * @returns true wenn die Anfrage erlaubt ist, false wenn das Limit überschritten ist
 */
export function rateLimit(ip: string, max = 5, windowMs = 60 * 60 * 1000): boolean {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= max) return false;

  entry.count++;
  return true;
}
