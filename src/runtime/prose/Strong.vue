<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/strong'
import { tv } from '../utils/tv'

const appConfigProseStrong = _appConfig as AppConfig & { b24ui: { prose: { strong: Partial<typeof theme> } } }

const proseStrong = tv({ extend: tv(theme), ...(appConfigProseStrong.b24ui?.prose?.strong || {}) })

export interface proseStrongProps {
  class?: any
  b24ui?: Partial<typeof proseStrong.slots>
}

export interface proseStrongSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
const props = defineProps<proseStrongProps>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseStrong({})
</script>

<template>
  <strong
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </strong>
</template>
