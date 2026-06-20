import { z } from 'zod';

export const trustedClientSchema = z.object({
  id: z.string().trim().min(1).max(80),
  name: z.string().trim().min(1).max(120),
  logoUrl: z.string().trim().startsWith('/uploads/client-logo-'),
  website: z.union([z.string().trim().url().max(300), z.literal('')]).default(''),
  published: z.boolean().default(true),
  backdrop: z.enum(['auto', 'light', 'dark']).default('auto'),
});

export const trustedClientsSchema = z.array(trustedClientSchema).max(40);
export type TrustedClient = z.infer<typeof trustedClientSchema>;

export function parseTrustedClients(value?: string | null): TrustedClient[] {
  if (!value) return [];
  try {
    const parsed = trustedClientsSchema.safeParse(JSON.parse(value));
    return parsed.success ? parsed.data : [];
  } catch {
    return [];
  }
}
