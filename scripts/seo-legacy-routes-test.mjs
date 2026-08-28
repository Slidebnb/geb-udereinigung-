const baseUrl = process.argv[2] || 'https://huwa-gebaeudedienste.de';

const expectedRedirects = new Map([
  ['/unsere-leistungen', '/leistungen'],
  ['/anfrage', '/angebot'],
  ['/reinigungneuwied', '/gebaudereinigung-neuwied'],
  ['/bueroreinigung-neuwied', '/bueroeinigung-neuwied'],
  ['/bueroreinigung-koblenz', '/bueroeinigung-koblenz'],
  ['/bueroreinigung-andernach', '/bueroeinigung-andernach'],
  ['/bueroreinigung-bendorf', '/bueroeinigung-bendorf'],
  ['/bueroreinigung-hoehr-grenzhausen', '/bueroeinigung-hoehr-grenzhausen'],
  ['/galerie', '/'],
]);

const failures = [];
for (const [path, destination] of expectedRedirects) {
  const response = await fetch(new URL(path, baseUrl), { redirect: 'manual' });
  const location = response.headers.get('location');
  const normalizedLocation = location ? new URL(location, baseUrl).pathname : null;
  if (![301, 308].includes(response.status) || normalizedLocation !== destination) {
    failures.push(`${path}: expected 301/308 to ${destination}, got ${response.status} to ${normalizedLocation || 'none'}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Legacy SEO route test passed for ${expectedRedirects.size} redirects.`);
