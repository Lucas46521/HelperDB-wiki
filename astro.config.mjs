
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import expressiveCode from 'astro-expressive-code';

export default defineConfig({
  site: 'https://helperdb-docs.vercel.app',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  integrations: [
    expressiveCode({
      themes: ['dark-plus', 'light-plus'],
      styleOverrides: {
        borderRadius: '0.5rem',
      },
    }),
    starlight({
      title: 'Helper.db',
      description: 'Complete documentation for Helper.db - A powerful database helper package',
      logo: {
        src: './src/assets/logo.svg',
      },
      social: {
        github: 'https://github.com/your-username/helper.db',
        discord: 'https://discord.gg/your-server',
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', link: '/guides/introduction/' },
            { label: 'Installation', link: '/guides/installation/' },
            { label: 'Quick Start', link: '/guides/quick-start/' },
          ],
        },
        {
          label: 'API Reference',
          autogenerate: { directory: 'reference' },
        },
        {
          label: 'Examples',
          autogenerate: { directory: 'examples' },
        },
        {
          label: 'Advanced',
          items: [
            { label: 'Configuration', link: '/advanced/configuration/' },
            { label: 'Performance', link: '/advanced/performance/' },
            { label: 'Troubleshooting', link: '/advanced/troubleshooting/' },
          ],
        },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
      components: {
        Head: './src/components/Head.astro',
        Header: './src/components/Header.astro',
        Sidebar: './src/components/Sidebar.astro',
      },
      editLink: {
        baseUrl: 'https://github.com/your-username/helper.db-docs/edit/main/',
      },
      lastUpdated: true,
      pagination: true,
      expressiveCode: {
        themes: ['dark-plus', 'light-plus'],
      },
    }),
    react(),
    mdx(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
  },
});
