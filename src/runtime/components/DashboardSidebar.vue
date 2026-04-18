<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import type { UseResizableProps } from '../composables/useResizable'
import type { ButtonProps, DrawerProps, ModalProps, SlideoverProps, LinkPropsKeys } from '../types'
import type { ComponentConfig } from '../types/tv'
import theme from '#build/b24ui/dashboard-sidebar'

type DashboardSidebar = ComponentConfig<typeof theme, AppConfig, 'dashboardSidebar'>

type DashboardSidebarMode = 'modal' | 'slideover' | 'drawer'
type DashboardSidebarMenu<T> = T extends 'modal' ? ModalProps : T extends 'slideover' ? SlideoverProps : T extends 'drawer' ? DrawerProps : never

export interface DashboardSidebarProps<T extends DashboardSidebarMode = DashboardSidebarMode> extends Pick<UseResizableProps, 'id' | 'side' | 'minSize' | 'maxSize' | 'defaultSize' | 'resizable' | 'collapsible' | 'collapsedSize'> {
  /**
   * The mode of the sidebar menu.
   * @defaultValue 'slideover'
   */
  mode?: T
  /**
   * The props for the sidebar menu component.
   */
  menu?: DashboardSidebarMenu<T>
  /**
   * Customize the toggle button to open the sidebar.
   * `{ color: 'air-tertiary' }`{lang="ts-type"}
   * @defaultValue true
   */
  toggle?: boolean | Omit<ButtonProps, LinkPropsKeys>
  /**
   * The side to render the toggle button on.
   * @defaultValue 'left'
   */
  toggleSide?: 'left' | 'right'
  /**
   * Automatically close when route changes.
   * @defaultValue true
   */
  autoClose?: boolean
  class?: any
  b24ui?: DashboardSidebar['slots']
}

export interface DashboardSidebarSlots {
  'header'?(props: { collapsed: boolean, collapse: (value: boolean) => void }): VNode[]
  'default'?(props: { collapsed: boolean, collapse: (value: boolean) => void }): VNode[]
  'footer'?(props: { collapsed: boolean, collapse: (value: boolean) => void }): VNode[]
  'toggle'?(props: { open: boolean, toggle: () => void, b24ui: DashboardSidebar['b24ui'] }): VNode[]
  'content'?(props: { close?: () => void }): VNode[]
  'resize-handle'?(props: { onMouseDown: (e: MouseEvent) => void, onTouchStart: (e: TouchEvent) => void, onDoubleClick: (e: MouseEvent) => void, b24ui: DashboardSidebar['b24ui'] }): VNode[]
}
</script>

<script setup lang="ts" generic="T extends DashboardSidebarMode">
import { ref, computed, toRef, useId, watch } from 'vue'
import { defu } from 'defu'
import { createReusableTemplate } from '@vueuse/core'
import { useAppConfig, useRuntimeHook, useRoute } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { useResizable } from '../composables/useResizable'
import { useLocale } from '../composables/useLocale'
import { useDashboard } from '../utils/dashboard'
import { tv } from '../utils/tv'
import B24DashboardResizeHandle from './DashboardResizeHandle.vue'
import B24DashboardSidebarToggle from './DashboardSidebarToggle.vue'
import B24Slideover from './Slideover.vue'
import B24Modal from './Modal.vue'
import B24Drawer from './Drawer.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<DashboardSidebarProps<T>>(), {
  side: 'left',
  mode: 'slideover' as never,
  autoClose: true,
  toggle: true,
  toggleSide: 'left',
  minSize: 200,
  defaultSize: 240, // 15rem
  maxSize: 250,
  resizable: false,
  collapsible: false,
  collapsedSize: 66
})
const slots = defineSlots<DashboardSidebarSlots>()

const open = defineModel<boolean>('open', { default: false })
const collapsed = defineModel<boolean>('collapsed', { default: false })

const route = useRoute()
const { t } = useLocale()
const appConfig = useAppConfig() as DashboardSidebar['AppConfig']
const uiProp = useComponentUI('dashboardSidebar', props)

const dashboardContext = useDashboard({
  storageKey: 'dashboard',
  unit: 'px',
  sidebarOpen: ref(false),
  sidebarCollapsed: ref(false)
})

const id = `${dashboardContext.storageKey}-sidebar-${props.id || useId()}`

const { el, size, collapse, isCollapsed, isDragging, onMouseDown, onTouchStart, onDoubleClick } = useResizable(id, toRef(() => ({ ...dashboardContext, ...props })), { collapsed })

const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate()
const [DefineResizeHandleTemplate, ReuseResizeHandleTemplate] = createReusableTemplate()

useRuntimeHook('dashboard:sidebar:toggle', () => {
  open.value = !open.value
})

useRuntimeHook('dashboard:sidebar:collapse', (value: boolean) => {
  isCollapsed.value = value
})

watch(open, () => dashboardContext.sidebarOpen!.value = open.value, { immediate: true })
watch(isCollapsed, () => dashboardContext.sidebarCollapsed!.value = isCollapsed.value, { immediate: true })

watch(() => route.fullPath, () => {
  if (!props.autoClose) return

  open.value = false
})

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.dashboardSidebar || {}) })({
  side: props.side
}))

const Menu = computed(() => ({
  slideover: B24Slideover,
  modal: B24Modal,
  drawer: B24Drawer
})[props.mode as DashboardSidebarMode])

/**
 * @memo We move b24ui.overlay && b24ui.content from <template> in menuProps
 */
const menuProps = toRef(() => {
  const modeSettings: any = props.mode === 'modal'
    ? { fullscreen: true, transition: false }
    : props.mode === 'slideover'
      ? { side: 'left', close: false }
      : {}

  // @memo fix componentMeta
  if (props.mode === 'modal') {
    modeSettings['b24ui'] = { content: 'p-0 pt-0' }
  }

  const result = defu(
    props.menu,
    modeSettings
  ) as DashboardSidebarMenu<T>

  // @memo fix componentMeta
  // @memo fix componentMeta
  result['b24ui'] = {
    overlay: b24ui.value.overlay({ class: uiProp.value?.overlay }),
    content: b24ui.value.content({
      class: [modeSettings?.b24ui?.content, uiProp.value?.content]
    })
  }
  return result
})

function toggleOpen() {
  open.value = !open.value
}
</script>

<template>
  <DefineToggleTemplate>
    <slot name="toggle" :open="open" :toggle="toggleOpen" :b24ui="b24ui">
      <B24DashboardSidebarToggle
        v-if="toggle"
        v-bind="(typeof toggle === 'object' ? toggle : {})"
        :side="toggleSide"
        data-slot="toggle"
        :class="b24ui.toggle({ class: uiProp?.toggle, toggleSide })"
      />
    </slot>
  </DefineToggleTemplate>

  <DefineResizeHandleTemplate>
    <slot name="resize-handle" :on-mouse-down="onMouseDown" :on-touch-start="onTouchStart" :on-double-click="onDoubleClick" :b24ui="b24ui">
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
  </DefineResizeHandleTemplate>

  <ReuseResizeHandleTemplate v-if="side === 'right'" />

  <div
    :id="id"
    ref="el"
    v-bind="$attrs"
    :data-collapsed="isCollapsed"
    :data-dragging="isDragging"
    data-slot="root"
    :class="b24ui.root({ class: [uiProp?.root, props.class] })"
    :style="{ '--width': `${size || 0}${dashboardContext.unit}` }"
  >
    <div v-if="!!slots.header" data-slot="header" :class="b24ui.header({ class: uiProp?.header })">
      <slot name="header" :collapsed="isCollapsed" :collapse="collapse" />
    </div>

    <div data-slot="body" :class="b24ui.body({ class: uiProp?.body })">
      <slot :collapsed="isCollapsed" :collapse="collapse" />
    </div>

    <div v-if="!!slots.footer" data-slot="footer" :class="b24ui.footer({ class: uiProp?.footer })">
      <slot name="footer" :collapsed="isCollapsed" :collapse="collapse" />
    </div>
  </div>

  <ReuseResizeHandleTemplate v-if="side === 'left'" />

  <Menu
    v-model:open="open"
    :title="t('dashboardSidebar.title')"
    :description="t('dashboardSidebar.description')"
    v-bind="menuProps"
  >
    <template #content="contentData">
      <slot name="content" v-bind="contentData">
        <div v-if="!!slots.header || mode !== 'drawer'" data-slot="header" :class="b24ui.header({ class: uiProp?.header, menu: true })">
          <ReuseToggleTemplate v-if="mode !== 'drawer' && toggleSide === 'left'" />

          <slot name="header" :collapsed="false" :collapse="() => {}" />

          <ReuseToggleTemplate v-if="mode !== 'drawer' && toggleSide === 'right'" />
        </div>

        <div data-slot="body" :class="b24ui.body({ class: uiProp?.body, menu: true })">
          <slot :collapsed="false" :collapse="() => {}" />
        </div>

        <div v-if="!!slots.footer" data-slot="footer" :class="b24ui.footer({ class: uiProp?.footer, menu: true })">
          <slot name="footer" :collapsed="false" :collapse="() => {}" />
        </div>
      </slot>
    </template>
  </Menu>
</template>
