import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0d14',
        dusk: '#141826',
        cloud: '#e9edf6',
        neon: {
          cyan: '#78d4ff',
          pink: '#f7a2d3',
          violet: '#b7a1ff',
          lime: '#d7f9a7',
        },
        glass: 'rgba(255, 255, 255, 0.12)',
      },
      boxShadow: {
        glow: '0 0 28px rgba(120, 212, 255, 0.18)',
        glowStrong: '0 0 40px rgba(247, 162, 211, 0.25)',
        soft: '12px 12px 30px rgba(6, 8, 16, 0.65), -12px -12px 30px rgba(36, 42, 60, 0.25)',
      },
      fontFamily: {
        display: ['Shippori Mincho', 'system-ui', 'sans-serif'],
        body: ['Zen Kaku Gothic Antique', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(120, 212, 255, 0.16), transparent 58%)',
        'neon-sheen':
          'linear-gradient(135deg, rgba(120, 212, 255, 0.18), rgba(247, 162, 211, 0.2), rgba(215, 249, 167, 0.15))',
        'soft-haze': 'radial-gradient(circle at 20% 20%, rgba(183, 161, 255, 0.18), transparent 45%)',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        pulseSlow: 'pulseSlow 6s ease-in-out infinite',
        scan: 'scan 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
        scan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
