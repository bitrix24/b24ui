<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/h5'
import { tv } from '../utils/tv'

const appConfigProseH5 = _appConfig as AppConfig & { b24ui: { prose: { h5: Partial<typeof theme> } } }

const proseH5 = tv({ extend: tv(theme), ...(appConfigProseH5.b24ui?.prose?.h5 || {}) })

export interface proseH5Props {
  class?: any
  b24ui?: Partial<typeof proseH5.slots>
}

export interface proseH5Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
const props = defineProps<proseH5Props>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseH5({})
</script>

<template>
  <h5
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </h5>
</template>
