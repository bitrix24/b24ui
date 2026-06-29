<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/dashboard-sidebar-toggle'
import type { ButtonProps } from './Button.vue'
import type { LinkPropsKeys } from './Link.vue'
import type { ComponentConfig } from '../types/tv'

type DashboardSidebarToggle = ComponentConfig<typeof theme, AppConfig, 'dashboardSidebarToggle'>

export interface DashboardSidebarToggleProps extends Omit<ButtonProps, LinkPropsKeys | 'color'> {
  /**
   * @defaultValue 'air-tertiary'
   */
  color?: ButtonProps['color']
  /**
   * The side of the sidebar to toggle.
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
import { useComponentProps } from '../composables/useComponentProps'
import { useDashboard } from '../utils/dashboard'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Button from './Button.vue'

defineOptions({ inheritAttrs: false })

const _props = withDefaults(defineProps<DashboardSidebarToggleProps>(), {
  color: 'air-tertiary',
  side: 'left'
})

const props = useComponentProps('dashboardSidebarToggle', _props)

const buttonProps = useForwardProps(reactiveOmit(props, 'icon', 'side', 'class'))

const { t } = useLocale()
const appConfig = useAppConfig() as DashboardSidebarToggle['AppConfig']
const { sidebarOpen, toggleSidebar } = useDashboard({ sidebarOpen: ref(false), toggleSidebar: () => {} })

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.dashboardSidebarToggle || {}) }))
</script>

<template>
  <B24Button
    v-bind="{
      ...buttonProps,
      'icon': props.icon || (sidebarOpen ? icons.close : icons.menu),
      'aria-label': sidebarOpen ? t('dashboardSidebarToggle.close') : t('dashboardSidebarToggle.open'),
      ...$attrs
    }"
    :class="b24ui({ class: [props.b24ui?.base, props.class], side: props.side })"
    @click="toggleSidebar"
  />
</template>
