import type { Ref } from 'vue'
import { createContext } from 'reka-ui'
import type { UseLoadingProps } from '../composables/useLoading'

export interface DashboardContext extends /** @vue-ignore */ Pick<UseLoadingProps, 'storage' | 'storageKey'> {
  contextId?: string
  sidebarOpen?: Ref<boolean>
  isLoading?: Ref<boolean>
  toggleSearch?: () => void
  toggleSidebar?: () => void
  load?: (loading: boolean, contextId?: string) => void
}

export const [useDashboard, provideDashboardContext] = createContext<DashboardContext>(`DashboardGroup`)
