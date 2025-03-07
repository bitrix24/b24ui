<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/h3'
import { tv } from '../utils/tv'

const appConfigProseH3 = _appConfig as AppConfig & { b24ui: { prose: { h3: Partial<typeof theme> } } }

const proseH3 = tv({ extend: tv(theme), ...(appConfigProseH3.b24ui?.prose?.h3 || {}) })

export interface proseH3Props {
  class?: any
  b24ui?: Partial<typeof proseH3.slots>
}

export interface proseH3Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
const props = defineProps<proseH3Props>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseH3({})
</script>

<template>
  <h3
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </h3>
</template>
