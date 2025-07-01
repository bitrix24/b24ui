<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/p'
import type { ComponentConfig } from '../types/utils'

type ProseP = ComponentConfig<typeof theme, AppConfig, 'p', 'b24ui.prose'>

export interface ProsePProps {
  class?: any
  b24ui?: ProseP['slots']
}

export interface ProsePSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = defineProps<ProsePProps>()
defineSlots<ProsePSlots>()

const appConfig = useAppConfig() as ProseP['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.p || {}) })())
</script>

<template>
  <p :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </p>
</template>
