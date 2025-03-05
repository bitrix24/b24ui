<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/prose-h1'
import { tv } from '../utils/tv'

const appConfigProseH1 = _appConfig as AppConfig & { b24ui: { prose: { h1: Partial<typeof theme> } } }

const proseH1 = tv({ extend: tv(theme), ...(appConfigProseH1.b24ui?.prose?.h1 || {}) })

export interface proseH1Props {
  class?: any
  b24ui?: Partial<typeof proseH1.slots>
}

export interface proseH1Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<proseH1Props>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseH1({})
</script>

<template>
  <h1
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </h1>
</template>
