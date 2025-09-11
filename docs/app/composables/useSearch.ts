export function useSearch() {
  const route = useRoute()

  const links = computed(() => [
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
    },
    {
      label: 'Typography',
      to: '/docs/typography/',
      active: route.path.startsWith('/docs/typography')
    }
  ])

  return {
    links
  }
}
