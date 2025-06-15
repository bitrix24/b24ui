<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/h4'
import type { ComponentConfig } from '../types/utils'

type ProseH4 = ComponentConfig<typeof theme, AppConfig, 'h4', 'b24ui.prose'>

export interface ProseH4Props {
  class?: any
  b24ui?: ProseH4['slots']
}

export interface ProseH4Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = defineProps<ProseH4Props>()
defineSlots<ProseH4Slots>()

const appConfig = useAppConfig() as ProseH4['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.h4 || {}) })())
</script>

<template>
  <h4 :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </h4>
</template>
