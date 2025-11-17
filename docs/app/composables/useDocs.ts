import { useFilter } from 'reka-ui'
import type { ContentNavigationItem } from '@nuxt/content'

const value = ref('')

export function useDocs(navigation: Ref<ContentNavigationItem[] | undefined>) {
  const { navigationMenuByCategory } = useNavigation(navigation!)

  const { contains } = useFilter({ sensitivity: 'base' })

  const filteredNavigation = computed(() => {
    if (!value.value) {
      return navigationMenuByCategory.value
    }

    return navigationMenuByCategory.value.filter(child => contains(child.label as string, value.value) || contains((child?.description || '') as string, value.value))
  })

  return {
    filteredNavigation,
    value
  }
}
