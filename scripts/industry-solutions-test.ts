import assert from 'node:assert/strict';
import { industrySolutions } from '../src/lib/industry-solutions';
import { industrySolutionSeoRoutes } from '../src/lib/seo-routes';

const expectedSlugs = [
  'arztpraxis',
  'bank',
  'fitnessstudio',
  'gastronomie',
  'hotel',
  'kanzlei',
  'kindergarten',
  'lager-hallen',
  'markt-filialbetriebe',
  'treppenhaus',
  'pflegeeinrichtung',
];

assert.equal(industrySolutions.length, expectedSlugs.length);
assert.deepEqual(industrySolutions.map((solution) => solution.slug), expectedSlugs);
assert.deepEqual(
  industrySolutionSeoRoutes.slice(1).map((route) => route.path),
  expectedSlugs.map((slug) => `/branchenloesungen/${slug}`),
);
assert.equal(new Set(industrySolutions.map((solution) => solution.slug)).size, expectedSlugs.length);

for (const solution of industrySolutions) {
  assert.ok(solution.metaTitle.length >= 30);
  assert.ok(solution.metaDescription.length >= 80);
  assert.ok(solution.features.length >= 3);
  assert.ok(solution.process.length >= 3);
  assert.ok(solution.benefits.length >= 3);
  assert.ok(solution.faqs.length >= 3);
  assert.equal(solution.ctaHref, `/angebot?service=${solution.serviceKey}&industry=${solution.slug}`);
  assert.ok(solution.features.every((feature) => feature.title && feature.description));
}

console.log(`Industry solution content test passed for ${industrySolutions.length} branches.`);
