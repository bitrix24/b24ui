<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/blockquote'
import { tv } from '../utils/tv'

const appConfigProseBlockquote = _appConfig as AppConfig & { b24ui: { prose: { blockquote: Partial<typeof theme> } } }

const proseBlockquote = tv({ extend: tv(theme), ...(appConfigProseBlockquote.b24ui?.prose?.blockquote || {}) })

export interface proseBlockquoteProps {
  class?: any
  b24ui?: Partial<typeof proseBlockquote.slots>
}

export interface proseBlockquoteSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<proseBlockquoteProps>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseBlockquote({})
</script>

<template>
  <blockquote
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </blockquote>
</template>
