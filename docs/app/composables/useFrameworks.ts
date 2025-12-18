export function useFrameworks() {
  const framework = useCookie(
    'bitrix24-ui-framework',
    { default: () => 'nuxt' }
  )
  const { track } = useAnalytics()

  function setFramework(value: 'nuxt' | 'vue') {
    framework.value = value
    track('Framework Switched', { framework: value })
  }

  const frameworks = computed(() => [{
    label: 'Nuxt',
    value: 'nuxt',
    onSelect: () => setFramework('nuxt')
  }, {
    label: 'Vue',
    value: 'vue',
    onSelect: () => setFramework('vue')
  }].map(f => ({ ...f, active: framework.value === f.value })))

  return {
    framework,
    frameworks
  }
}
