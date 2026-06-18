import { ImageResponse } from 'next/og';

export const alt = 'Huwa Gebäudedienste - Reinigung, Hausmeisterservice und saisonale Dienste';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '76px', color: 'white', background: '#0c2340' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '64px' }}>
        <div style={{ width: '88px', height: '88px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#4bb8f5', color: '#0c2340', fontSize: '50px', fontWeight: 900 }}>H</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: '54px', fontWeight: 900 }}>HUWA</span><span style={{ fontSize: '24px', color: '#a8dfff' }}>Gebäudedienste</span></div>
      </div>
      <div style={{ fontSize: '60px', fontWeight: 800, maxWidth: '1000px', lineHeight: 1.12 }}>Saubere Immobilien. Persönlich betreut.</div>
      <div style={{ fontSize: '28px', color: '#cbd5e1', marginTop: '28px' }}>Gebäudereinigung · Hausmeisterservice · Gartenpflege · Winterdienst</div>
      <div style={{ display: 'flex', marginTop: '54px', gap: '20px', fontSize: '22px' }}><span style={{ color: '#4bb8f5' }}>Region Neuwied & Koblenz</span><span style={{ color: '#2dc94e' }}>Seit 2020</span></div>
    </div>,
    size,
  );
}
