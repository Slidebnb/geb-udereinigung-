export function quoteUrl(params: { service?: string; city?: string; source?: string } = {}) {
  const search = new URLSearchParams();

  if (params.service) search.set('service', params.service);
  if (params.city) search.set('city', params.city);
  if (params.source) search.set('source', params.source);

  const query = search.toString();
  return query ? `/angebot?${query}` : '/angebot';
}
