export function useFrameworks() {
  const framework = useCookie(
    'bitrix24-ui-framework',
    { default: () => 'nuxt' }
  )
  const { track } = useAnalytics()

  function setFramework(value: 'nuxt' | 'vue', source?: string) {
    framework.value = value
    track('Framework Switched', { framework: value, source: source || 'search' })
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
    setFramework,
    frameworks
  }
}
