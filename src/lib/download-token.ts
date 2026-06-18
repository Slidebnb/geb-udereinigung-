import { createHmac, timingSafeEqual } from 'crypto';

const secret = () => process.env.NEXTAUTH_SECRET || 'development-download-secret';

export function createDownloadToken(documentKey: string, email: string) {
  const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = `${documentKey}|${email}|${expires}`;
  const signature = createHmac('sha256', secret()).update(payload).digest('hex');
  return Buffer.from(`${payload}|${signature}`).toString('base64url');
}

export function verifyDownloadToken(token: string, documentKey: string) {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const [key, email, expiresRaw, signature] = decoded.split('|');
    if (key !== documentKey || !email || Number(expiresRaw) < Date.now()) return false;
    const expected = createHmac('sha256', secret()).update(`${key}|${email}|${expiresRaw}`).digest('hex');
    return signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch { return false; }
}
