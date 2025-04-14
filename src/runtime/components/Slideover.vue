<script lang="ts">
import type { DialogRootProps, DialogRootEmits, DialogContentProps, DialogContentEmits } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/slideover'
import type { ButtonProps, IconComponent } from '../types'
import type { EmitsToProps, ComponentConfig } from '../types/utils'

type Slideover = ComponentConfig<typeof theme, AppConfig, 'slideover'>

export interface SlideoverProps extends DialogRootProps {
  title?: string
  description?: string
  /**
   * The content of the slideover
   */
  content?: Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DialogContentEmits>>
  /**
   * Render an overlay behind the slideover.
   * @defaultValue true
   */
  overlay?: boolean
  /**
   * Render an overlay blur behind the slideover.
   * `auto` use `motion-safe`.
   * @defaultValue 'auto'
   */
  overlayBlur?: Slideover['variants']['overlayBlur']
  /**
   * Animate the slideover when opening or closing.
   * @defaultValue true
   */
  transition?: boolean
  /**
   * The side of the slideover.
   * @defaultValue 'right'
   */
  side?: Slideover['variants']['side']
  /**
   * Render the slideover in a portal.
   * @defaultValue true
   */
  portal?: boolean
  /**
   * Display a close button to dismiss the slideover.
   * `{ color: 'primary' }`{lang="ts"} for `left`, `right`
   * `{ color: 'link' }`{lang="ts"} for `top`, `bottom`
   * @defaultValue true
   */
  close?: boolean | Partial<ButtonProps>
  /**
   * The icon displayed in the close button.
   * @defaultValue icons.close
   * @IconifyIcon
   */
  closeIcon?: IconComponent
  /**
   * When `false`, the slideover will not close when clicking outside or pressing escape.
   * @defaultValue false
   */
  dismissible?: boolean
  /**
   * @defaultValue true
   */
  scrollbarThin?: boolean
  class?: any
  b24ui?: Slideover['slots']
}

export interface SlideoverEmits extends DialogRootEmits {
  'after:leave': []
}

export interface SlideoverSlots {
  default(props: { open: boolean }): any
  content(props?: {}): any
  header(props?: {}): any
  title(props?: {}): any
  description(props?: {}): any
  close(props: { b24ui: { [K in keyof Required<Slideover['slots']>]: (props?: Record<string, any>) => string } }): any
  body(props?: {}): any
  footer(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import { DialogRoot, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose, VisuallyHidden, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
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
  side: 'right',
  scrollbarThin: true,
  overlayBlur: 'auto'
})
const emits = defineEmits<SlideoverEmits>()
const slots = defineSlots<SlideoverSlots>()

const { t } = useLocale()
const appConfig = useAppConfig() as Slideover['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'open', 'defaultOpen', 'modal'), emits)
const contentProps = toRef(() => props.content)
const contentEvents = computed(() => {
  const events = {
    closeAutoFocus: (e: Event) => e.preventDefault()
  }

  if (!props.dismissible) {
    return {
      pointerDownOutside: (e: Event) => e.preventDefault(),
      interactOutside: (e: Event) => e.preventDefault(),
      escapeKeyDown: (e: Event) => e.preventDefault(),
      ...events
    }
  }

  return events
})

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.slideover || {}) })({
  transition: props.transition,
  side: props.side,
  overlayBlur: props.overlayBlur
}))
</script>

<template>
  <DialogRoot v-slot="{ open }" v-bind="rootProps">
    <DialogTrigger v-if="!!slots.default" as-child :class="props.class">
      <slot :open="open" />
    </DialogTrigger>

    <DialogPortal :disabled="!portal">
      <DialogOverlay v-if="overlay" :class="b24ui.overlay({ class: props.b24ui?.overlay })" />

      <DialogContent :data-side="side" :class="b24ui.content({ class: [!slots.default && props.class, props.b24ui?.content] })" v-bind="contentProps" @after-leave="emits('after:leave')" v-on="contentEvents">
        <VisuallyHidden v-if="!!slots.content && ((title || !!slots.title) || (description || !!slots.description))">
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

        <slot name="content">
          <div v-if="!!slots.header || (title || !!slots.title) || (description || !!slots.description) || (close || !!slots.close)" :class="b24ui.header({ class: props.b24ui?.header })">
            <slot name="header">
              <div :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
                <DialogTitle v-if="title || !!slots.title" :class="b24ui.title({ class: props.b24ui?.title })">
                  <slot name="title">
                    {{ title }}
                  </slot>
                </DialogTitle>

                <DialogDescription v-if="description || !!slots.description" :class="b24ui.description({ class: props.b24ui?.description })">
                  <slot name="description">
                    {{ description }}
                  </slot>
                </DialogDescription>
              </div>

              <DialogClose v-if="close || !!slots.close" as-child>
                <slot name="close" :b24ui="b24ui">
                  <B24Button
                    v-if="close"
                    :icon="closeIcon || icons.close"
                    size="md"
                    class="group"
                    :color="['left', 'right'].includes(props?.side) ? 'primary' : 'link'"
                    :aria-label="t('slideover.close')"
                    :b24ui="{
                      leadingIcon: ['left', 'right'].includes(props?.side) ? 'group-hover:rounded-full group-hover:border-1 group-hover:border-current' : ''
                    }"
                    v-bind="(typeof close === 'object' ? close as Partial<ButtonProps> : {})"
                    :class="b24ui.close({ class: props.b24ui?.close })"
                  />
                </slot>
              </DialogClose>
            </slot>
          </div>

          <div :class="b24ui.body({ class: props.b24ui?.body, scrollbarThin: Boolean(props.scrollbarThin) })">
            <slot name="body" />
          </div>

          <div v-if="!!slots.footer" :class="b24ui.footer({ class: props.b24ui?.footer })">
            <slot name="footer" />
          </div>
        </slot>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
