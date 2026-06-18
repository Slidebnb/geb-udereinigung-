export const WHATSAPP_NUMBER = '4915117864090';
export const WHATSAPP_DISPLAY = '0151 17864090';

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
