<script lang="ts">
import type { VNode } from 'vue'
import type { DrawerRootProps, DrawerRootEmits } from 'vaul-vue'
import type { DialogContentProps, DialogContentEmits } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/drawer'
import type { EmitsToProps } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type Drawer = ComponentConfig<typeof theme, AppConfig, 'drawer'>

export interface DrawerProps extends Pick<DrawerRootProps, 'activeSnapPoint' | 'closeThreshold' | 'shouldScaleBackground' | 'setBackgroundColorOnScale' | 'scrollLockTimeout' | 'fixed' | 'dismissible' | 'modal' | 'open' | 'defaultOpen' | 'nested' | 'direction' | 'noBodyStyles' | 'handleOnly' | 'preventScrollRestoration' | 'snapPoints'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  title?: string
  description?: string
  /**
   * Whether to inset the drawer from the edges.
   * @defaultValue false
   */
  inset?: boolean
  /** The content of the drawer. */
  content?: Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DialogContentEmits>>
  /**
   * Render an overlay behind the drawer.
   * @defaultValue true
   */
  overlay?: boolean
  /**
   * Render an overlay blur behind the modal.
   * `auto` use `motion-safe`.
   * @defaultValue 'auto'
   */
  overlayBlur?: Drawer['variants']['overlayBlur']
  /**
   * Render a handle on the drawer.
   * @defaultValue true
   */
  handle?: boolean
  /**
   * Render the drawer in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement
  /**
   * Whether the drawer is nested in another drawer.
   * @defaultValue false
   */
  nested?: boolean
  /**
   * @defaultValue true
   */
  scrollbarThin?: boolean
  class?: any
  b24ui?: Drawer['slots']
}

export interface DrawerEmits extends DrawerRootEmits {
  (e: 'close:prevent'): void
}

export interface DrawerSlots {
  default?(props?: {}): VNode[]
  content?(props?: {}): VNode[]
  header?(props?: {}): VNode[]
  title?(props?: {}): VNode[]
  description?(props?: {}): VNode[]
  body?(props?: {}): VNode[]
  footer?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import { VisuallyHidden } from 'reka-ui'
import { DrawerRoot, DrawerRootNested, DrawerTrigger, DrawerPortal, DrawerOverlay, DrawerContent, DrawerTitle, DrawerDescription, DrawerHandle } from 'vaul-vue'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useForwardProps } from '../composables/useForwardProps'
import { useBlurOnOpen } from '../composables/useBlurOnOpen'
import { FieldGroupReset } from '../composables/useFieldGroup'
import { usePortal } from '../composables/usePortal'
import { pointerDownOutside } from '../utils/overlay'
import { tv } from '../utils/tv'

const _props = withDefaults(defineProps<DrawerProps>(), {
  direction: 'bottom',
  portal: true,
  overlay: true,
  handle: true,
  modal: true,
  dismissible: true,
  scrollbarThin: true,
  overlayBlur: 'auto'
})
const emits = defineEmits<DrawerEmits>()
const slots = defineSlots<DrawerSlots>()

const props = useComponentProps('drawer', _props)

const appConfig = useAppConfig() as Drawer['AppConfig']

const rootProps = useForwardProps(reactivePick(props, 'activeSnapPoint', 'closeThreshold', 'shouldScaleBackground', 'setBackgroundColorOnScale', 'scrollLockTimeout', 'fixed', 'dismissible', 'modal', 'open', 'defaultOpen', 'nested', 'direction', 'noBodyStyles', 'handleOnly', 'preventScrollRestoration', 'snapPoints'), useBlurOnOpen(() => props.open, emits))
const portalProps = usePortal(toRef(() => props.portal))
const contentProps = toRef(() => props.content)
const contentEvents = computed(() => {
  if (!props.dismissible) {
    const events = ['interactOutside', 'escapeKeyDown']

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

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.drawer || {}) })({
  direction: props.direction,
  inset: props.inset,
  snapPoints: props.snapPoints && props.snapPoints.length > 0,
  overlayBlur: props.overlayBlur,
  overlay: props.overlay,
  scrollbarThin: props.scrollbarThin
}))
</script>

<template>
  <component :is="props.nested ? DrawerRootNested : DrawerRoot" v-bind="rootProps">
    <DrawerTrigger v-if="!!slots.default" as-child :class="props.class">
      <slot />
    </DrawerTrigger>

    <DrawerPortal v-bind="portalProps">
      <FieldGroupReset>
        <DrawerOverlay v-if="props.overlay" data-slot="overlay" :class="b24ui.overlay({ class: props.b24ui?.overlay })" />

        <DrawerContent data-slot="content" :class="b24ui.content({ class: [!slots.default && props.class, props.b24ui?.content] })" v-bind="contentProps" v-on="contentEvents">
          <DrawerHandle v-if="props.handle" data-slot="handle" :class="b24ui.handle({ class: props.b24ui?.handle })" />

          <VisuallyHidden v-if="(!props.title && !slots.title) || (!props.description && !slots.description) || !!slots.content">
            <DrawerTitle v-if="!props.title && !slots.title" />
            <DrawerTitle v-else-if="!!slots.content">
              <slot name="title">
                {{ props.title }}
              </slot>
            </DrawerTitle>

            <DrawerDescription v-if="!props.description && !slots.description" />
            <DrawerDescription v-else-if="!!slots.content">
              <slot name="description">
                {{ props.description }}
              </slot>
            </DrawerDescription>
          </VisuallyHidden>

          <slot name="content">
            <div data-slot="container" :class="b24ui.container({ class: props.b24ui?.container })">
              <div v-if="!!slots.header || (props.title || !!slots.title) || (props.description || !!slots.description)" data-slot="header" :class="b24ui.header({ class: props.b24ui?.header })">
                <slot name="header">
                  <DrawerTitle v-if="!props.title && !slots.title" />
                  <DrawerTitle v-else data-slot="title" :class="b24ui.title({ class: props.b24ui?.title })">
                    <slot name="title">
                      {{ props.title }}
                    </slot>
                  </DrawerTitle>

                  <DrawerDescription v-if="!props.description && !slots.description" />
                  <DrawerDescription v-else data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
                    <slot name="description">
                      {{ props.description }}
                    </slot>
                  </DrawerDescription>
                </slot>
              </div>

              <div v-if="!!slots.body" data-slot="body" :class="b24ui.body({ class: props.b24ui?.body })">
                <slot name="body" />
              </div>

              <div v-if="!!slots.footer" data-slot="footer" :class="b24ui.footer({ class: props.b24ui?.footer })">
                <slot name="footer" />
              </div>
            </div>
          </slot>
        </DrawerContent>
      </FieldGroupReset>
    </DrawerPortal>
  </component>
</template>
