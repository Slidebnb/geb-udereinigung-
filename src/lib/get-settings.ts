import { prisma } from './prisma';
import { siteConfig } from './site';

export type SiteSettings = Record<string, string>;

export async function getSettings(): Promise<SiteSettings> {
  try {
    const rows = await prisma.setting.findMany();
    return Object.fromEntries(rows.map(r => [r.key, r.value]));
  } catch {
    return {};
  }
}

export function s(settings: SiteSettings, key: string, fallback = ''): string {
  return settings[key] || fallback;
}

export function getPhone(settings: SiteSettings) {
  return s(settings, 'phone', siteConfig.phone);
}

export function getEmail(settings: SiteSettings) {
  return s(settings, 'contact_email', siteConfig.email);
}

export function getCompanyName(settings: SiteSettings) {
  return s(settings, 'site_title', siteConfig.name);
}
