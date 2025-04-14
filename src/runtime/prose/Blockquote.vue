<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/blockquote'
import type { ComponentConfig } from '../types/utils'

type ProseBlockquote = ComponentConfig<typeof theme, AppConfig, 'blockquote', 'b24ui.prose'>

export interface ProseBlockquoteProps {
  class?: any
  b24ui?: ProseBlockquote['slots']
}

export interface ProseBlockquoteSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = defineProps<ProseBlockquoteProps>()
defineSlots<ProseBlockquoteSlots>()

const appConfig = useAppConfig() as ProseBlockquote['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.blockquote || {}) })())
</script>

<template>
  <blockquote :class="b24ui.base({ class: [props.class, props.b24ui?.base] })">
    <slot />
  </blockquote>
</template>
