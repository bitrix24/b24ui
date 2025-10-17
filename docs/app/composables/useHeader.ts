import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import PlayLIcon from '@bitrix24/b24icons-vue/outline/PlayLIcon'
import DeveloperResourcesIcon from '@bitrix24/b24icons-vue/outline/DeveloperResourcesIcon'
import ViewmodeCodeIcon from '@bitrix24/b24icons-vue/editor/ViewmodeCodeIcon'
import FormattingIcon from '@bitrix24/b24icons-vue/editor/FormattingIcon'
// import FormIcon from '@bitrix24/b24icons-vue/outline/FormIcon'
// import DemonstrationOnIcon from '@bitrix24/b24icons-vue/outline/DemonstrationOnIcon'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

export function useHeader() {
  const route = useRoute()

  const desktopLinks = computed<NavigationMenuItem[]>(() => [
    {
      label: 'Docs',
      to: '/docs/getting-started/',
      active: route.path.startsWith('/docs/getting-started')
    },
    {
      label: 'Components',
      to: '/docs/components/',
      active: route.path.startsWith('/docs/components')
    },
    {
      label: 'Composables',
      to: '/docs/composables/define-shortcuts/',
      active: route.path.startsWith('/docs/composables')
    },
    {
      label: 'Typography',
      to: '/docs/typography/',
      active: route.path.startsWith('/docs/typography')
    }
    // {
    //   label: 'Templates',
    //   to: '/templates/'
    // },
    // {
    //   label: 'Showcase',
    //   to: '/showcase/'
    // }
  ])

  const mobileLinks = computed<NavigationMenuItem[]>(() => [
    {
      label: 'Get Started',
      to: '/docs/getting-started/',
      icon: PlayLIcon,
      active: route.path.startsWith('/docs/getting-started')
    },
    {
      label: 'Components',
      to: '/docs/components/',
      icon: DeveloperResourcesIcon,
      active: route.path.startsWith('/docs/components')
    },
    {
      label: 'Composables',
      to: '/docs/composables/',
      icon: ViewmodeCodeIcon,
      active: route.path.startsWith('/docs/composables')
    },
    {
      label: 'Typography',
      to: '/docs/typography/',
      icon: FormattingIcon,
      active: route.path.startsWith('/docs/typography')
    },
    // {
    //   label: 'Templates',
    //   to: '/templates/',
    //   icon: FormIcon
    // },
    // {
    //   label: 'Showcase',
    //   to: '/showcase/',
    //   icon: DemonstrationOnIcon
    // },
    {
      label: 'GitHub',
      to: 'https://github.com/bitrix24/b24ui',
      icon: GitHubIcon,
      target: '_blank'
    }
  ])

  return {
    desktopLinks,
    mobileLinks
  }
}
