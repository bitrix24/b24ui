<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/td'
import { tv } from '../utils/tv'

const appConfigProseTd = _appConfig as AppConfig & { b24ui: { prose: { td: Partial<typeof theme> } } }

const proseTd = tv({ extend: tv(theme), ...(appConfigProseTd.b24ui?.prose?.td || {}) })

export interface proseTdProps {
  class?: any
  b24ui?: Partial<typeof proseTd.slots>
}

export interface proseTdSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
const props = defineProps<proseTdProps>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseTd({})
</script>

<template>
  <td
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </td>
</template>
