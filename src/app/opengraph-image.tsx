import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const alt = 'Huwa Gebäudedienste - Reinigung, Hausmeisterservice und saisonale Dienste';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const logo = await readFile(path.join(process.cwd(), 'public', 'brand', 'huwa-logo.png'));
  const logoDataUrl = `data:image/png;base64,${logo.toString('base64')}`;
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '56px 76px', color: 'white', background: '#0c2340' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '26px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUrl} alt="Huwa Gebäudedienste" width="175" height="163" style={{ objectFit: 'contain' }} />
      </div>
      <div style={{ fontSize: '52px', fontWeight: 800, maxWidth: '1048px', lineHeight: 1.08 }}>Saubere Immobilien. Persönlich betreut.</div>
      <div style={{ fontSize: '25px', color: '#cbd5e1', marginTop: '22px' }}>Gebäudereinigung · Hausmeisterservice · Gartenpflege · Winterdienst</div>
      <div style={{ display: 'flex', marginTop: '34px', gap: '20px', fontSize: '22px' }}><span style={{ color: '#4bb8f5' }}>Region Neuwied & Koblenz</span><span style={{ color: '#2dc94e' }}>Seit 2020</span></div>
    </div>,
    size,
  );
}
