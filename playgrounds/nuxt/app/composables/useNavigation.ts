import type { NavigationMenuItem, PageLink } from '@bitrix24/b24ui-nuxt'
import type { Surround } from '../types'
import { upperName } from '../utils'
import ItemIcon from '@bitrix24/b24icons-vue/crm/ItemIcon'
import TextIcon from '@bitrix24/b24icons-vue/outline/TextIcon'
import HomeIcon from '@bitrix24/b24icons-vue/outline/HomeIcon'
// import CopilotIcon from '@bitrix24/b24icons-vue/outline/CopilotIcon'
// import ArrowRightLIcon from '@bitrix24/b24icons-vue/outline/ArrowRightLIcon'
// import ArrowLeftLIcon from '@bitrix24/b24icons-vue/outline/ArrowLeftLIcon'

const normalizePath = (p: string) => (p.endsWith('/') ? p.slice(0, -1) : p)

const components = [
  'accordion',
  'advice',
  'alert',
  // 'auth-form',
  'avatar',
  'badge',
  // // 'banner',
  // 'blog-post',
  'breadcrumb',
  'button',
  'calendar',
  'card',
  // 'carousel',
  // 'changelog-version',
  'checkbox-group',
  'checkbox',
  'chip',
  'collapsible',
  'color-mode',
  'color-picker',
  'command-palette',
  // // 'content/content-navigation',
  // // 'content/content-surround',
  // // 'content/content-toc',
  'context-menu',
  // 'drawer',
  'dropdown-menu',
  'editor',
  'empty',
  'error',
  'field-group',
  'file-upload',
  // 'footer',
  'form-field',
  'form',
  // 'header',
  'input-date',
  'input-menu',
  'input-number',
  'input-tags',
  'input-time',
  'input',
  'kbd',
  'link',
  'locale',
  // 'marquee',
  'modal',
  'navigation-menu',
  // 'page-anchors',
  'page-card',
  // 'page-cta',
  // 'page-feature',
  // 'page-header',
  // 'page-hero',
  'page-links',
  // 'page-logos',
  // 'page-section',
  'pagination',
  'pin-input',
  'popover',
  // 'pricing-plan',
  // 'pricing-table',
  'progress',
  'radio-group',
  'scroll-area',
  'select-menu',
  'select',
  'separator',
  'shortcuts',
  'skeleton',
  'slideover',
  'range',
  'stepper',
  'switch',
  'table',
  'tabs',
  'textarea',
  'timeline',
  'toast',
  'tooltip',
  // 'tree',
  'user'
].map(component => ({ label: upperName(component.split('/').pop() as string), icon: ItemIcon, to: `/components/${component}` }))

const componentsProse = ['show'].map(component => ({
  label: upperName(component.split('/').pop() as string),
  icon: TextIcon,
  to: `/components/prose/${component}`
}))

const externalLinks: PageLink[] = [
  {
    label: 'b24icons',
    to: 'https://bitrix24.github.io/b24icons/',
    target: '_blank'
  },
  {
    label: 'b24jssdk',
    to: 'https://bitrix24.github.io/b24jssdk/',
    target: '_blank'
  }
]

export const useNavigation = () => {
  // const appConfig = useAppConfig()

  const items = [
    { label: 'Home', icon: HomeIcon, to: '/' }
    // { label: 'Chat', icon: CopilotIcon, to: '/chat' }
  ]

  const groups = computed(() => [
    { id: 'links', items },
    { id: 'components', label: 'Components', items: components },
    { id: 'components/prose', label: 'Prose', items: componentsProse }
    // {
    //   id: 'dir',
    //   label: 'Direction',
    //   items: [{
    //     label: 'LTR',
    //     icon: ArrowRightLIcon,
    //     active: appConfig.dir === 'ltr',
    //     onSelect: () => appConfig.dir = 'ltr'
    //   }, {
    //     label: 'RTL',
    //     icon: ArrowLeftLIcon,
    //     active: appConfig.dir === 'rtl',
    //     onSelect: () => appConfig.dir = 'rtl'
    //   }]
    // }
  ])

  function findSurround(path: string): Surround<NavigationMenuItem> {
    const current = normalizePath(path)
    const list = components
    const index = list.findIndex(
      i => normalizePath(String(i.to)) === current
    )

    if (index === -1) {
      return [undefined, undefined]
    }

    return [list[index - 1], list[index + 1]]
  }

  return {
    components,
    componentsProse,
    groups,
    items,
    externalLinks,
    findSurround
  }
}
