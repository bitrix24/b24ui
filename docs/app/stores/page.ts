/**
 * Page title && description
 */
import type { ContentNavigationItem } from '@nuxt/content'
// import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'

export const usePageStore = defineStore(
  'page',
  () => {
    // region State ////
    const navigation = ref<ContentNavigationItem[]>([])
    const isLoading = ref(false)
    // endregion ////

    const navigationMenuByCategory = computed(() => {
      const { navigationMenuByCategory } = useNavigation(navigation)
      return navigationMenuByCategory.value
    })

    const findSurround = (path: string) => {
      const { findSurround } = useNavigation(navigation)
      return findSurround(path)
    }

    return {
      navigation,
      isLoading,
      navigationMenuByCategory,
      findSurround
    }
  }
)
