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
        // HUWA Logo Sky Blue
        primary: {
          DEFAULT: '#4BB8F5',
          50:  '#EBF7FF',
          100: '#D0EDFE',
          200: '#A2DAFD',
          300: '#73C7FC',
          400: '#4BB8F5',
          500: '#1FA3E8',
          600: '#1481C0',
          700: '#0F6090',
          800: '#094060',
          900: '#050D1A',
        },
        // HUWA Logo Green
        green: {
          DEFAULT: '#2DC94E',
          50:  '#E7F9EC',
          100: '#C4F0CF',
          200: '#88E1A0',
          300: '#4DD272',
          400: '#2DC94E',
          500: '#22A33D',
          600: '#197D2E',
          700: '#10571F',
        },
        // Dark backgrounds
        dark: {
          DEFAULT: '#050D1A',
          50:  '#0A1929',
          100: '#0D2137',
          200: '#112B4A',
          300: '#163660',
        },
        accent: {
          DEFAULT: '#2DC94E',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #4BB8F5 0%, #2DC94E 100%)',
        'gradient-dark': 'linear-gradient(180deg, #050D1A 0%, #0D2137 100%)',
        'gradient-hero': 'radial-gradient(ellipse at 60% 50%, #112B4A 0%, #050D1A 70%)',
      },
      boxShadow: {
        'glow-blue':  '0 0 40px rgba(75,184,245,0.25)',
        'glow-green': '0 0 40px rgba(45,201,78,0.25)',
        'card':       '0 4px 24px rgba(5,13,26,0.10)',
        'card-hover': '0 12px 48px rgba(5,13,26,0.18)',
      },
      keyframes: {
        'fade-up':   { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in':   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'float':     { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        'shimmer':   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'pulse-glow':{ '0%,100%': { boxShadow: '0 0 20px rgba(75,184,245,0.3)' }, '50%': { boxShadow: '0 0 50px rgba(75,184,245,0.6)' } },
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
