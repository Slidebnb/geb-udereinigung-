import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: '#050D1A',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(75,184,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(75,184,245,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Glow top-right */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '500px',
            height: '500px',
            background: 'radial-gradient(ellipse at top right, rgba(75,184,245,0.10) 0%, transparent 65%)',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(75,184,245,0.1)',
            border: '1px solid rgba(75,184,245,0.25)',
            borderRadius: '999px',
            padding: '6px 16px',
            marginBottom: '32px',
          }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4BB8F5' }} />
          <span style={{ color: '#4BB8F5', fontSize: '14px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Nur für Gewerbekunden
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          <span style={{ color: '#FFFFFF' }}>Gebäudereinigung</span>
          <br />
          <span style={{ color: '#CCCCCC' }}>in Neuwied & Koblenz</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(90deg, #4BB8F5 0%, #2DC94E 100%)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            für gewerbliche Objekte.
          </span>
        </div>

        {/* Subline */}
        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '22px', marginBottom: '48px', maxWidth: '700px', lineHeight: 1.5 }}>
          Festpreisgarantie für Hausverwaltungen, WEGs und Facility Manager.
        </div>

        {/* Footer bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '16px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            HUWA Gebäudereinigung
          </span>
          <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: '16px' }}>·</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '16px' }}>Neuwied · Koblenz · Bendorf</span>
          <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: '16px' }}>·</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '16px' }}>www.huwa-gebaeudedienste.de</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
