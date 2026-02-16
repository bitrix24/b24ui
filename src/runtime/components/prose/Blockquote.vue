<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/blockquote'
import type { ComponentConfig } from '../../types/tv'

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
import { useComponentUI } from '../../composables/useComponentUI'
import { tv } from '../../utils/tv'

const props = defineProps<ProseBlockquoteProps>()
defineSlots<ProseBlockquoteSlots>()

const appConfig = useAppConfig() as ProseBlockquote['AppConfig']
const uiProp = useComponentUI('prose.blockquote', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.blockquote || {}) })())
</script>

<template>
  <blockquote data-slot="base" :class="b24ui.base({ class: [uiProp?.base, props.class] })">
    <slot />
  </blockquote>
</template>
