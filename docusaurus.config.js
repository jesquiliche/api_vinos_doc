// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Creación de una API',
  tagline: 'Laravel 11',
  favicon: 'assets/images/favicon.ico',

  // Set the production url of your site here
  url: 'https://jesquiliche.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/api_vinos_doc',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'jesquiliche', // Usually your GitHub org/user name.
  projectName: 'api_vinos_doc', // Usually your repo name.
  deploymentBranch:'gh-pages',
  trailingSlash:false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
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
      image: 'assets/images/logo.jpeg',
      navbar: {
        title: 'Como crear una API en Laravel 11',
        logo: {
          alt: 'My Site Logo',
          src: 'assets/images/logo.jpeg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Tutorial',
          },
          {
            href: 'https://github.com/jesquiliche/laravel_birras',
            label: 'GitHub',
            position: 'right',
          },
         
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
       
          {
            title: 'More',
            items: [
                           {
                label: 'GitHub',
                href: 'https://github.com/jesquiliche/laravel_birras',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Jesús Quintana Esquiliche.`,
      },
      
      prism: {
        theme: require('prism-react-renderer/themes/vsDark'),
      },
    }),
    
};
presets: [
  [
    '@docusaurus/preset-classic',
    {
      // ...
      // otras configuraciones
      // ...
      staticImageImportPath: 'static',
    },
  ],
]

module.exports = config;
