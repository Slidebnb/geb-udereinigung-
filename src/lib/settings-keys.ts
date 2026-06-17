export const ALLOWED_SETTING_KEYS = new Set([
  'site_title',
  'contact_email',
  'phone',
  'address',
  'whatsapp',
  'google_rating',
  'review_count',
  'years_experience',
  'clients_count',
  'opening_hours',
  'opening_hours_sat',
  'logo_url',
  'hp_hero',
  'hp_services',
  'hp_whyus',
  'hp_cta',
]);

export function isAllowedSettingKey(key: string): boolean {
  return ALLOWED_SETTING_KEYS.has(key);
}
