const baseUrl = (process.argv[2] || 'http://127.0.0.1:3000').replace(/\/$/, '');
const canonicalOrigin = process.argv[3] || 'https://huwa-gebaeudedienste.de';
const expectedWhatsApp = '4915117864090';

function match(html, expression) {
  return html.match(expression)?.[1] || '';
}

async function fetchPage(path, redirect = 'follow') {
  const response = await fetch(`${baseUrl}${path}`, { redirect });
  return { response, html: await response.text() };
}

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const sitemapXml = await sitemapResponse.text();
const urls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((item) => item[1]);
const errors = [];
const titles = new Map();

for (const url of urls) {
  const target = new URL(url);
  const { response, html } = await fetchPage(`${target.pathname}${target.search}`);
  const title = match(html, /<title>(.*?)<\/title>/i);
  const description = match(html, /<meta name="description" content="([^"]*)"/i);
  const canonical = match(html, /<link rel="canonical" href="([^"]*)"/i);
  const robots = match(html, /<meta name="robots" content="([^"]*)"/i);
  const expectedCanonical = `${canonicalOrigin}${target.pathname === '/' ? '' : target.pathname}${target.search}`;

  if (response.status !== 200) errors.push(`${target.pathname}: HTTP ${response.status}`);
  if (!title) errors.push(`${target.pathname}: title missing`);
  if (!description) errors.push(`${target.pathname}: description missing`);
  if (canonical !== expectedCanonical) errors.push(`${target.pathname}: canonical ${canonical || 'missing'}`);
  if (robots.includes('noindex')) errors.push(`${target.pathname}: noindex in sitemap`);
  if (titles.has(title)) errors.push(`${target.pathname}: duplicate title with ${titles.get(title)}`);
  else titles.set(title, target.pathname);

  for (const item of html.matchAll(/https:\/\/wa\.me\/(\d+)/g)) {
    if (item[1] !== expectedWhatsApp) errors.push(`${target.pathname}: old WhatsApp number ${item[1]}`);
  }
}

for (const path of ['/admin/login', '/portal/login']) {
  const { response, html } = await fetchPage(path);
  const robots = match(html, /<meta name="robots" content="([^"]*)"/i);
  if (response.status !== 200 || !robots.includes('noindex')) errors.push(`${path}: private route is not noindex`);
}

console.log(`Audited ${urls.length} sitemap URLs on ${baseUrl}.`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('SEO audit passed without errors.');
}
