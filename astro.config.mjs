import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";




export default defineConfig({
  integrations: [
    starlight({
      title: 'Helper.db',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/your-username/helper.db',
        },
        {
          icon: 'discord',
          label: 'Discord',
          href: 'https://discord.gg/your-server',
        },
      ],
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
          label: 'Classes',
          items: [
            { label: 'Database', link: '/reference/database/' },
            { label: 'Query', link: '/reference/query/' },
            { label: 'Backup', link: '/reference/backup/' },
          ],
        },
        {
          label: 'Examples',
          items: [
            { label: 'Discord Bot', link: '/examples/discord-bot/' },
            { label: 'Web Application', link: '/examples/web-app/' },
            { label: 'API Server', link: '/examples/api-server/' },
          ],
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
        './src/styles/global.css',
        './src/styles/custom.css',
        './src/styles/mdx.css',
      ],
      favicon: '/src/assets/favicon.ico',
      
      editLink: {
        baseUrl: 'https://github.com/your-username/helper.db-docs/edit/main/',
      },
      lastUpdated: true,
      pagination: true,
      expressiveCode: {
        themes: ['dark-plus', 'github-light'],
      },
      components: {
        Head: './src/components/Head.astro',
      },
    }),
    react(),
    mdx(),
    
  ],
  vite: {
    plugins: [tailwindcss()],
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
  },
});