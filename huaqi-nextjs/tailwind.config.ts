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
        // Architectural Minimalism Palette
        primary: '#000000',       // 深邃黑 - 标题/主文字
        secondary: '#755b00',     // 拉丝金 - 强调色
        surface: {
          DEFAULT: '#f8f9fe',
          50: '#f8f9fe',
          100: '#f3f3f8',
        },
        container: {
          50: '#f8f9fe',
          100: '#f3f3f8',
          200: '#edeef2',
          300: '#e7e8ec',
        },
        white: '#ffffff',
        muted: '#6b7280',
        'muted-light': '#9ca3af',
        // Pokemon market page retains dark theme
        market: {
          bg: '#0a0f1a',
          surface: '#131b2e',
          card: '#182035',
          gold: '#c9a84c',
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
