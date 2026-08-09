import assert from 'node:assert/strict';
import { cities, localServices, locationHubSeoRoutes, citySeoRoutes } from '../src/lib/seo-routes';

const hubs = new Set(locationHubSeoRoutes.map((route) => route.path));
const cityRoutes = new Set(citySeoRoutes.map((route) => route.path));

for (const city of cities) {
  assert.ok(hubs.has(`/standorte/${city.slug}`), `missing location hub for ${city.name}`);
  for (const service of localServices) {
    assert.ok(cityRoutes.has(`/${service.key}-${city.slug}`), `missing ${service.key} page for ${city.name}`);
  }
}

console.log(`Local SEO contract passed for ${cities.length} locations and ${localServices.length} services.`);
