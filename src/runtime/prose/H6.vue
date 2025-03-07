<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/h6'
import { tv } from '../utils/tv'

const appConfigProseH6 = _appConfig as AppConfig & { b24ui: { prose: { h6: Partial<typeof theme> } } }

const proseH6 = tv({ extend: tv(theme), ...(appConfigProseH6.b24ui?.prose?.h6 || {}) })

export interface proseH6Props {
  class?: any
  b24ui?: Partial<typeof proseH6.slots>
}

export interface proseH6Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
const props = defineProps<proseH6Props>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseH6({})
</script>

<template>
  <h6
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </h6>
</template>
