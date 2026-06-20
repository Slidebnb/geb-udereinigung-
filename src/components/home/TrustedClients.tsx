import type { TrustedClient } from '@/lib/trusted-clients';

export default function TrustedClients({ clients }: { clients: TrustedClient[] }) {
  const published = clients.filter(client => client.published);
  if (!published.length) return null;
  const moving = published.length > 3;
  const items = moving ? [...published, ...published] : published;

  return (
    <section className="trusted-clients-section" aria-labelledby="trusted-clients-title">
      <div className="container mx-auto">
        <h2 id="trusted-clients-title">Kunden, die uns vertrauen</h2>
        <div className={`trusted-clients-window ${moving ? 'is-moving' : ''}`}>
          <div className="trusted-clients-track">
            {items.map((client, index) => {
              const duplicate = index >= published.length;
              const logo = <img src={client.logoUrl} alt={duplicate ? '' : `${client.name} Logo`} loading="lazy" />;
              return (
                <div className="trusted-client-logo" key={`${client.id}-${index}`} aria-hidden={duplicate || undefined}>
                  {client.website && !duplicate ? <a href={client.website} target="_blank" rel="noopener noreferrer" aria-label={`${client.name} Webseite öffnen`}>{logo}</a> : logo}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
