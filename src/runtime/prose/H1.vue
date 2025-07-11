<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/h1'
import type { ComponentConfig } from '../types/utils'

type ProseH1 = ComponentConfig<typeof theme, AppConfig, 'h1', 'b24ui.prose'>

export interface ProseH1Props {
  class?: any
  b24ui?: ProseH1['slots']
}
/**
 * @todo add Pick<Xxxx
 */

export interface ProseH1Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = defineProps<ProseH1Props>()
defineSlots<ProseH1Slots>()

const appConfig = useAppConfig() as ProseH1['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.h1 || {}) })())
</script>

<template>
  <h1 :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </h1>
</template>
