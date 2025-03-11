<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/thead'
import { tv } from '../utils/tv'

const appConfigProseThead = _appConfig as AppConfig & { b24ui: { prose: { thead: Partial<typeof theme> } } }

const proseThead = tv({ extend: tv(theme), ...(appConfigProseThead.b24ui?.prose?.thead || {}) })

export interface proseTheadProps {
  class?: any
  b24ui?: Partial<typeof proseThead.slots>
}

export interface proseTheadSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
const props = defineProps<proseTheadProps>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseThead({})
</script>

<template>
  <thead
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </thead>
</template>
