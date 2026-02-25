<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/dashboard-panel'
import type { UseResizableProps } from '../composables/useResizable'
import type { ComponentConfig } from '../types/tv'

type DashboardPanel = ComponentConfig<typeof theme, AppConfig, 'dashboardPanel'>

export interface DashboardPanelProps extends Pick<UseResizableProps, 'id' | 'minSize' | 'maxSize' | 'defaultSize' | 'resizable'> {
  class?: any
  b24ui?: DashboardPanel['slots']
}

export interface DashboardPanelSlots {
  'default'(props?: {}): any
  'header'(props?: {}): any
  'body'(props?: {}): any
  'footer'(props?: {}): any
  'resize-handle'(props: { onMouseDown: (e: MouseEvent) => void, onTouchStart: (e: TouchEvent) => void, onDoubleClick: (e: MouseEvent) => void }): any
}
</script>

<script setup lang="ts">
import { computed, useId, toRef } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { useResizable } from '../composables/useResizable'
import { useDashboard } from '../utils/dashboard'
import { tv } from '../utils/tv'
import B24DashboardResizeHandle from './DashboardResizeHandle.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<DashboardPanelProps>(), {
  minSize: 200,
  resizable: false
})
defineSlots<DashboardPanelSlots>()

const appConfig = useAppConfig() as DashboardPanel['AppConfig']
const uiProp = useComponentUI('dashboardPanel', props)
const dashboardContext = useDashboard({ storageKey: 'dashboard', unit: 'px' })

const id = `${dashboardContext.storageKey}-panel-${props.id || useId()}`

const { el, size, isDragging, onMouseDown, onTouchStart, onDoubleClick } = useResizable(id, toRef(() => ({ ...dashboardContext, ...props })))

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.dashboardPanel || {}) })({
  size: !!size.value
}))
</script>

<template>
  <div
    :id="id"
    ref="el"
    v-bind="$attrs"
    :data-dragging="isDragging"
    data-slot="root"
    :class="b24ui.root({ class: [uiProp?.root, props.class] })"
    :style="[size ? { '--width': `${size}${dashboardContext.unit}` } : undefined]"
  >
    <slot>
      <slot name="header" />

      <div data-slot="body" :class="b24ui.body({ class: uiProp?.body })">
        <slot name="body" />
      </div>

      <slot name="footer" />
    </slot>
  </div>

  <slot name="resize-handle" :on-mouse-down="onMouseDown" :on-touch-start="onTouchStart" :on-double-click="onDoubleClick">
    <B24DashboardResizeHandle
      v-if="resizable"
      :aria-controls="id"
      data-slot="handle"
      :class="b24ui.handle({ class: uiProp?.handle })"
      @mousedown="onMouseDown"
      @touchstart="onTouchStart"
      @dblclick="onDoubleClick"
    />
  </slot>
</template>
