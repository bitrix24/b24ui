import type { Ref } from 'vue'
import { createContext } from 'reka-ui'
import type { UseLoadingProps } from '../composables/useLoading'

export interface DashboardContext extends Pick<UseLoadingProps, 'storage' | 'storageKey'> {
  contextId?: string
  sidebarOpen?: Ref<boolean>
  isLoading?: Ref<boolean>
  toggleSearch?: () => void
  toggleSidebar?: () => void
  load?: (loading: boolean, contextId?: string) => void
}

/**
 * @memo We added a little entropy because we don't want this code to end up in the vite cache.
 */
export const [useDashboard, provideDashboardContext] = createContext<DashboardContext>(`DashboardGroup_${Date.now()}`)
