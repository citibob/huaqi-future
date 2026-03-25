import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f8f3e7',
        secondary: '#d6b36a',
        accent: '#7d8fff',
        surface: {
          DEFAULT: '#050608',
          50: '#050608',
          100: '#0d1015',
        },
        container: {
          50: '#050608',
          100: '#0d1015',
          200: '#151a22',
          300: '#202733',
        },
        white: '#ffffff',
        muted: '#b8b3a7',
        'muted-light': '#8e98aa',
        market: {
          bg: '#050608',
          surface: '#0d1015',
          card: '#151a22',
          gold: '#d6b36a',
        },
        pokemon: {
          red: '#E3350D',
          blue: '#0075BE',
          yellow: '#c9a84c',
          dark: '#0a0f1a',
          darker: '#060a12',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        jp: ['var(--font-noto-sans-jp)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['Public Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4rem', { lineHeight: '0.9', letterSpacing: '-0.03em', fontWeight: '900' }],
        'display-lg': ['3rem', { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '900' }],
        'display-md': ['2rem', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: '800' }],
        'display-sm': ['1.5rem', { lineHeight: '1.05', fontWeight: '800' }],
      },
      spacing: {
        'bento-gap': '1.5rem',
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
        'card-hover': '0 2px 6px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)',
        'glass': 'backdrop-blur-xl bg-white/70',
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-subtle': 'linear-gradient(180deg, #f8f9fe 0%, #f3f3f8 100%)',
      },
    },
  },
  plugins: [],
}

export default config
