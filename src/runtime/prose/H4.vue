<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/h4'
import { tv } from '../utils/tv'

const appConfigProseH4 = _appConfig as AppConfig & { b24ui: { prose: { h4: Partial<typeof theme> } } }

const proseH4 = tv({ extend: tv(theme), ...(appConfigProseH4.b24ui?.prose?.h4 || {}) })

export interface proseH4Props {
  class?: any
  b24ui?: Partial<typeof proseH4.slots>
}

export interface proseH4Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
const props = defineProps<proseH4Props>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseH4({})
</script>

<template>
  <h4
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </h4>
</template>
