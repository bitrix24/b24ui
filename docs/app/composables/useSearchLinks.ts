export function useSearchLinks() {
  const route = useRoute()

  return computed(() => [{
    label: 'Docs',
    icon: 'i-lucide-square-play',
    to: '/docs/getting-started',
    active: route.path.startsWith('/docs/getting-started')
  }, {
    label: 'Components',
    icon: 'i-lucide-square-code',
    to: '/docs/components',
    active: route.path.startsWith('/docs/components')
  }, {
    label: 'Composables',
    icon: 'i-lucide-square-function',
    to: '/docs/composables',
    active: route.path.startsWith('/docs/composables')
  }, {
    label: 'Figma',
    description: 'Official Nuxt UI design kit for Figma.',
    icon: 'i-simple-icons-figma',
    to: '/figma'
  }, {
    icon: 'i-lucide-panels-top-left',
    label: 'Templates',
    description: 'Official templates made with Nuxt UI.',
    to: '/templates'
  }, {
    icon: 'i-lucide-presentation',
    label: 'Showcase',
    description: 'Check out some of the amazing projects built with Nuxt UI.',
    to: '/showcase'
  }, {
    label: 'Team',
    description: 'Meet the team behind Nuxt UI.',
    icon: 'i-lucide-users',
    to: '/team'
  }, {
    label: 'Releases',
    icon: 'i-lucide-rocket',
    description: 'Stay up to date with the latest releases of Nuxt UI.',
    to: 'https://github.com/nuxt/ui/releases',
    target: '_blank'
  }])
}
