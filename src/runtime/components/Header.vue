<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import type { ButtonProps, DrawerProps, ModalProps, SlideoverProps, LinkPropsKeys } from '../types'
import type { ComponentConfig } from '../types/tv'
import theme from '#build/b24ui/header'

type Header = ComponentConfig<typeof theme, AppConfig, 'header'>

type HeaderMode = 'modal' | 'slideover' | 'drawer'
type HeaderMenu<T> = T extends 'modal' ? ModalProps : T extends 'slideover' ? SlideoverProps : T extends 'drawer' ? DrawerProps : never

export interface HeaderProps<T extends HeaderMode = HeaderMode> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'header'
   */
  as?: any
  title?: string
  to?: string
  /**
   * The mode of the header menu.
   * @defaultValue 'slideover'
   */
  mode?: T
  /**
   * The props for the header menu component.
   */
  menu?: HeaderMenu<T>
  /**
   * Customize the toggle button to open the header menu displayed when the `content` slot is used.
   * `{ color: 'air-tertiary', size: 'md' }`{lang="ts-type"}
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
  b24ui?: Header['slots']
}

export interface HeaderSlots {
  title?(props?: {}): VNode[]
  left?(props?: {}): VNode[]
  default?(props?: {}): VNode[]
  right?(props?: {}): VNode[]
  toggle?(props: { open: boolean, toggle: () => void, b24ui: Header['b24ui'] }): VNode[]
  top?(props?: {}): VNode[]
  bottom?(props?: {}): VNode[]
  body?(props?: {}): VNode[]
  content?(props: { close?: () => void }): VNode[]
}
</script>

<script setup lang="ts" generic="T extends HeaderMode">
import { computed, watch, toRef } from 'vue'
import { Primitive } from 'reka-ui'
import { defu } from 'defu'
import { createReusableTemplate } from '@vueuse/core'
import { useAppConfig, useRoute } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useLocale } from '../composables/useLocale'
import { getSlotChildrenText } from '../utils'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Button from './Button.vue'
import B24Link from './Link.vue'
import B24Container from './Container.vue'
import B24Slideover from './Slideover.vue'
import B24Modal from './Modal.vue'
import B24Drawer from './Drawer.vue'

defineOptions({ inheritAttrs: false })

const _props = withDefaults(defineProps<HeaderProps<T>>(), {
  as: 'header',
  mode: 'slideover' as never,
  autoClose: true,
  toggle: true,
  toggleSide: 'left',
  to: '/',
  title: 'Bitrix24 UI'
})
const slots = defineSlots<HeaderSlots>()

const props = useComponentProps<HeaderProps<T>>('header', _props)

const open = defineModel<boolean>('open', { default: false })

const route = useRoute()
const { t } = useLocale()
const appConfig = useAppConfig() as Header['AppConfig']

const [DefineLeftTemplate, ReuseLeftTemplate] = createReusableTemplate()
const [DefineRightTemplate, ReuseRightTemplate] = createReusableTemplate()
const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate()

const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title())
  return (slotText || props.title || 'Nuxt UI').trim()
})

watch(() => route.fullPath, () => {
  if (!props.autoClose) return

  open.value = false
})

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.header || {}) })())

const Menu = computed(() => ({
  slideover: B24Slideover,
  modal: B24Modal,
  drawer: B24Drawer
})[props.mode as HeaderMode])

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
  ) as HeaderMenu<T>

  // @memo fix componentMeta
  result['b24ui'] = {
    overlay: b24ui.value.overlay({ class: props.b24ui?.overlay }),
    content: b24ui.value.content({
      class: [modeSettings?.b24ui?.content, props.b24ui?.content]
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
      <B24Button
        v-if="props.toggle"
        color="air-tertiary"
        size="md"
        :aria-label="open ? t('header.close') : t('header.open')"
        :icon="open ? icons.close : icons.menu"
        v-bind="(typeof props.toggle === 'object' ? props.toggle : {})"
        data-slot="toggle"
        :class="b24ui.toggle({ class: props.b24ui?.toggle, toggleSide: props.toggleSide })"
        @click="toggleOpen"
      />
    </slot>
  </DefineToggleTemplate>

  <DefineLeftTemplate>
    <div data-slot="left" :class="b24ui.left({ class: props.b24ui?.left })">
      <ReuseToggleTemplate v-if="props.toggleSide === 'left'" />

      <slot name="left">
        <B24Link :to="props.to" :aria-label="ariaLabel" data-slot="title" :class="b24ui.title({ class: props.b24ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </B24Link>
      </slot>
    </div>
  </DefineLeftTemplate>

  <DefineRightTemplate>
    <div data-slot="right" :class="b24ui.right({ class: props.b24ui?.right })">
      <slot name="right" />

      <ReuseToggleTemplate v-if="props.toggleSide === 'right'" />
    </div>
  </DefineRightTemplate>

  <Primitive :as="props.as" v-bind="$attrs" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <slot name="top" />

    <B24Container data-slot="container" :class="b24ui.container({ class: props.b24ui?.container })">
      <ReuseLeftTemplate />

      <div data-slot="center" :class="b24ui.center({ class: props.b24ui?.center })">
        <slot />
      </div>

      <ReuseRightTemplate />
    </B24Container>

    <slot name="bottom" />
  </Primitive>

  <Menu
    v-model:open="open"
    :title="t('header.title')"
    :description="t('header.description')"
    v-bind="menuProps"
  >
    <template #content="contentData">
      <slot name="content" v-bind="contentData">
        <div v-if="props.mode !== 'drawer'" data-slot="header" :class="b24ui.header({ class: props.b24ui?.header })">
          <ReuseLeftTemplate />

          <ReuseRightTemplate />
        </div>

        <div data-slot="body" :class="b24ui.body({ class: props.b24ui?.body })">
          <slot name="body" />
        </div>
      </slot>
    </template>
  </Menu>
</template>
