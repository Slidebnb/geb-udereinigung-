const entityMap: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  auml: 'ä',
  ouml: 'ö',
  uuml: 'ü',
  Auml: 'Ä',
  Ouml: 'Ö',
  Uuml: 'Ü',
  szlig: 'ß',
  euro: '€',
};

export function decodeHtmlEntities(value: string): string {
  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity: string) => {
    if (entity.startsWith('#x')) {
      const code = Number.parseInt(entity.slice(2), 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    if (entity.startsWith('#')) {
      const code = Number.parseInt(entity.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    return entityMap[entity] ?? match;
  });
}

export function hasHtmlFragments(value: string): boolean {
  return /<\/?[a-z][\s\S]*?>/i.test(decodeHtmlEntities(value));
}

export function stripHtmlTags(value: string): string {
  return decodeHtmlEntities(value)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function sanitizeLinkHref(href: string): string {
  const decoded = decodeHtmlEntities(href.trim().replace(/^['"]|['"]$/g, ''));
  if (decoded.startsWith('/') && !decoded.startsWith('//')) return decoded;
  if (/^https:\/\/huwa-gebaeudedienste\.de(\/|$)/i.test(decoded)) {
    return decoded.replace(/^https:\/\/huwa-gebaeudedienste\.de/i, '') || '/';
  }
  if (/^https?:\/\//i.test(decoded)) return decoded;
  return '';
}

function normalizeInlineHtml(value: string): string {
  return value
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, text) => `**${stripHtmlTags(text)}**`)
    .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, text) => `*${stripHtmlTags(text)}*`)
    .replace(/<a\b[^>]*href=(["'][^"']+["']|[^\s>]+)[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
      const safeHref = sanitizeLinkHref(href);
      const label = stripHtmlTags(text);
      return safeHref && label ? `[${label}](${safeHref})` : label;
    });
}

export function normalizeBlogContent(input: string): string {
  let content = decodeHtmlEntities(input || '').replace(/\r\n?/g, '\n');

  content = content
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  content = normalizeInlineHtml(content);

  content = content
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|section|article|header|footer)>/gi, '\n\n')
    .replace(/<(p|div|section|article|header|footer)\b[^>]*>/gi, '')
    .replace(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi, (_, text) => `\n\n## ${stripHtmlTags(text)}\n\n`)
    .replace(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi, (_, text) => `\n\n## ${stripHtmlTags(text)}\n\n`)
    .replace(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi, (_, text) => `\n\n### ${stripHtmlTags(text)}\n\n`)
    .replace(/<h[4-6]\b[^>]*>([\s\S]*?)<\/h[4-6]>/gi, (_, text) => `\n\n#### ${stripHtmlTags(text)}\n\n`)
    .replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_, text) => `\n- ${stripHtmlTags(normalizeInlineHtml(text))}`)
    .replace(/<\/?(ul|ol)\b[^>]*>/gi, '\n')
    .replace(/<\/?[^>]+>/g, '');

  content = decodeHtmlEntities(content)
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^(#)\s+/gm, '## ')
    .trim();

  return content;
}

export function getBlogReadingMinutes(content: string): number {
  const normalized = normalizeBlogContent(content);
  const words = normalized.split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 220));
}
