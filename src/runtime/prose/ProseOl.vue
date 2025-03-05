<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/prose-ol'
import { tv } from '../utils/tv'

const appConfigProseOl = _appConfig as AppConfig & { b24ui: { prose: { ol: Partial<typeof theme> } } }

const proseOl = tv({ extend: tv(theme), ...(appConfigProseOl.b24ui?.prose?.ol || {}) })

export interface proseOlProps {
  class?: any
  b24ui?: Partial<typeof proseOl.slots>
}

export interface proseOlSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<proseOlProps>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseOl({})
</script>

<template>
  <ol
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </ol>
</template>
