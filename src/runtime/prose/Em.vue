<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/em'
import { tv } from '../utils/tv'

const appConfigProseEm = _appConfig as AppConfig & { b24ui: { prose: { em: Partial<typeof theme> } } }

const proseEm = tv({ extend: tv(theme), ...(appConfigProseEm.b24ui?.prose?.em || {}) })

export interface proseEmProps {
  class?: any
  b24ui?: Partial<typeof proseEm.slots>
}

export interface proseEmSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
const props = defineProps<proseEmProps>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseEm({})
</script>

<template>
  <em
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  ><slot /></em>
</template>
