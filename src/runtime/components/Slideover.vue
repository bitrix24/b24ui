<script lang="ts">
import type { DialogRootProps, DialogRootEmits, DialogContentProps, DialogContentEmits } from 'reka-ui'
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
  /**
   * The content is placed on a light background.
   * @defaultValue 'true'
   */
  useLightContent?: boolean
  class?: any
  b24ui?: Slideover['slots']
}

export interface SlideoverEmits extends DialogRootEmits {
  'after:leave': []
  'after:enter': []
  'close:prevent': []
}

export interface SlideoverSlots {
  default(props: { open: boolean }): any
  content(props: { close: () => void }): any
  sidebar(props: { close: () => void }): any
  navbar(props: { close: () => void }): any
  header(props: { close: () => void }): any
  title(props?: {}): any
  description(props?: {}): any
  actions(props?: {}): any
  close(props: { b24ui: Slideover['b24ui'] }): any
  body(props: { close: () => void }): any
  footer(props: { close: () => void }): any
}
</script>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import { DialogRoot, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose, VisuallyHidden, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { usePortal } from '../composables/usePortal'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Button from './Button.vue'
import B24SidebarLayout from './SidebarLayout.vue'

const props = withDefaults(defineProps<SlideoverProps>(), {
  close: true,
  portal: true,
  overlay: true,
  transition: true,
  modal: true,
  dismissible: true,
  side: 'bottom',
  overlayBlur: 'off',
  useLightContent: true
})
const emits = defineEmits<SlideoverEmits>()
const slots = defineSlots<SlideoverSlots>()

const { t } = useLocale()
const appConfig = useAppConfig() as Slideover['AppConfig']

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

  return {}
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
      <DialogOverlay v-if="overlay" data-slot="overlay" :class="b24ui.overlay({ class: props.b24ui?.overlay })" />

      <DialogContent
        :data-side="side"
        data-slot="content"
        :class="b24ui.content({ class: [!slots.default && props.class, props.b24ui?.content] })"
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

        <slot name="content" :close="close">
          <template v-if="isBtnCloseExternal">
            <DialogClose v-if="props.close || !!slots.close" as-child>
              <slot name="close" :b24ui="b24ui">
                <!-- @todo fix this css -->
                <B24Button
                  v-if="props.close"
                  :icon="closeIcon || icons.close"
                  class="group"
                  color="air-primary"
                  :aria-label="t('slideover.close')"
                  size="lg"
                  :b24ui="{
                    baseLine: 'ps-[4px] pe-[4px]',
                    label: 'hidden sm:flex'
                  }"
                  v-bind="(typeof props.close === 'object' ? props.close : {})"
                  data-slot="close"
                  :class="b24ui.close({ class: props.b24ui?.close })"
                />
              </slot>
            </DialogClose>
          </template>
          <B24SidebarLayout
            :use-light-content="props.useLightContent"
            is-inner
            :b24ui="{
              root: b24ui.sidebarLayoutRoot({ class: props.b24ui?.sidebarLayoutRoot }),
              header: b24ui.sidebarLayoutHeaderWrapper({ class: props.b24ui?.sidebarLayoutHeaderWrapper }),
              pageWrapper: b24ui.sidebarLayoutPageWrapper({ class: props.b24ui?.sidebarLayoutPageWrapper }),
              container: b24ui.sidebarLayoutContainer({ class: props.b24ui?.sidebarLayoutContainer }),
              pageBottomWrapper: b24ui.sidebarLayoutPageBottomWrapper({ class: props.b24ui?.sidebarLayoutPageBottomWrapper }),
              loadingWrapper: b24ui.sidebarLayoutLoadingWrapper({ class: props.b24ui?.sidebarLayoutLoadingWrapper }),
              loadingIcon: b24ui.sidebarLayoutLoadingIcon({ class: props.b24ui?.sidebarLayoutLoadingIcon })
            }"
          >
            <template v-if="!!slots['sidebar']" #sidebar>
              <slot name="sidebar" :close="close" />
            </template>

            <template v-if="!!slots['navbar']" #navbar>
              <slot name="navbar" :close="close" />
            </template>

            <template v-if="!!slots.header || (title || !!slots.title) || (description || !!slots.description) || (!isBtnCloseExternal && (props.close || !!slots.close))" #content-top>
              <div data-slot="header" :class="b24ui.header({ class: props.b24ui?.header })">
                <slot name="header" :close="close">
                  <div data-slot="wrapper" :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
                    <DialogTitle v-if="title || !!slots.title" data-slot="title" :class="b24ui.title({ class: props.b24ui?.title })">
                      <slot name="title">
                        {{ title }}
                      </slot>
                    </DialogTitle>

                    <DialogDescription v-if="description || !!slots.description" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
                      <slot name="description">
                        {{ description }}
                      </slot>
                    </DialogDescription>
                  </div>
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
                          :class="b24ui.close({ class: props.b24ui?.close })"
                        />
                      </slot>
                    </DialogClose>
                  </template>
                </slot>
              </div>
            </template>

            <template v-if="!!slots['actions']" #content-actions>
              <slot name="actions" />
            </template>

            <template v-if="!!slots['body']" #default>
              <div data-slot="body" :class="b24ui.body({ class: props.b24ui?.body })">
                <slot name="body" :close="close" />
              </div>
            </template>

            <template v-if="!!slots.footer" #content-bottom>
              <div data-slot="footer" :class="b24ui.footer({ class: props.b24ui?.footer })">
                <slot name="footer" :close="close" />
              </div>
            </template>
          </B24SidebarLayout>
        </slot>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
