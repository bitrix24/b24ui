import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const listPathClear = [
  '/components/shortcuts',
  '/components/toast',
  '/components/confetti',
  '/components/tooltip',
  '/components/dropdown-menu'
]

export function useRouteCheck() {
  const route = useRoute()
  const checkedUseLightContent = ref(true)

  const isSidebarLayoutClearContent = computed<boolean>(() => {
    return (listPathClear.includes(route.path))
  })

  const isSidebarLayoutUseLightContent = computed<boolean>(() => {
    return isSidebarLayoutClearContent.value
      ? false
      : checkedUseLightContent.value
  })

  return {
    checkedUseLightContent,
    isSidebarLayoutClearContent,
    isSidebarLayoutUseLightContent
  }
}
