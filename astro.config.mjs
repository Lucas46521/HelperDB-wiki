import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

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
            label: 'Guias',
            items: [
              { label: 'Introdução', slug: 'guides/introduction' },
              { label: 'Instalação', slug: 'guides/installation' },
              { label: 'Início Rápido', slug: 'guides/quick-start' },
            ],
          },
          {
            label: 'Operações Básicas',
            items: [
              { label: 'get', slug: 'basic/get' },
              { label: 'set', slug: 'basic/set' },
              { label: 'has', slug: 'basic/has' },
              { label: 'delete', slug: 'basic/delete' },
              { label: 'all', slug: 'basic/all' },
            ],
          },
          {
            label: 'Operações em Lote',
            items: [
              { label: 'getMany', slug: 'batch/getmany' },
              { label: 'setMany', slug: 'batch/setmany' },
              { label: 'updateMany', slug: 'batch/updatemany' },
              { label: 'deleteMany', slug: 'batch/deletemany' },
            ],
          },
          {
            label: 'Operações em Arrays',
            items: [
              { label: 'push', slug: 'arrays/push' },
              { label: 'pop', slug: 'arrays/pop' },
              { label: 'unshift', slug: 'arrays/unshift' },
              { label: 'shift', slug: 'arrays/shift' },
              { label: 'splice', slug: 'arrays/splice' },
              { label: 'pull', slug: 'arrays/pull' },
              { label: 'map', slug: 'arrays/map' },
              { label: 'filter', slug: 'arrays/filter' },
              { label: 'reduce', slug: 'arrays/reduce' },
              { label: 'includes', slug: 'arrays/includes' },
              { label: 'indexOf', slug: 'arrays/indexof' },
            ],
          },
          {
            label: 'Operações Matemáticas',
            items: [
              { label: 'add', slug: 'math/add' },
              { label: 'sub', slug: 'math/sub' },
            ],
          },
          {
            label: 'Busca e Filtros',
            items: [
              { label: 'search', slug: 'search/search' },
              { label: 'startsWith', slug: 'search/startswith' },
              { label: 'endsWith', slug: 'search/endswith' },
              { label: 'regex', slug: 'search/regex' },
              { label: 'between', slug: 'search/between' },
              { label: 'in', slug: 'search/in' },
              { label: 'compare', slug: 'search/compare' },
              { label: 'custom', slug: 'search/custom' },
            ],
          },
          {
            label: 'Estatísticas',
            items: [
              { label: 'count', slug: 'stats/count' },
              { label: 'sum', slug: 'stats/sum' },
              { label: 'avg', slug: 'stats/avg' },
              { label: 'min', slug: 'stats/min' },
              { label: 'max', slug: 'stats/max' },
              { label: 'aggregate', slug: 'stats/aggregate' },
            ],
          },
          {
            label: 'Backup e Restauração',
            items: [
              { label: 'backup', slug: 'backup/backup' },
              { label: 'restore', slug: 'backup/restore' },
              { label: 'export', slug: 'backup/export' },
              { label: 'import', slug: 'backup/import' },
            ],
          },
          {
            label: 'Drivers',
            items: [
              { label: 'JSON', slug: 'drivers/json' },
              { label: 'SQLite', slug: 'drivers/sqlite' },
              { label: 'MySQL', slug: 'drivers/mysql' },
              { label: 'MariaDB', slug: 'drivers/mariadb' },
              { label: 'MongoDB', slug: 'drivers/mongodb' },
              { label: 'Memory', slug: 'drivers/memory' },
            ],
          },
          {
            label: 'Configuração',
            items: [
              { label: 'config', slug: 'config/config' },
              { label: 'cache', slug: 'config/cache' },
              { label: 'events', slug: 'config/events' },
              { label: 'transactions', slug: 'config/transactions' },
              { label: 'validation', slug: 'config/validation' },
              { label: 'backup-auto', slug: 'config/backup-auto' },
            ],
          },
          {
            label: 'Monitoramento',
            items: [
              { label: 'ping', slug: 'monitoring/ping' },
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

      lastUpdated: true,
      pagination: true,
      expressiveCode: {
        themes: ['github-dark', 'github-light'],
        styleOverrides: {
          borderRadius: '8px',
          codeFontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
        },
        defaultProps: {
          showLineNumbers: false,
          wrap: true,
        },
        frames: {
          showCopyToClipboardButton: true,
        },
        plugins: [],
        useDarkModeMediaQuery: false,
      },
      components: {
        Head: './src/components/Head.astro',
      },
    }),
    react(),

  ],
  vite: {
    plugins: [tailwindcss()],
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
  },
});