import { upperName } from '../utils'
import GroupIcon from '@bitrix24/b24icons-vue/main/GroupIcon'
import HomeIcon from '@bitrix24/b24icons-vue/outline/HomeIcon'
// import CopilotIcon from '@bitrix24/b24icons-vue/outline/CopilotIcon'
// import ArrowRightLIcon from '@bitrix24/b24icons-vue/outline/ArrowRightLIcon'
// import ArrowLeftLIcon from '@bitrix24/b24icons-vue/outline/ArrowLeftLIcon'

const components = [
  'accordion',
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
].map(component => ({ label: upperName(component.split('/').pop() as string), icon: GroupIcon, to: `/components/${component}` }))

export const useNavigation = () => {
  // const appConfig = useAppConfig()

  const items = [
    { label: 'Home', icon: HomeIcon, to: '/' }
    // { label: 'Chat', icon: CopilotIcon, to: '/chat' }
  ]
  const groups = computed(() => [
    { id: 'links', items },
    { id: 'components', label: 'Components', items: components }
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

  return {
    components,
    groups,
    items
  }
}
