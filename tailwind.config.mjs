import starlightPlugin from '@astrojs/starlight-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Whitney', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        discord: {
          blurple: '#5865f2',
          green: '#57f287',
          yellow: '#fee75c',
          fuchsia: '#eb459e',
          red: '#ed4245',
          white: '#ffffff',
          black: '#000000',
          'dark-not-quite-black': '#2c2f33',
          'dark-grey': '#23272a',
          'light-grey': '#99aab5',
          'not-quite-white': '#fafafa',
        },
      },
      borderColor: {
        border: 'rgb(var(--border))',
      },
      backgroundColor: {
        background: 'rgb(var(--background))',
        card: 'rgb(var(--card))',
        popover: 'rgb(var(--popover))',
        primary: 'rgb(var(--primary))',
        secondary: 'rgb(var(--secondary))',
        muted: 'rgb(var(--muted))',
        accent: 'rgb(var(--accent))',
      },
      textColor: {
        foreground: 'rgb(var(--foreground))',
        'card-foreground': 'rgb(var(--card-foreground))',
        'popover-foreground': 'rgb(var(--popover-foreground))',
        'primary-foreground': 'rgb(var(--primary-foreground))',
        'secondary-foreground': 'rgb(var(--secondary-foreground))',
        'muted-foreground': 'rgb(var(--muted-foreground))',
        'accent-foreground': 'rgb(var(--accent-foreground))',
        'destructive-foreground': 'rgb(var(--destructive-foreground))',
      },
      ringColor: {
        ring: 'rgb(var(--ring))',
      },
      borderRadius: {
        radius: 'var(--radius)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            '--tw-prose-headings': 'rgb(var(--foreground))',
            '--tw-prose-body': 'rgb(var(--foreground))',
            '--tw-prose-lead': 'rgb(var(--muted-foreground))',
            '--tw-prose-links': 'rgb(var(--primary))',
            '--tw-prose-bold': 'rgb(var(--foreground))',
            '--tw-prose-counters': 'rgb(var(--muted-foreground))',
            '--tw-prose-bullets': 'rgb(var(--muted-foreground))',
            '--tw-prose-hr': 'rgb(var(--border))',
            '--tw-prose-quotes': 'rgb(var(--foreground))',
            '--tw-prose-quote-borders': 'rgb(var(--border))',
            '--tw-prose-captions': 'rgb(var(--muted-foreground))',
            '--tw-prose-code': 'rgb(var(--foreground))',
            '--tw-prose-pre-code': 'rgb(var(--muted-foreground))',
            '--tw-prose-pre-bg': 'rgb(var(--muted))',
            '--tw-prose-th-borders': 'rgb(var(--border))',
            '--tw-prose-td-borders': 'rgb(var(--border))',
          },
        },
      },
    },
  },
  plugins: [
    starlightPlugin(),
    require('@tailwindcss/typography'),
  ],
};