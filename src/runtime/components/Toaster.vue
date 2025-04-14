<script lang="ts">
import type { ToastProviderProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/toaster'
import type { ComponentConfig } from '../types/utils'

type Toaster = ComponentConfig<typeof theme, AppConfig, 'toaster'>

export interface ToasterProps extends Omit<ToastProviderProps, 'swipeDirection'> {
  /**
   * The position on the screen to display the toasts.
   * @defaultValue 'top-right'
   */
  position?: Toaster['variants']['position']
  /**
   * Expand the toasts to show multiple toasts at once.
   * @defaultValue true
   */
  expand?: boolean
  /**
   * Render the toaster in a portal.
   * @defaultValue true
   */
  portal?: boolean
  /**
   * @defaultValue 5000
   */
  duration?: number
  class?: any
  b24ui?: Toaster['slots']
}

export interface ToasterSlots {
  default(props?: {}): any
}

export default {
  name: 'Toaster'
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ToastProvider, ToastViewport, ToastPortal, useForwardProps } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useToast } from '../composables/useToast'
import type { Toast } from '../composables/useToast'
import { omit } from '../utils'
import { tv } from '../utils/tv'
import B24Toast from './Toast.vue'

const props = withDefaults(defineProps<ToasterProps>(), {
  position: 'top-right' as const,
  expand: true,
  duration: 5000,
  portal: true
})
defineSlots<ToasterSlots>()

const { toasts, remove } = useToast()
const appConfig = useAppConfig() as Toaster['AppConfig']

const providerProps = useForwardProps(reactivePick(props, 'duration', 'label', 'swipeThreshold'))

const proxyToastProps = (toast: Toast) => {
  return omit(toast, ['id', 'close'])
}

const swipeDirection = computed(() => {
  switch (props.position) {
    case 'top-center':
      return 'up'
    case 'top-right':
    case 'bottom-right':
      return 'right'
    case 'bottom-center':
      return 'down'
    case 'top-left':
    case 'bottom-left':
      return 'left'
  }
  return 'right'
})

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.toaster || {}) })({
  position: props.position,
  swipeDirection: swipeDirection.value
}))

function onUpdateOpen(value: boolean, id: string | number) {
  if (value) {
    return
  }

  remove(id)
}

const hovered = ref(false)
const expanded = computed(() => props.expand || hovered.value)

const refs = ref<{ height: number }[]>([])

const height = computed(() => refs.value.reduce((acc, { height }) => acc + height + 16, 0))
const frontHeight = computed(() => refs.value[refs.value.length - 1]?.height || 0)

function getOffset(index: number) {
  return refs.value.slice(index + 1).reduce((acc, { height }) => acc + height + 16, 0)
}
</script>

<template>
  <ToastProvider :swipe-direction="swipeDirection" v-bind="providerProps">
    <slot />

    <B24Toast
      v-for="(toast, index) in toasts"
      :key="toast.id"
      ref="refs"
      v-bind="proxyToastProps(toast)"
      :close="(toast.close as boolean)"
      :data-expanded="expanded"
      :data-front="!expanded && index === toasts.length - 1"
      :style="{
        '--index': (index - toasts.length) + toasts.length,
        '--before': toasts.length - 1 - index,
        '--offset': getOffset(index),
        '--scale': expanded ? '1' : 'calc(1 - var(--before) * var(--scale-factor))',
        '--translate': expanded ? 'calc(var(--offset) * var(--translate-factor))' : 'calc(var(--before) * var(--gap))',
        '--transform': 'translateY(var(--translate)) scale(var(--scale))'
      }"
      :class="[b24ui.base(), {
        'cursor-pointer': !!toast.onClick
      }]"
      @update:open="onUpdateOpen($event, toast.id)"
      @click="toast.onClick && toast.onClick(toast)"
    />

    <ToastPortal :disabled="!portal">
      <ToastViewport
        :data-expanded="expanded"
        :class="b24ui.viewport({ class: [props.class, props.b24ui?.viewport] })"
        :style="{
          '--scale-factor': '0.05',
          '--translate-factor': position?.startsWith('top') ? '1px' : '-1px',
          '--gap': position?.startsWith('top') ? '16px' : '-16px',
          '--front-height': `${frontHeight}px`,
          '--height': `${height}px`
        }"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
      />
    </ToastPortal>
  </ToastProvider>
</template>
