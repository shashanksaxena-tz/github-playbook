// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'GitHub Copilot & AI-Native SDLC Playbook',
  tagline: 'Organizational guide for standardizing AI tool adoption',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-org.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/github-playbook/',

  // GitHub pages deployment config
  organizationName: 'your-org',
  projectName: 'github-playbook',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/your-org/github-playbook/tree/main/',
          path: 'content',
          id: 'default',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'AI-Native SDLC Playbook',
        logo: {
          alt: 'Taazaa Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Home',
          },
          {
            type: 'docSidebar',
            sidebarId: 'developerSidebar',
            position: 'left',
            label: 'Developer Guide',
          },
          {
            type: 'docSidebar',
            sidebarId: 'architectSidebar',
            position: 'left',
            label: 'Architect Guide',
          },
          {
            type: 'docSidebar',
            sidebarId: 'qaSidebar',
            position: 'left',
            label: 'QA Guide',
          },
          {
            type: 'docSidebar',
            sidebarId: 'devopsSidebar',
            position: 'left',
            label: 'DevOps Guide',
          },
          {
            type: 'docSidebar',
            sidebarId: 'sharedSidebar',
            position: 'left',
            label: 'Shared Content',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} GitHub Copilot & AI-Native SDLC Playbook. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['python', 'javascript', 'typescript', 'java', 'csharp', 'bash', 'yaml', 'json'],
      },
      // Algolia search is optional - using built-in search for now
      // To enable Algolia, uncomment and configure:
      // algolia: {
      //   appId: 'YOUR_APP_ID',
      //   apiKey: 'YOUR_SEARCH_API_KEY',
      //   indexName: 'YOUR_INDEX_NAME',
      // },
    }),
};

module.exports = config;

