<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/prose-h2'
import { tv } from '../utils/tv'

const appConfigProseH2 = _appConfig as AppConfig & { b24ui: { prose: { h2: Partial<typeof theme> } } }

const proseH2 = tv({ extend: tv(theme), ...(appConfigProseH2.b24ui?.prose?.h2 || {}) })

export interface proseH2Props {
  class?: any
  b24ui?: Partial<typeof proseH2.slots>
}

export interface proseH2Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<proseH2Props>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseH2({})
</script>

<template>
  <h2
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </h2>
</template>
