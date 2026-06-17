import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ALGORITHM = 'aes-256-gcm';

function parseKey(value: string): Buffer {
  const trimmed = value.trim();
  const candidates = [
    Buffer.from(trimmed, 'base64'),
    Buffer.from(trimmed, 'hex'),
    Buffer.from(trimmed, 'utf8'),
  ];

  const key = candidates.find((candidate) => candidate.length === 32);
  if (!key) {
    throw new Error('TOKEN_ENCRYPTION_KEY must be exactly 32 bytes as base64, hex, or utf8.');
  }

  return key;
}

function getKey(): Buffer {
  const raw = process.env.TOKEN_ENCRYPTION_KEY;
  if (!raw) {
    throw new Error('TOKEN_ENCRYPTION_KEY is not configured.');
  }
  return parseKey(raw);
}

export function encryptToken(token: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGORITHM, getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(token, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [
    'v1',
    iv.toString('base64url'),
    tag.toString('base64url'),
    encrypted.toString('base64url'),
  ].join(':');
}

export function decryptToken(encryptedToken: string): string {
  const [version, ivRaw, tagRaw, dataRaw] = encryptedToken.split(':');
  if (version !== 'v1' || !ivRaw || !tagRaw || !dataRaw) {
    throw new Error('Unsupported encrypted token format.');
  }

  const decipher = createDecipheriv(ALGORITHM, getKey(), Buffer.from(ivRaw, 'base64url'));
  decipher.setAuthTag(Buffer.from(tagRaw, 'base64url'));

  return Buffer.concat([
    decipher.update(Buffer.from(dataRaw, 'base64url')),
    decipher.final(),
  ]).toString('utf8');
}

export function hasTokenEncryptionKey(): boolean {
  try {
    getKey();
    return true;
  } catch {
    return false;
  }
}
