import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [
    starlight({
      title: 'Helper.db',
      description: 'Documentação completa da biblioteca Helper.db',
      social: {
        github: 'https://github.com/your-username/helper.db',
      },
      sidebar: [
        {
          label: 'Começando',
          items: [
            { label: 'Introdução', slug: 'guides/introduction' },
            { label: 'Instalação', slug: 'guides/installation' },
            { label: 'Início Rápido', slug: 'guides/quick-start' },
          ],
        },
        {
          label: 'Referência',
          items: [
            { label: 'Database', slug: 'reference/database' },
          ],
        },
      ],
      customCss: [
        './src/styles/global.css',
        './src/styles/custom.css',
        './src/styles/mdx.css',
      ],

      editLink: {
        baseUrl: 'https://github.com/your-username/helper.db-docs/edit/main/',
      },
      lastUpdated: true,
      pagination: true,
      expressiveCode: false, // Desabilitar para usar nossos componentes
      components: {
        Head: './src/components/Head.astro',
        pre: './src/components/AutoCodeBlock.astro',
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