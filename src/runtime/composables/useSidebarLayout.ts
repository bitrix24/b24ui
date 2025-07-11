import { ref, readonly, type Ref, type InjectionKey } from 'vue'

/**
 * Loading state for SidebarLayout
 * @todo add docs
 */
export interface SidebarLayoutContext {
  loading: Readonly<Ref<boolean>>
  setLoading: (value: boolean) => void
}

export const sidebarLayoutInjectionKey: InjectionKey<SidebarLayoutContext> = Symbol('bitrix24-ui.sidebar-layout')

const loading = ref(false)

const setLoading = (value: boolean) => {
  loading.value = value
}

export function useSidebarLayout(): SidebarLayoutContext {
  return {
    loading: readonly(loading),
    setLoading
  }
}
