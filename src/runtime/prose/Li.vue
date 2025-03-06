<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/li'
import { tv } from '../utils/tv'

const appConfigProseLi = _appConfig as AppConfig & { b24ui: { prose: { li: Partial<typeof theme> } } }

const proseLi = tv({ extend: tv(theme), ...(appConfigProseLi.b24ui?.prose?.li || {}) })

export interface proseLiProps {
  class?: any
  b24ui?: Partial<typeof proseLi.slots>
}

export interface proseLiSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<proseLiProps>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseLi({})
</script>

<template>
  <li
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </li>
</template>
