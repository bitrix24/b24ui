<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/blockquote'
import type { ComponentConfig } from '../../types/tv'

type ProseBlockquote = ComponentConfig<typeof theme, AppConfig, 'blockquote', 'b24ui.prose'>

export interface ProseBlockquoteProps {
  class?: any
  b24ui?: ProseBlockquote['slots']
}
/**
 * @todo add Pick<Xxxx
 */

export interface ProseBlockquoteSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = defineProps<ProseBlockquoteProps>()
defineSlots<ProseBlockquoteSlots>()

const appConfig = useAppConfig() as ProseBlockquote['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.blockquote || {}) })())
</script>

<template>
  <blockquote data-slot="base" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </blockquote>
</template>
