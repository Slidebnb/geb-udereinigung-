import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Huwa Gebäudereinigung & Hausmeisterdienste',
    short_name: 'Huwa',
    description: 'Professionelle Gebäudereinigung und Hausmeisterdienste in der Region Neuwied und Koblenz.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0c2340',
    lang: 'de',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' }],
  };
}
