<script lang="ts">
import type { DialogRootProps, DialogRootEmits, DialogContentProps, DialogContentEmits } from 'reka-ui'
import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/modal'
import { tv } from '../utils/tv'
import type { ButtonProps, IconComponent } from '../types'
import type { EmitsToProps } from '../types/utils'

const appConfigModal = _appConfig as AppConfig & { b24ui: { modal: Partial<typeof theme> } }

const modal = tv({ extend: tv(theme), ...(appConfigModal.b24ui?.modal || {}) })

type ModalVariants = VariantProps<typeof modal>

export interface ModalProps extends DialogRootProps {
  title?: string
  description?: string
  /**
   * The content of the modal
   */
  content?: Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DialogContentEmits>>
  /**
   * Render an overlay behind the modal.
   * @defaultValue true
   */
  overlay?: boolean
  /**
   * Render an overlay blur behind the modal.
   * `auto` use `motion-safe`.
   * @defaultValue 'auto'
   */
  overlayBlur?: ModalVariants['overlayBlur']
  /**
   * Animate the modal when opening or closing.
   * @defaultValue true
   */
  transition?: boolean
  /**
   * When `true`, the modal will take up the full screen.
   * @defaultValue false
   */
  fullscreen?: boolean
  /**
   * Render the modal in a portal.
   * @defaultValue true
   */
  portal?: boolean
  /**
   * Display a close button to dismiss the modal.
   * `{ size: 'xs', color: 'link' }`{lang="ts"}
   * @defaultValue true
   */
  close?: boolean | Partial<ButtonProps>
  /**
   * The icon displayed in the close button.
   * @defaultValue icons.close
   * @IconComponent
   */
  closeIcon?: IconComponent
  /**
   * When `false`, the modal will not close when clicking outside or pressing escape.
   * @defaultValue false
   */
  dismissible?: boolean
  /**
   * @defaultValue true
   */
  scrollbarThin?: boolean
  class?: any
  b24ui?: Partial<typeof modal.slots>
}

export interface ModalEmits extends DialogRootEmits {
  'after:leave': []
}

export interface ModalSlots {
  default(props: { open: boolean }): any
  content(props?: {}): any
  header(props?: {}): any
  title(props?: {}): any
  description(props?: {}): any
  close(props: { b24ui: ReturnType<typeof modal> }): any
  body(props?: {}): any
  footer(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import { DialogRoot, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose, VisuallyHidden, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useLocale } from '../composables/useLocale'
import icons from '../dictionary/icons'
import B24Button from './Button.vue'

const props = withDefaults(defineProps<ModalProps>(), {
  close: true,
  portal: true,
  overlay: true,
  transition: true,
  modal: true,
  dismissible: true,
  scrollbarThin: true,
  overlayBlur: 'auto'
})
const emits = defineEmits<ModalEmits>()
const slots = defineSlots<ModalSlots>()

const { t } = useLocale()

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

const b24ui = computed(() => modal({
  transition: props.transition,
  fullscreen: props.fullscreen,
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

      <DialogContent :class="b24ui.content({ class: [!slots.default && props.class, props.b24ui?.content] })" v-bind="contentProps" @after-leave="emits('after:leave')" v-on="contentEvents">
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
                    size="xs"
                    color="link"
                    :aria-label="t('modal.close')"
                    v-bind="(typeof close === 'object' ? close as Partial<ButtonProps> : {})"
                    :class="b24ui.close({ class: props.b24ui?.close })"
                  />
                </slot>
              </DialogClose>
            </slot>
          </div>

          <div v-if="!!slots.body" :class="b24ui.body({ class: props.b24ui?.body, scrollbarThin: Boolean(props.scrollbarThin) })">
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
