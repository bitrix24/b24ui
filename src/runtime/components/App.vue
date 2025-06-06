<script lang="ts">
import type { ConfigProviderProps, TooltipProviderProps } from 'reka-ui'
import type { ToasterProps, Locale, Messages } from '../types'

export interface AppProps<T extends Messages = Messages> extends Omit<ConfigProviderProps, 'useId' | 'dir' | 'locale'> {
  tooltip?: TooltipProviderProps
  toaster?: ToasterProps | null
  locale?: Locale<T>
  portal?: string | HTMLElement
}

export interface AppSlots {
  default(props?: {}): any
}

export default {
  name: 'App'
}
</script>

<script setup lang="ts" generic="T extends Messages">
import { toRef, useId, provide } from 'vue'
import { ConfigProvider, TooltipProvider, useForwardProps } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { localeContextInjectionKey } from '../composables/useLocale'
import { portalTargetInjectionKey } from '../composables/usePortal'
import B24Toaster from './Toaster.vue'
import B24OverlayProvider from './OverlayProvider.vue'

const props = withDefaults(defineProps<AppProps<T>>(), {
  portal: 'body'
})

defineSlots<AppSlots>()

const configProviderProps = useForwardProps(reactivePick(props, 'scrollBody'))
const tooltipProps = toRef(() => props.tooltip)
const toasterProps = toRef(() => props.toaster)

const locale = toRef(() => props.locale)
provide(localeContextInjectionKey, locale)

const portal = toRef(() => props.portal)
provide(portalTargetInjectionKey, portal)
</script>

<template>
  <ConfigProvider :use-id="() => (useId() as string)" :dir="locale?.dir" :locale="locale?.code" v-bind="configProviderProps">
    <TooltipProvider v-bind="tooltipProps">
      <B24Toaster v-if="toaster !== null" v-bind="toasterProps">
        <slot />
      </B24Toaster>
      <slot v-else />

      <B24OverlayProvider />
    </TooltipProvider>
  </ConfigProvider>
</template>
