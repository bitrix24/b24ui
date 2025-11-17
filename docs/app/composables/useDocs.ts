import { useFilter } from 'reka-ui'
import type { ContentNavigationItem } from '@nuxt/content'

const searchTerm = ref('')
const route = useRoute()

export function useDocs(navigation: Ref<ContentNavigationItem[] | undefined>) {
  const { navigationMenuByCategory } = useNavigation(navigation!)

  const { contains } = useFilter({ sensitivity: 'base' })

  const filteredNavigation = computed(() => {
    if (!searchTerm.value) {
      return navigationMenuByCategory.value
    }

    return navigationMenuByCategory.value.filter(child => contains(child.label as string, searchTerm.value) || contains((child?.description || '') as string, searchTerm.value))
  })

  const isActiveSearch = computed(() => route.path.startsWith('/docs/components'))

  watch(() => route.path, () => {
    if (!isActiveSearch.value) {
      searchTerm.value = ''
    }
  })

  return {
    filteredNavigation,
    searchTerm,
    isActiveSearch
  }
}
