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
          DEFAULT: '#1a3a6b',
          50: '#eef3fa',
          100: '#d4e0f1',
          200: '#a9c1e3',
          300: '#7ea2d5',
          400: '#5383c7',
          500: '#2f63ab',
          600: '#244e87',
          700: '#1a3a6b',
          800: '#142c52',
          900: '#0f2039',
        },
        accent: {
          DEFAULT: '#f5a623',
          50: '#fef6e8',
          100: '#fde8c4',
          200: '#fbd089',
          300: '#f8b94e',
          400: '#f5a623',
          500: '#d98a0c',
          600: '#b06f0a',
          700: '#875507',
          800: '#5e3a05',
          900: '#352003',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
