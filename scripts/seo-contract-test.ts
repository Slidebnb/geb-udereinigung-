import assert from 'node:assert/strict';
import { seoLocations, seoLocalServices } from '../src/lib/seo-locations';
import { publicSeoRoutes } from '../src/lib/seo-routes';
import { siteConfig } from '../src/lib/site';

assert.equal(siteConfig.url, 'https://huwa-gebaeudedienste.de');
assert.equal(new Set(seoLocations.map((location) => location.slug)).size, seoLocations.length);
assert.equal(new Set(seoLocalServices.map((service) => service.key)).size, seoLocalServices.length);
assert.equal(siteConfig.serviceAreas.length, seoLocations.length);
assert.deepEqual(siteConfig.serviceAreas, seoLocations.map((location) => location.name));

const publicPaths = publicSeoRoutes.map((route) => route.path);
assert.equal(new Set(publicPaths).size, publicPaths.length, 'public SEO routes must be unique');
assert.ok(publicPaths.includes('/'), 'homepage must be in the public SEO route list');
assert.ok(publicPaths.includes('/standorte/koblenz'), 'Koblenz hub must be indexable');
assert.ok(publicPaths.includes('/gebaudereinigung-neuwied'), 'Neuwied service page must be indexable');

for (const route of publicSeoRoutes) {
  assert.ok(route.path.startsWith('/'), `route must be absolute: ${route.path}`);
  assert.ok(route.label.trim(), `route needs a label: ${route.path}`);
  assert.ok(route.priority >= 0 && route.priority <= 1, `invalid priority: ${route.path}`);
}

console.log(`SEO contract passed for ${publicSeoRoutes.length} public routes and ${seoLocations.length} locations.`);
