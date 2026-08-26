import type { Ref } from 'vue'
import { createContext } from 'reka-ui'
import type { UseResizableProps } from '../composables/useResizable'

export interface DashboardContext extends Pick<UseResizableProps, 'storage' | 'storageKey' | 'storageOptions' | 'persistent' | 'unit'> {
  sidebarOpen?: Ref<boolean>
  sidebarCollapsed?: Ref<boolean>
  toggleSearch?: () => void
  toggleSidebar?: () => void
  collapseSidebar?: (collapsed: boolean) => void
}

/**
 * The `DashboardGroup` context pair: `provideDashboardContext` is called by
 * `DashboardGroup`, `useDashboard` reads it from `DashboardSidebar`,
 * `DashboardPanel`, `DashboardResizeHandle` and the search toggle.
 *
 * `useDashboard` throws when there is no `DashboardGroup` above — unlike the
 * theme context, which falls back. A dashboard part outside its group has no
 * sensible default to render: it does not know its own storage key, its
 * sidebar state, or which unit its neighbours size themselves in.
 */
export const [useDashboard, provideDashboardContext] = createContext<DashboardContext>('DashboardGroup')
