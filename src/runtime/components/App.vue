<script lang="ts">
import type { ConfigProviderProps, TooltipProviderProps } from 'reka-ui'
import { localeContextInjectionKey } from '../composables/useLocale'
// import type { ToasterProps, Locale } from '../types'
import type { Locale } from '../types'

export interface AppProps extends Omit<ConfigProviderProps, 'useId' | 'dir' | 'locale'> {
  tooltip?: TooltipProviderProps
  // toaster?: ToasterProps | null
  locale?: Locale
}

export interface AppSlots {
  default(props?: {}): any
}

export default {
  name: 'App'
}

</script>

<script setup lang="ts">
import { toRef, useId, provide } from 'vue'
import { ConfigProvider, TooltipProvider, useForwardProps } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
// import B24Toaster from './Toaster.vue'
// import B24ModalProvider from './ModalProvider.vue'
// import B24SlideoverProvider from './SlideoverProvider.vue'

const props = defineProps<AppProps>()
defineSlots<AppSlots>()

const configProviderProps = useForwardProps(reactivePick(props, 'scrollBody'))
const tooltipProps = toRef(() => props.tooltip)
// const toasterProps = toRef(() => props.toaster)

const locale = toRef(() => props.locale)
provide(localeContextInjectionKey, locale)
</script>

<template>
  <ConfigProvider :use-id="() => (useId() as string)" :dir="locale?.dir" :locale="locale?.code" v-bind="configProviderProps">
    <TooltipProvider v-bind="tooltipProps">
      <!-- B24Toaster v-if="toaster !== null" v-bind="toasterProps">
        <slot />
      </B24Toaster >
      <slot v-else / -->
      <slot />
    </TooltipProvider>

    <!-- B24ModalProvider / -->
    <!-- B24SlideoverProvider / -->
  </ConfigProvider>
</template>
