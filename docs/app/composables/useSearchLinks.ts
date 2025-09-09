export function useSearchLinks() {
  const route = useRoute()

  return computed(() => [
    {
      label: 'Docs',
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
    }
    // {
    //   label: 'Figma',
    //   description: 'Official Bitrix24 UI design kit for Figma.',
    //   to: '/figma'
    // },
    // {
    //   label: 'Templates',
    //   description: 'Official templates made with Bitrix24 UI.',
    //   to: '/templates'
    // }
  ])
}
