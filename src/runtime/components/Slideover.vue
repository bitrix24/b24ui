<script lang="ts">
import type { DialogRootProps, DialogRootEmits, DialogContentProps, DialogContentEmits } from 'reka-ui'
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/slideover'
import type { ButtonProps, IconComponent, LinkPropsKeys } from '../types'
import type { EmitsToProps } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type Slideover = ComponentConfig<typeof theme, AppConfig, 'slideover'>

export interface SlideoverProps extends DialogRootProps {
  title?: string
  description?: string
  /** The content of the slideover. */
  content?: Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DialogContentEmits>>
  /**
   * Render an overlay behind the slideover.
   * @defaultValue true
   */
  overlay?: boolean
  /**
   * Render an overlay blur behind the slideover.
   * `auto` use `motion-safe`.
   * @defaultValue 'off'
   */
  overlayBlur?: Slideover['variants']['overlayBlur']
  /**
   * Animate the slideover when opening or closing.
   * @defaultValue true
   */
  transition?: boolean
  /**
   * The side of the slideover.
   * @defaultValue 'bottom'
   */
  side?: Slideover['variants']['side']
  /**
   * Whether to inset the slideover from the edges.
   * @defaultValue false
   */
  inset?: boolean
  /**
   * Render the slideover in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement
  /**
   * Display a close button to dismiss the slideover.
   * `{ color: 'air-primary' }`{lang="ts"} for `left`, `right`, `bottom`
   * `{ color: 'air-tertiary' }`{lang="ts"} for `top`
   * @defaultValue true
   */
  close?: boolean | Omit<ButtonProps, LinkPropsKeys>
  /**
   * The icon displayed in the close button.
   * @defaultValue icons.close
   * @IconComponent
   */
  closeIcon?: IconComponent
  /**
   * When `false`, the slideover will not close when clicking outside or pressing escape.
   * @defaultValue false
   */
  dismissible?: boolean
  class?: any
  b24ui?: Slideover['slots']
}

export interface SlideoverEmits extends DialogRootEmits {
  'after:leave': []
  'after:enter': []
  'close:prevent': []
}

export interface SlideoverSlots {
  default?(props: { open: boolean }): VNode[]
  content?(props: { close: () => void }): VNode[]
  header?(props: { close: () => void }): VNode[]
  title?(props?: {}): VNode[]
  description?(props?: {}): VNode[]
  actions?(props?: {}): VNode[]
  close?(props: { b24ui: Slideover['b24ui'] }): VNode[]
  body?(props: { close: () => void }): VNode[]
  footer?(props: { close: () => void }): VNode[]
}
</script>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import { DialogRoot, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose, VisuallyHidden, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { useLocale } from '../composables/useLocale'
import { usePortal } from '../composables/usePortal'
import { pointerDownOutside } from '../utils/overlay'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Button from './Button.vue'

const props = withDefaults(defineProps<SlideoverProps>(), {
  close: true,
  portal: true,
  overlay: true,
  transition: true,
  modal: true,
  dismissible: true,
  side: 'bottom',
  overlayBlur: 'off'
})
const emits = defineEmits<SlideoverEmits>()
const slots = defineSlots<SlideoverSlots>()

const { t } = useLocale()
const appConfig = useAppConfig() as Slideover['AppConfig']
const uiProp = useComponentUI('slideover', props)

const rootProps = useForwardPropsEmits(reactivePick(props, 'open', 'defaultOpen', 'modal'), emits)
const portalProps = usePortal(toRef(() => props.portal))
const contentProps = toRef(() => props.content)
const contentEvents = computed(() => {
  if (!props.dismissible) {
    const events = ['pointerDownOutside', 'interactOutside', 'escapeKeyDown']

    return events.reduce((acc, curr) => {
      acc[curr] = (e: Event) => {
        e.preventDefault()
        emits('close:prevent')
      }
      return acc
    }, {} as Record<typeof events[number], (e: Event) => void>)
  }

  return {
    pointerDownOutside
  }
})

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.slideover || {}) })({
  transition: props.transition,
  side: props.side,
  inset: props.inset,
  overlayBlur: props.overlayBlur,
  useFooter: !!slots.footer
}))

const isBtnCloseExternal = computed(() => (!props.inset && ['left', 'right', 'bottom'].includes(props?.side) && (props.close || !!slots.close)))
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <DialogRoot v-slot="{ open, close }" v-bind="rootProps">
    <DialogTrigger v-if="!!slots.default" as-child :class="props.class">
      <slot :open="open" />
    </DialogTrigger>

    <DialogPortal v-bind="portalProps">
      <DialogOverlay v-if="overlay" data-slot="overlay" :class="b24ui.overlay({ class: uiProp?.overlay })" />

      <DialogContent
        :data-side="side"
        data-slot="content"
        :class="b24ui.content({ class: [!slots.default && props.class, uiProp?.content] })"
        v-bind="contentProps"
        @after-enter="emits('after:enter')"
        @after-leave="emits('after:leave')"
        v-on="contentEvents"
      >
        <VisuallyHidden
          v-if="
            !!slots.content && ((title || !!slots.title) || (description || !!slots.description))
              || (!slots.content && !!slots.header && (!slots.title || !slots.description))
          "
        >
          <DialogTitle v-if="title || !!slots.title">
            <slot name="title">
              {{ title }}
            </slot>
          </DialogTitle>

          <DialogDescription v-if="description || !!slots.description">
            <slot name="description">
              {{ description }}
            </slot>
          </DialogDescription>
        </VisuallyHidden>

        <template v-if="isBtnCloseExternal && (props.close || !!slots.close)">
          <DialogClose as-child>
            <slot name="close" :b24ui="b24ui">
              <B24Button
                v-if="props.close"
                :icon="closeIcon || icons.close"
                class="group"
                color="air-primary"
                :aria-label="t('slideover.close')"
                size="lg"
                :b24ui="{
                  baseLine: 'ps-1 pe-1',
                  label: 'hidden sm:flex'
                }"
                v-bind="(typeof props.close === 'object' ? props.close : {})"
                data-slot="close"
                :class="b24ui.close({ class: uiProp?.close })"
              />
            </slot>
          </DialogClose>
        </template>

        <slot name="content" :close="close">
          <div
            v-if="!!slots.header || (title || !!slots.title) || (description || !!slots.description) || (!isBtnCloseExternal && (props.close || !!slots.close))"
            data-slot="header"
            :class="b24ui.header({ class: uiProp?.header })"
          >
            <slot name="header" :close="close">
              <div data-slot="wrapper" :class="b24ui.wrapper({ class: uiProp?.wrapper })">
                <DialogTitle v-if="title || !!slots.title" data-slot="title" :class="b24ui.title({ class: uiProp?.title })">
                  <slot name="title">
                    {{ title }}
                  </slot>
                </DialogTitle>

                <DialogDescription v-if="description || !!slots.description" data-slot="description" :class="b24ui.description({ class: uiProp?.description })">
                  <slot name="description">
                    {{ description }}
                  </slot>
                </DialogDescription>
              </div>

              <slot name="actions" />

              <template v-if="!isBtnCloseExternal && (props.close || !!slots.close)">
                <DialogClose v-if="props.close || !!slots.close" as-child>
                  <slot name="close" :b24ui="b24ui">
                    <B24Button
                      v-if="props.close"
                      :icon="closeIcon || icons.close"
                      class="group"
                      color="air-tertiary-no-accent"
                      :aria-label="t('slideover.close')"
                      size="lg"
                      v-bind="(typeof props.close === 'object' ? props.close : {})"
                      data-slot="close"
                      :class="b24ui.close({ class: uiProp?.close })"
                    />
                  </slot>
                </DialogClose>
              </template>
            </slot>
          </div>

          <template v-if="!!slots['body']">
            <div data-slot="body" :class="b24ui.body({ class: uiProp?.body })">
              <slot name="body" :close="close" />
            </div>
          </template>

          <div v-if="!!slots.footer" data-slot="footer" :class="b24ui.footer({ class: uiProp?.footer })">
            <slot name="footer" :close="close" />
          </div>
        </slot>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
