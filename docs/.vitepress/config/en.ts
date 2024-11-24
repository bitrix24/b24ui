import { defineConfig, type DefaultTheme } from 'vitepress'
import { configParams } from './params'

export const en = defineConfig({
  lang: 'en-US',
  description: 'Bitrix24 UI-Kit for REST API web-application development',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/guide/': { base: '/guide/', items: sidebarGuide() },
      '/reference/': { base: '/reference/', items: sidebarReference() }
    },

    editLink: {
      pattern: 'https://github.com/bitrix24/b24ui/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Bitrix24'
    }
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Quickstart', link: '/guide/getting-started' },
    { text: 'Reference', link: '/reference/index' },
    {
      text: configParams.version,
      items: [
        {
          text: 'Changelog',
          link: `${configParams.github}/blob/main/CHANGELOG.md`
        },
        ...configParams.relative
      ]
    }
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Guide',
      collapsed: false,
      items: [
        { text: 'Getting Started', link: 'getting-started' },
        { text: 'Install in a Nuxt app', link: 'installation-nuxt-app' }
      ]
    }
  ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Reference',
      collapsed: false,
      items: [
        { text: 'Reference', link: 'index' }
      ]
    }
  ]
}
