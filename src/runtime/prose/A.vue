<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/a'
import type { ComponentConfig } from '../types/utils'

type ProseA = ComponentConfig<typeof theme, AppConfig, 'a', 'b24ui.prose'>

export interface ProseAProps {
  class?: any
  b24ui?: ProseA['slots']
}

export interface ProseASlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = defineProps<ProseAProps>()
defineSlots<ProseASlots>()

const appConfig = useAppConfig() as ProseA['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.a || {}) })())
</script>

<template>
  <a :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </a>
</template>
