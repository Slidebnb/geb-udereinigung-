import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const homepageComponents = [
  'src/components/home/Hero.tsx',
  'src/components/home/Services.tsx',
  'src/components/home/WhyUs.tsx',
  'src/components/home/Testimonials.tsx',
  'src/components/home/CTABanner.tsx',
];

for (const file of homepageComponents) {
  const source = readFileSync(file, 'utf8');
  assert.ok(!source.includes("from 'gsap'") && !source.includes('from "gsap"'), `${file} must not load GSAP on the homepage`);
  assert.ok(!source.includes('ScrollTrigger'), `${file} must not load ScrollTrigger on the homepage`);
}

const trustedClients = readFileSync('src/components/home/TrustedClients.tsx', 'utf8');
assert.match(trustedClients, /width=\{\d+\}/, 'trusted client images need an explicit width');
assert.match(trustedClients, /height=\{\d+\}/, 'trusted client images need an explicit height');

console.log('Homepage performance contract passed.');
