<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/dashboard-sidebar-collapse'
import type { ButtonProps, LinkPropsKeys } from '../types'
import type { ComponentConfig } from '../types/tv'

type DashboardSidebarCollapse = ComponentConfig<typeof theme, AppConfig, 'dashboardSidebarCollapse'>

export interface DashboardSidebarCollapseProps extends Omit<ButtonProps, LinkPropsKeys | 'color'> {
  /**
   * @defaultValue 'air-tertiary'
   */
  color?: ButtonProps['color']
  /**
   * The side of the sidebar to collapse.
   * @defaultValue 'left'
   */
  side?: 'left' | 'right'
  b24ui?: { base?: any }
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForwardProps } from 'reka-ui'
import { reactiveOmit } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { useComponentUI } from '../composables/useComponentUI'
import { useDashboard } from '../utils/dashboard'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Button from './Button.vue'

const props = withDefaults(defineProps<DashboardSidebarCollapseProps>(), {
  color: 'air-tertiary',
  side: 'left'
})

const buttonProps = useForwardProps(reactiveOmit(props, 'icon', 'side', 'class'))

const { t } = useLocale()
const appConfig = useAppConfig() as DashboardSidebarCollapse['AppConfig']
const uiProp = useComponentUI('dashboardSidebarCollapse', props)
const { sidebarCollapsed, collapseSidebar } = useDashboard({ sidebarCollapsed: ref(false), collapseSidebar: () => {} })

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.dashboardSidebarCollapse || {}) }))
</script>

<template>
  <B24Button
    v-bind="{
      ...buttonProps,
      'icon': props.icon || (sidebarCollapsed ? icons.panelOpen : icons.panelClose),
      'aria-label': sidebarCollapsed ? t('dashboardSidebarCollapse.expand') : t('dashboardSidebarCollapse.collapse'),
      ...$attrs
    }"
    :class="b24ui({ class: [uiProp?.base, props.class], side: props.side })"
    @click="collapseSidebar?.(!sidebarCollapsed)"
  />
</template>
