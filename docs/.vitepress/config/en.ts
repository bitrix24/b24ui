import { defineConfig, type DefaultTheme } from 'vitepress'
import { configParams } from './params'

// ✔️ 🔨 💡 //////

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
    { text: 'Docs', link: '/guide/getting-started' },
    { text: 'Components', link: '/components/app' },
    {
      text: configParams.version,
      items: [
        {
          text: 'Changelog',
          link: `${configParams.github}/blob/main/CHANGELOG.md`
        },
        {
          text: 'Demo',
          link: `${configParams.domain}${configParams.baseFolder}demo/`
        },
        ...configParams.relative
      ]
    }
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Introduction', link: 'getting-started' },
    {
      text: 'Nuxt',
      collapsed: false,
      items: [
        { text: 'Installation', link: 'installation-nuxt-app' }
        // { text: 'I18n', link: 'i18n-nuxt' }
      ]
    },
    {
      text: 'Vue',
      collapsed: false,
      items: [
        { text: 'Installation', link: 'installation-vue' }
        // { text: 'I18n', link: 'i18n-vue' }
      ]
    },
    { text: 'Contribution Guide', link: 'contribution' }
  ]
}

function sidebarComponents(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Composables',
      collapsed: false,
      base: '/components/composables/',
      items: [
        { text: 'defineShortcuts', link: 'define-shortcuts' },
        { text: 'useModal', link: 'use-modal' },
        { text: 'useFormField', link: 'use-form-field' },
        { text: 'useToast', link: 'use-toast' }
      ]
    },
    {
      text: 'Application',
      collapsed: false,
      items: [
        { text: 'App', link: 'app' }
      ]
    },
    {
      text: 'Actions',
      collapsed: false,
      items: [
        { text: 'Button', link: 'button' },
        { text: 'ButtonGroup', link: 'button-group' },
        { text: 'DropdownMenu', link: 'dropdown-menu' },
        { text: 'Modal', link: 'modal' }
      ]
    },
    {
      text: 'Notifications',
      collapsed: false,
      items: [
        { text: 'Alert', link: 'alert' },
        { text: 'Advice', link: 'advice' },
        { text: 'Chip', link: 'chip' },
        { text: 'Toast', link: 'toast' },
        { text: 'Progress', link: 'progress' },
        { text: 'Tooltip', link: 'tooltip' }
      ]
    },
    {
      text: 'Data display',
      collapsed: false,
      items: [
        { text: 'Avatar', link: 'avatar' },
        { text: 'AvatarGroup', link: 'avatar-group' },
        { text: 'Badge', link: 'badge' },
        { text: 'Countdown', link: 'countdown' },
        { text: 'Kbd', link: 'kbd' }
      ]
    },
    {
      text: 'Data input',
      collapsed: false,
      items: [
        { text: 'Form', link: 'form' },
        { text: 'FormField', link: 'form-field' },
        { text: 'Input', link: 'input' },
        { text: 'InputMenu💡', link: 'input-menu' },
        { text: 'InputNumber', link: 'input-number' },
        { text: 'Textarea', link: 'textarea' },
        { text: 'Select', link: 'select' },
        { text: 'SelectMenu💡', link: 'select-menu' },
        { text: 'RadioGroup', link: 'radio-group' },
        { text: 'Checkbox', link: 'checkbox' },
        { text: 'Switch', link: 'switch' },
        { text: 'Range', link: 'range' }
      ]
    },
    {
      text: 'Layout & Navigation',
      collapsed: false,
      items: [
        { text: 'Container', link: 'container' },
        { text: 'DescriptionList', base: '/components/content/', link: 'description-list' },
        { text: 'Link', link: 'link' },
        { text: 'Separator', link: 'separator' },
        { text: 'Skeleton', link: 'skeleton' },
        { text: 'Tabs', link: 'tabs' }
      ]
    }
  ]
}
