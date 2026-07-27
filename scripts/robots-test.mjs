import assert from 'node:assert/strict';

const baseUrl = (process.argv[2] || 'http://127.0.0.1:3000').replace(/\/$/, '');
const response = await fetch(`${baseUrl}/robots.txt`);
const body = await response.text();

assert.equal(response.status, 200, `robots.txt returned HTTP ${response.status}`);
assert.match(response.headers.get('content-type') || '', /^text\/plain/i);
assert.match(body, /^User-agent: \*/m);
assert.match(body, /^Allow: \/$/m);
assert.match(body, /^Disallow: \/admin$/m);
assert.match(body, /^Disallow: \/api$/m);
assert.match(body, /^Disallow: \/portal$/m);
assert.match(body, /^Sitemap: https:\/\/huwa-gebaeudedienste\.de\/sitemap\.xml$/m);

console.log(`robots.txt test passed on ${baseUrl}.`);
