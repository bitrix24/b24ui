import {
  inject,
  getCurrentInstance,
  type Ref,
  type InjectionKey
} from 'vue'

/**
 * Loading state for SidebarLayout
 */
export interface SidebarLayoutApi {
  // Current loading state
  readonly isLoading: Readonly<Ref<boolean>>

  // Load state of immediate parent SidebarLayout (false if no parent)
  readonly isParentLoading: Readonly<Ref<boolean>>

  // Root SidebarLayout Loading State
  readonly isRootLoading: Readonly<Ref<boolean>>

  // Set loading for current SidebarLayout
  setLoading: (value: boolean) => void

  // Set download to immediate parent SidebarLayout
  setParentLoading: (value: boolean) => void

  // Set loading for the topmost SidebarLayout in the hierarchy
  setRootLoading: (value: boolean) => void

  // Internal property for hierarchy
  rootRef: Ref<boolean>
}

export const sidebarLayoutInjectionKey: InjectionKey<SidebarLayoutApi> = Symbol('bitrix24-ui.sidebar-layout') as InjectionKey<SidebarLayoutApi>

/**
 * Hook for accessing SidebarLayout API
 * @returns API of current SidebarLayout
 * @throws {Error} If called outside SidebarLayout component
 */
export function useSidebarLayout(): SidebarLayoutApi {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('useSidebarLayout must be called within a component')
  }

  // Look for context in your own provide
  const context = inject(sidebarLayoutInjectionKey, null)

  if (!context) {
    throw new Error('useSidebarLayout must be used within SidebarLayout')
  }

  return context
}
