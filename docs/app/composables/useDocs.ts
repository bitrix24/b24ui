import { useFilter } from 'reka-ui'
import type { ContentNavigationItem } from '@nuxt/content'

const searchTerm = ref('')

export function useDocs(navigation: Ref<ContentNavigationItem[] | undefined>) {
  const { navigationMenuByCategory } = useNavigation(navigation!)

  const { contains } = useFilter({ sensitivity: 'base' })

  return {
    navigationMenuByCategory,
    contains,
    searchTerm
  }
}
