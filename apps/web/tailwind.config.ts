import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/*.{ts,tsx}',
    '../../packages/ui/typography/*.{ts,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        mk: {
          bg: 'var(--mk-bg)',
          surface: 'var(--mk-surface)',
          elevated: 'var(--mk-surface-elevated)',
          text: 'var(--mk-text)',
          muted: 'var(--mk-text-muted)',
          border: 'var(--mk-border)',
          primary: 'var(--mk-primary)',
          primaryHover: 'var(--mk-primary-hover)',
          primarySoft: 'var(--mk-primary-soft)',
          success: 'var(--mk-success)',
          successSoft: 'var(--mk-success-soft)',
          warning: 'var(--mk-warning)',
          trackMacos: 'var(--mk-track-macos)',
          trackProgramy: 'var(--mk-track-programy)',
          trackIphone: 'var(--mk-track-iphone)',
          trackAi: 'var(--mk-track-ai)',
        },
      },
      fontFamily: {
        display: ['var(--mk-font-display)', 'Georgia', 'serif'],
        sans: ['var(--mk-font-sans)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      spacing: {
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
      },
      borderRadius: {
        mk: '12px',
        'mk-lg': '16px',
        'mk-xl': '24px',
      },
    },
  },
  plugins: [],
};

export default config;
