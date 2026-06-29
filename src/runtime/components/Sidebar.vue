<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/sidebar'
import type { IconComponent } from '../types/icons'
import type { ButtonProps } from './Button.vue'
import type { DrawerProps } from './Drawer.vue'
import type { LinkPropsKeys } from './Link.vue'
import type { ModalProps } from './Modal.vue'
import type { SlideoverProps } from './Slideover.vue'
import type { ComponentConfig } from '../types/tv'

type Sidebar = ComponentConfig<typeof theme, AppConfig, 'sidebar'>

type SidebarState = 'expanded' | 'collapsed'
type SidebarMode = 'modal' | 'slideover' | 'drawer'
type SidebarMenu<T> = T extends 'modal' ? ModalProps : T extends 'slideover' ? SlideoverProps : T extends 'drawer' ? DrawerProps : never

export interface SidebarProps<T extends SidebarMode = SidebarMode> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'aside'
   */
  as?: any
  /**
   * The visual variant of the sidebar.
   * @defaultValue 'sidebar'
   */
  variant?: Sidebar['variants']['variant']
  /**
   * The collapse behavior of the sidebar.
   * - `offcanvas`: The sidebar slides out of view completely.
   * - `icon`: The sidebar shrinks to icon-only width.
   * - `none`: The sidebar is not collapsible.
   * @defaultValue 'offcanvas'
   */
  collapsible?: Sidebar['variants']['collapsible']
  /**
   * The side to render the sidebar on.
   * @defaultValue 'left'
   */
  side?: Sidebar['variants']['side']
  /**
   * The title displayed in the sidebar header.
   */
  title?: string
  /**
   * The description displayed in the sidebar header.
   */
  description?: string
  /**
   * Display a close button to collapse the sidebar.
   * Only renders when `collapsible` is not `none`.
   * `{ size: 'md', color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   * @defaultValue false
   */
  close?: boolean | Omit<ButtonProps, LinkPropsKeys>
  /**
   * The icon displayed in the close button.
   * @defaultValue icons.close
   * @IconComponent
   */
  closeIcon?: IconComponent
  /**
   * Display a rail on the sidebar edge to toggle collapse.
   * Only renders when `collapsible` is not `none`.
   * @defaultValue false
   */
  rail?: boolean
  /**
   * Animate the sidebar when collapsing or expanding.
   * @defaultValue true
   */
  transition?: boolean
  /**
   * The mode of the sidebar menu on mobile.
   * @defaultValue 'slideover'
   */
  mode?: T
  /**
   * The props for the sidebar menu component on mobile.
   */
  menu?: SidebarMenu<T>
  class?: any
  b24ui?: Sidebar['slots']
}

export interface SidebarSlots {
  header?(props: { state: SidebarState, open: boolean, close: () => void }): VNode[]
  title?(props: { state: SidebarState }): VNode[]
  description?(props: { state: SidebarState }): VNode[]
  actions?(props: { state: SidebarState }): VNode[]
  close?(props: { b24ui: Sidebar['b24ui'], state: SidebarState }): VNode[]
  default?(props: { state: SidebarState, open: boolean, close: () => void }): VNode[]
  footer?(props: { state: SidebarState, open: boolean, close: () => void }): VNode[]
  rail?(props: { b24ui: Sidebar['b24ui'], state: SidebarState }): VNode[]
  content?(props: { close: () => void }): VNode[]
}
</script>

<script setup lang="ts" generic="T extends SidebarMode">
import { computed, onMounted, ref, toRef, watch } from 'vue'
import { Primitive } from 'reka-ui'
import { defu } from 'defu'
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useLocale } from '../composables/useLocale'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Button from './Button.vue'
import B24Slideover from './Slideover.vue'
import B24Modal from './Modal.vue'
import B24Drawer from './Drawer.vue'

defineOptions({ inheritAttrs: false })

const _props = withDefaults(defineProps<SidebarProps<T>>(), {
  as: 'aside',
  variant: 'sidebar',
  collapsible: 'offcanvas',
  side: 'left',
  close: false,
  transition: true,
  rail: false,
  mode: 'slideover' as never
})
const slots = defineSlots<SidebarSlots>()

const props = useComponentProps<SidebarProps<T>>('sidebar', _props)

const [DefineInnerTemplate, ReuseInnerTemplate] = createReusableTemplate()
const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate()

const mediaQuery = useMediaQuery('(max-width: 1023px)')
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
const isMobile = computed(() => isMounted.value && mediaQuery.value)

// Viewport-aware open model: on desktop controls expanded/collapsed, on mobile controls the sheet
const modelOpen = defineModel<boolean>('open', { default: true })
const openMobile = ref(false)

// Saved desktop state so viewport transitions don't lose it
const desktopOpen = ref(modelOpen.value)

const open = computed({
  get: () => isMobile.value ? openMobile.value : modelOpen.value,
  set: (value: boolean) => {
    if (isMobile.value) {
      openMobile.value = value
    } else {
      modelOpen.value = value
    }
  }
})

// Handle viewport transitions and initial mobile state
watch(isMobile, (mobile) => {
  if (mobile) {
    // Save desktop state and align model to mobile (closed)
    desktopOpen.value = modelOpen.value
    modelOpen.value = false
  } else {
    // Restore desktop state
    modelOpen.value = desktopOpen.value
  }
}, { immediate: true })

// Sync model changes into mobile state
watch(modelOpen, (value) => {
  if (isMobile.value) {
    openMobile.value = value
  }
})

// Sync mobile dismissal (overlay click, swipe) back to model so toggle stays in sync
watch(openMobile, (value) => {
  if (isMobile.value) {
    modelOpen.value = value
  }
})

const { t } = useLocale()
const appConfig = useAppConfig() as Sidebar['AppConfig']

const state = computed<SidebarState>(() => open.value ? 'expanded' : 'collapsed')

// Close button only works when collapsible is not 'none'
const canClose = computed(() => (props.close && props.collapsible !== 'none') || isMobile.value)

function closeSidebar() {
  open.value = false
}

const hasHeader = computed(() => !!slots.header || props.title || !!slots.title || props.description || !!slots.description || !!slots.actions || canClose.value || !!slots.close)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.sidebar || {}) })({
  side: props.side,
  variant: props.variant,
  collapsible: props.collapsible,
  transition: props.transition
}))

const Menu = computed(() => ({
  slideover: B24Slideover,
  modal: B24Modal,
  drawer: B24Drawer
})[props.mode as SidebarMode])

/**
 * @memo We move b24ui.overlay && b24ui.content from <template> in menuProps
 */
const menuProps = toRef(() => {
  const modeSettings: any = props.mode === 'modal'
    ? { fullscreen: true, transition: false }
    : props.mode === 'slideover'
      ? { side: props.side, inset: props.variant === 'inset', close: false }
      : {}

  // @memo fix componentMeta
  if (props.mode === 'modal') {
    modeSettings['b24ui'] = { content: 'p-0 pt-0' }
  }

  const result = defu(
    props.menu,
    {
      title: props.title,
      description: props.description,
      close: props.close,
      closeIcon: props.closeIcon
    },
    modeSettings
  ) as SidebarMenu<T>

  // @memo fix componentMeta
  result['b24ui'] = {
    overlay: b24ui.value.overlay({ class: props.b24ui?.overlay }),
    content: b24ui.value.content({
      class: [modeSettings?.b24ui?.content, props.b24ui?.content]
    })
  }
  return result
})
</script>

<template>
  <DefineContentTemplate>
    <div v-if="hasHeader" data-slot="header" :class="b24ui.header({ class: props.b24ui?.header })">
      <slot name="header" :state="state" :open="open" :close="closeSidebar">
        <div v-if="props.title || !!slots.title || props.description || !!slots.description" data-slot="wrapper" :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
          <p v-if="props.title || !!slots.title" data-slot="title" :class="b24ui.title({ class: props.b24ui?.title })">
            <slot name="title" :state="state">
              {{ props.title }}
            </slot>
          </p>

          <p v-if="props.description || !!slots.description" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
            <slot name="description" :state="state">
              {{ props.description }}
            </slot>
          </p>
        </div>

        <div v-if="!!slots.actions || canClose" data-slot="actions" :class="b24ui.actions({ class: props.b24ui?.actions })">
          <slot name="actions" :state="state" />

          <slot name="close" :state="state" :b24ui="b24ui">
            <B24Button
              v-if="canClose"
              :icon="props.closeIcon || icons.close"
              size="md"
              color="air-tertiary-no-accent"
              :aria-label="t('sidebar.close')"
              v-bind="(typeof props.close === 'object' ? props.close : {})"
              data-slot="close"
              :class="b24ui.close({ class: props.b24ui?.close })"
              @click="closeSidebar"
            />
          </slot>
        </div>
      </slot>
    </div>

    <div data-slot="body" :class="b24ui.body({ class: props.b24ui?.body })">
      <slot :state="state" :open="open" :close="closeSidebar" />
    </div>

    <div v-if="!!slots.footer" data-slot="footer" :class="b24ui.footer({ class: props.b24ui?.footer })">
      <slot name="footer" :state="state" :open="open" :close="closeSidebar" />
    </div>
  </DefineContentTemplate>

  <DefineInnerTemplate>
    <div data-slot="inner" :class="b24ui.inner({ class: props.b24ui?.inner })">
      <ReuseContentTemplate />
    </div>
  </DefineInnerTemplate>

  <!-- Non-collapsible: simple inline sidebar -->
  <Primitive
    v-if="props.collapsible === 'none'"
    :as="props.as"
    v-bind="$attrs"
    data-slot="root"
    :data-variant="props.variant"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
  >
    <ReuseInnerTemplate />
  </Primitive>

  <!-- Collapsible: fixed sidebar with gap spacer + mobile menu -->
  <template v-else>
    <Primitive
      :as="props.as"
      v-bind="$attrs"
      data-slot="root"
      :data-state="state"
      :data-collapsible="state === 'collapsed' ? props.collapsible : undefined"
      :data-variant="props.variant"
      :data-side="props.side"
      :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
    >
      <!-- Gap spacer: reserves layout space for the fixed sidebar -->
      <div
        data-slot="gap"
        :data-state="state"
        :class="b24ui.gap({ class: props.b24ui?.gap })"
      />

      <!-- Fixed container: the actual visible sidebar -->
      <div
        data-slot="container"
        :data-state="state"
        :class="b24ui.container({ class: props.b24ui?.container })"
      >
        <ReuseInnerTemplate />

        <slot v-if="props.rail" name="rail" :state="state" :b24ui="b24ui">
          <button
            data-slot="rail"
            :data-state="state"
            :aria-label="t('sidebar.toggle')"
            :tabindex="-1"
            :class="b24ui.rail({ class: props.b24ui?.rail })"
            @click="open = !open"
          />
        </slot>
      </div>
    </Primitive>

    <!-- Mobile menu -->
    <Menu
      v-if="isMobile"
      v-model:open="openMobile"
      v-bind="menuProps"
    >
      <template #content="contentData">
        <slot name="content" v-bind="contentData" :close="closeSidebar">
          <ReuseContentTemplate />
        </slot>
      </template>
    </Menu>
  </template>
</template>
