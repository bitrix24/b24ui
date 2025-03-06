<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/em'
import { tv } from '../utils/tv'

const appConfigPproseEm = _appConfig as AppConfig & { b24ui: { prose: { em: Partial<typeof theme> } } }

const pproseEm = tv({ extend: tv(theme), ...(appConfigPproseEm.b24ui?.prose?.em || {}) })

export interface pproseEmProps {
  class?: any
  b24ui?: Partial<typeof pproseEm.slots>
}

export interface pproseEmSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<pproseEmProps>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = pproseEm({})
</script>

<template>
  <em
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </em>
</template>
