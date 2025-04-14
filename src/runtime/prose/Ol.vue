<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/ol'
import type { ComponentConfig } from '../types/utils'

type ProseOl = ComponentConfig<typeof theme, AppConfig, 'ol', 'b24ui.prose'>

export interface ProseOlProps {
  class?: any
  b24ui?: ProseOl['slots']
}

export interface ProseOlSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = defineProps<ProseOlProps>()
defineSlots<ProseOlSlots>()

const appConfig = useAppConfig() as ProseOl['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.ol || {}) })())
</script>

<template>
  <ol :class="b24ui.base({ class: [props.class, props.b24ui?.base] })">
    <slot />
  </ol>
</template>
