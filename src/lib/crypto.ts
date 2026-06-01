import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

const ALG = 'aes-256-gcm';

function getKey(): Buffer {
  const secret = process.env.ENCRYPTION_KEY || process.env.NEXTAUTH_SECRET || 'fallback-dev-key-change-in-prod!!';
  return scryptSync(secret, 'huwa-salt-v1', 32);
}

export function encrypt(plaintext: string): string {
  const key = getKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALG, key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  // Format: iv(24) + tag(32) + ciphertext
  return iv.toString('hex') + tag.toString('hex') + encrypted.toString('hex');
}

export function decrypt(ciphertext: string): string {
  try {
    const key = getKey();
    const iv = Buffer.from(ciphertext.slice(0, 24), 'hex');
    const tag = Buffer.from(ciphertext.slice(24, 56), 'hex');
    const data = Buffer.from(ciphertext.slice(56), 'hex');
    const decipher = createDecipheriv(ALG, key, iv);
    decipher.setAuthTag(tag);
    return decipher.update(data).toString('utf8') + decipher.final('utf8');
  } catch {
    // If decryption fails (e.g. old unencrypted token), return as-is
    return ciphertext;
  }
}
