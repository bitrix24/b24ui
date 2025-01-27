import { defineConfig, type DefaultTheme } from 'vitepress'
import { configParams } from './params'

export const en = defineConfig({
  lang: 'en-US',
  description: 'Bitrix24 UI-Kit for REST API web-application development',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/guide/': { base: '/guide/', items: sidebarGuide() },
      '/components/': { base: '/components/', items: sidebarComponents() }
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
    { text: 'Components', link: '/components/app' },
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
        { text: 'Install in a Nuxt app', link: 'installation-nuxt-app' },
        { text: 'I18n in a Nuxt app', link: 'i18n-nuxt' },
        { text: 'Install in a Vue app', link: 'installation-vue' },
        { text: 'I18n in a Vue app', link: 'i18n-vue' },
        { text: 'Contribution Guide', link: 'contribution' }
      ]
    }
  ]
}

function sidebarComponents(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '✔️Composables',
      collapsed: true,
      base: '/components/composables/',
      items: [
        { text: '✔️defineShortcuts', link: 'define-shortcuts' },
        { text: '✔️useFormField', link: 'use-form-field' },
        { text: '✔️useToast', link: 'use-toast' }
      ]
    },
    {
      text: '✔️Application',
      collapsed: true,
      items: [
        { text: '✔️App', link: 'app' }
      ]
    },
    {
      text: '✔️Actions',
      collapsed: true,
      items: [
        { text: '✔️Button', link: 'button' },
        { text: '✔️ButtonGroup', link: 'button-group' }
      ]
    },
    {
      text: 'Notifications',
      collapsed: false,
      items: [
        { text: '✔️Alert', link: 'alert' },
        { text: 'Advice', link: 'advice' },
        { text: '✔️Chip', link: 'chip' },
        { text: '✔️Toast', link: 'toast' },
        { text: '✔️Progress', link: 'progress' },
        { text: '✔️Tooltip', link: 'tooltip' }
      ]
    },
    {
      text: 'Data display',
      collapsed: false,
      items: [
        { text: '✔️Avatar', link: 'avatar' },
        { text: '✔️AvatarGroup', link: 'avatar-group' },
        { text: '✔️Badge', link: 'badge' },
        { text: '🔨Countdown', link: 'countdown' },
        { text: '✔️Kbd', link: 'kbd' }
      ]
    },
    {
      text: '✔️Data input',
      collapsed: true,
      items: [
        { text: '✔️Form', link: 'form' },
        { text: '✔️FormField', link: 'form-field' },
        { text: '✔️Input', link: 'input' },
        { text: '✔️RadioGroup', link: 'radio-group' },
        { text: '✔️Checkbox', link: 'checkbox' },
        { text: '✔️Switch', link: 'switch' },
        { text: '✔️Range', link: 'range' },
        { text: '✔️Select', link: 'select' },
        { text: '✔️Textarea', link: 'textarea' }
      ]
    },
    {
      text: '✔️Layout & Navigation',
      collapsed: true,
      items: [
        { text: '✔️Container', link: 'container' },
        { text: '✔️DescriptionList', base: '/components/content/', link: 'description-list' },
        { text: '✔️Link', link: 'link' },
        { text: '✔️Separator', link: 'separator' },
        { text: '✔️Skeleton', link: 'skeleton' },
        { text: '✔️Tabs', link: 'tabs' }
      ]
    }
  ]
}
