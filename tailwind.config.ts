import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E5FD8',
          50:  '#EEF4FF',
          100: '#D6E6FF',
          200: '#ADC8FF',
          300: '#84AAFF',
          400: '#5B8CFF',
          500: '#1E5FD8',
          600: '#1749AE',
          700: '#103484',
          800: '#0A215A',
          900: '#040E30',
        },
        green: {
          DEFAULT: '#059669',
          50:  '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#059669',
          600: '#047857',
          700: '#065F46',
        },
        dark: {
          DEFAULT: '#050D1A',
          50:  '#0A1929',
          100: '#0D2137',
          200: '#0E2240',
          300: '#163660',
        },
        accent: { DEFAULT: '#059669' },
      },
      fontFamily: {
        sans:    ['var(--font-inter)',    'system-ui', 'sans-serif'],
        display: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #1E5FD8 0%, #059669 100%)',
        'gradient-dark':  'linear-gradient(180deg, #050D1A 0%, #0E2240 100%)',
        'gradient-hero':  'radial-gradient(ellipse at 65% 45%, #0E2240 0%, #050D1A 70%)',
      },
      boxShadow: {
        'glow-blue':  '0 0 40px rgba(30,95,216,0.22)',
        'glow-green': '0 0 40px rgba(5,150,105,0.22)',
        'card':       '0 2px 16px rgba(5,13,26,0.08)',
        'card-hover': '0 8px 32px rgba(5,13,26,0.15)',
      },
      keyframes: {
        'fade-up':    { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in':    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'float':      { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        'shimmer':    { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'pulse-glow': { '0%,100%': { boxShadow: '0 0 20px rgba(30,95,216,0.3)' }, '50%': { boxShadow: '0 0 50px rgba(30,95,216,0.5)' } },
      },
      animation: {
        'fade-up':    'fade-up 0.7s ease-out forwards',
        'fade-in':    'fade-in 0.5s ease-out forwards',
        'float':      'float 4s ease-in-out infinite',
        'shimmer':    'shimmer 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
