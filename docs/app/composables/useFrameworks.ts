export function useFrameworks() {
  const framework = useCookie(
    'bitrix24-ui-framework',
    { default: () => 'nuxt' }
  )
  const frameworks = computed(() => [{
    label: 'Nuxt',
    value: 'nuxt',
    onSelect: () => framework.value = 'nuxt'
  }, {
    label: 'Vue',
    value: 'vue',
    onSelect: () => framework.value = 'vue'
  }].map(f => ({ ...f, active: framework.value === f.value })))

  return {
    framework,
    frameworks
  }
}
