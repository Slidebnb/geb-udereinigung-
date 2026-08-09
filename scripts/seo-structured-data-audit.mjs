const baseUrl = (process.argv[2] || 'http://127.0.0.1:3000').replace(/\/$/, '');
const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);

const sitemapXml = await sitemapResponse.text();
const urls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const errors = [];

function stripTags(value) {
  return value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();
}

for (const url of urls) {
  const target = new URL(url);
  const response = await fetch(`${baseUrl}${target.pathname}${target.search}`);
  const html = await response.text();
  const h1Count = (html.match(/<h1\b[^>]*>/gi) || []).length;
  const title = html.match(/<title>(.*?)<\/title>/is)?.[1]?.trim() || '';
  const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1]?.trim() || '';
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i)?.[1] || '';
  const robots = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i)?.[1] || '';
  const jsonLd = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const schemaTypes = [];

  if (response.status !== 200) errors.push(`${target.pathname}: HTTP ${response.status}`);
  if (h1Count !== 1) errors.push(`${target.pathname}: expected exactly one H1, got ${h1Count}`);
  if (!stripTags(title)) errors.push(`${target.pathname}: title missing`);
  if (description.length < 50) errors.push(`${target.pathname}: description is too short`);
  if (canonical !== url) errors.push(`${target.pathname}: canonical ${canonical || 'missing'} != ${url}`);
  if (robots.includes('noindex')) errors.push(`${target.pathname}: noindex in sitemap`);

  for (const [, raw] of jsonLd) {
    try {
      const value = JSON.parse(raw);
      const nodes = Array.isArray(value) ? value : [value];
      for (const node of nodes) {
        if (node && typeof node === 'object' && node['@type']) {
          schemaTypes.push(...(Array.isArray(node['@type']) ? node['@type'] : [node['@type']]));
        }
      }
    } catch {
      errors.push(`${target.pathname}: invalid JSON-LD`);
    }
  }

  if (schemaTypes.filter((type) => type === 'BreadcrumbList').length > 1) {
    errors.push(`${target.pathname}: duplicate BreadcrumbList schema`);
  }
}

console.log(`Audited H1, metadata and JSON-LD for ${urls.length} sitemap URLs on ${baseUrl}.`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Structured-data and content contract passed.');
}
