<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/tr'
import { tv } from '../utils/tv'

const appConfigProseTr = _appConfig as AppConfig & { b24ui: { prose: { tr: Partial<typeof theme> } } }

const proseTr = tv({ extend: tv(theme), ...(appConfigProseTr.b24ui?.prose?.tr || {}) })

export interface proseTrProps {
  class?: any
  b24ui?: Partial<typeof proseTr.slots>
}

export interface proseTrSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
const props = defineProps<proseTrProps>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseTr({})
</script>

<template>
  <tr
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </tr>
</template>
