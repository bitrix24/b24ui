import { describe, it, expect } from 'vitest'
import ContentSearch from '../../../src/runtime/components/content/ContentSearch.vue'
import type { ContentSearchProps } from '../../../src/runtime/components/content/ContentSearch.vue'
import ComponentRender from '../../component-render'
import theme from '#build/b24ui/content/content-search'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('ContentSearch', () => {
  const sizes = Object.keys(theme.variants.size) as any

  const links = [{
    label: 'Docs',
    to: '/getting-started',
    icon: SignIcon
  }, {
    label: 'Components',
    icon: Cross30Icon,
    to: '/components'
  }, {
    label: 'Templates',
    icon: SignIcon,
    to: '/templates'
  }, {
    label: 'Showcase',
    icon: Cross30Icon,
    to: '/showcase'
  }]

  const navigation = [{
    title: 'Getting Started',
    path: '/getting-started',
    stem: '1.getting-started/1.index',
    children: [{
      title: 'Introduction',
      path: '/getting-started',
      stem: '1.getting-started/1.index',
      icon: SignIcon
    }, {
      title: 'Installation',
      path: '/getting-started/installation',
      stem: '1.getting-started/2.installation',
      icon: Cross30Icon
    }, {
      title: 'Theme',
      path: '/getting-started/theme',
      stem: '1.getting-started/3.theme',
      icon: SignIcon
    }]
  }]

  const files = [{
    id: '/getting-started',
    title: 'Introduction',
    titles: [],
    content: 'Bitrix24 UI harnesses the combined strengths of Reka UI, Tailwind CSS, and Tailwind Variants.',
    level: 1
  }, {
    id: '/getting-started#reka-ui',
    title: 'Reka UI',
    titles: [
      'Introduction'
    ],
    content: 'We\'ve transitioned from Headless UI to Reka UI.',
    level: 2
  }, {
    id: '/getting-started#tailwind-css',
    title: 'Tailwind CSS',
    titles: [
      'Introduction'
    ],
    content: 'Bitrix24 UI integrates the latest Tailwind CSS.',
    level: 2
  }, {
    id: '/getting-started#tailwind-variants',
    title: 'Tailwind Variants',
    titles: [
      'Introduction'
    ],
    content: 'We\'ve adopted Tailwind Variants to manage our design system.',
    level: 2
  }, {
    id: '/getting-started#typescript-integration',
    title: 'TypeScript Integration',
    titles: [
      'Introduction'
    ],
    content: 'Full auto-completion for component props based on your themeIntelligent suggestions',
    level: 2
  }, {
    id: '/getting-started#vue-compatibility',
    title: 'Vue compatibility',
    titles: [
      'Introduction'
    ],
    content: 'You can now use.',
    level: 2
  }, {
    id: '/getting-started#nuxt-devtools-integration',
    title: 'Nuxt DevTools Integration',
    titles: [
      'Introduction'
    ],
    content: 'You can play',
    level: 2
  }, {
    id: '/getting-started#migration',
    title: 'Migration',
    titles: [
      'Introduction'
    ],
    content: 'We want to be transparent.',
    level: 2
  }, {
    id: '/getting-started#faq',
    title: 'FAQ',
    titles: [
      'Introduction'
    ],
    content: 'Bitrix24 UI is now compatible with Vue! html pre.shiki code .sBMFI, html code.shiki .sBMFI{--shiki-light:#E2931D;--shiki-default:#FFCB6B;--shiki-dark:#FFCB6B}html pre.shiki code .sfazB, html code.shiki .sfazB{--shiki-light:#91B859;--shiki-default:#C3E88D;--shiki-dark:#C3E88D}html .light .shiki span {color: var(--shiki-light);background: var(--shiki-light-bg);font-style: var(--shiki-light-font-style);font-weight: var(--shiki-light-font-weight);text-decoration: var(--shiki-light-text-decoration);}html.light .shiki span {color: var(--shiki-light);background: var(--shiki-light-bg);font-style: var(--shiki-light-font-style);font-weight: var(--shiki-light-font-weight);text-decoration: var(--shiki-light-text-decoration);}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .dark .shiki span {color: var(--shiki-dark);background: var(--shiki-dark-bg);font-style: var(--shiki-dark-font-style);font-weight: var(--shiki-dark-font-weight);text-decoration: var(--shiki-dark-text-decoration);}html.dark .shiki span {color: var(--shiki-dark);background: var(--shiki-dark-bg);font-style: var(--shiki-dark-font-style);font-weight: var(--shiki-dark-font-weight);text-decoration: var(--shiki-dark-text-decoration);}',
    level: 2
  }]

  const props = { links, navigation, files, open: true, portal: false }

  it.each([
    // Props
    ['with links', { props }],
    ['with icon', { props: { ...props, icon: SignIcon } }],
    ['with placeholder', { props: { ...props, placeholder: 'Search' } }],
    ['with loading', { props: { ...props, loading: true } }],
    /** @memo not use loadingIcon */
    // ['with loadingIcon', { props: { ...props, loading: true, loadingIcon: Cross30Icon } }],
    ['without colorMode', { props: { ...props, colorMode: false } }],
    ['with fullscreen', { props: { ...props, fullscreen: true } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    ['with b24ui', { props: { ...props, b24ui: { input: '[&>input]:text-lg' } } }],
    ['with class', { props: { ...props, class: 'sm:max-w-5xl' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: ContentSearchProps }) => {
    const html = await ComponentRender(nameOrHtml, options, ContentSearch)
    expect(html).toMatchSnapshot()
  })
})
