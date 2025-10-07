export function useHeader() {
  const route = useRoute()

  const desktopLinks = computed(() => [
    {
      label: 'Docs',
      to: '/docs/',
      active: route.path.startsWith('/docs/guide')
    },
    {
      label: 'Components',
      to: '/docs/components/app/',
      active: route.path.startsWith('/docs/components')
    },
    {
      label: 'Composables',
      to: '/docs/composables/define-shortcuts/',
      active: route.path.startsWith('/docs/composables')
    },
    {
      label: 'Templates',
      to: '/templates/'
    },
    {
      label: 'Showcase',
      to: '/showcase/'
    }
  ])

  const mobileLinks = computed(() => [
    {
      label: 'Get Started',
      to: '/docs/guide/getting-started/',
      active: route.path.startsWith('/docs/guide/getting-started')
    },
    {
      label: 'Components',
      to: '/docs/components/',
      active: route.path.startsWith('/docs/components')
    },
    {
      label: 'Composables',
      to: '/docs/composables/',
      active: route.path.startsWith('/docs/composables')
    },
    {
      label: 'Typography',
      to: '/docs/typography/',
      active: route.path.startsWith('/docs/typography')
    },
    {
      label: 'Templates',
      to: '/templates/'
    },
    {
      label: 'Showcase',
      to: '/showcase/'
    },
    {
      label: 'GitHub',
      to: 'https://github.com/bitrix24/b24ui',
      target: '_blank'
    }
  ])

  return {
    desktopLinks,
    mobileLinks
  }
}
