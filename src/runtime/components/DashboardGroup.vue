<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/dashboard-group'
import type { UseLoadingProps } from '../composables/useLoading'
import type { ComponentConfig } from '../types/tv'

type DashboardGroup = ComponentConfig<typeof theme, AppConfig, 'dashboardGroup'>

export interface DashboardGroupProps extends Pick<UseLoadingProps, 'id' | 'storage' | 'storageKey'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: { base?: any }
}

export interface DashboardGroupSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { ref, computed, useId } from 'vue'
import { Primitive } from 'reka-ui'
import { useNuxtApp, useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { provideDashboardContext } from '../utils/dashboard'
import { tv } from '../utils/tv'

const props = withDefaults(defineProps<DashboardGroupProps>(), {
  storage: 'cookie',
  storageKey: 'dashboard'
})
defineSlots<DashboardGroupSlots>()

const nuxtApp = useNuxtApp()
const appConfig = useAppConfig() as DashboardGroup['AppConfig']
const uiProp = useComponentUI('dashboardGroup', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.dashboardGroup || {}) }))

const sidebarOpen = ref(false)
const isLoading = ref(false)

const contextId = `${props.storage}-sidebar-group-${props.id || useId()}`

provideDashboardContext({
  contextId,
  storage: props.storage,
  storageKey: props.storageKey,
  sidebarOpen,
  toggleSidebar: () => {
    nuxtApp.hooks.callHook('dashboard:sidebar:toggle')
  },
  toggleSearch: () => {
    nuxtApp.hooks.callHook('dashboard:search:toggle')
  },
  isLoading,
  load: (load: boolean, contextId?: string) => {
    nuxtApp.hooks.callHook('dashboard:content:load', load, contextId)
  }
})
</script>

<template>
  <Primitive :as="as" :class="b24ui({ class: [uiProp?.base, props.class] })">
    <slot />
  </Primitive>
</template>
