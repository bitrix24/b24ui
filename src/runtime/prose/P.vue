<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/p'
import { tv } from '../utils/tv'

const appConfigProseP = _appConfig as AppConfig & { b24ui: { prose: { p: Partial<typeof theme> } } }

const proseP = tv({ extend: tv(theme), ...(appConfigProseP.b24ui?.prose?.p || {}) })

export interface prosePProps {
  class?: any
  b24ui?: Partial<typeof proseP.slots>
}

export interface prosePSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
const props = defineProps<prosePProps>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseP({})
</script>

<template>
  <p
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </p>
</template>
