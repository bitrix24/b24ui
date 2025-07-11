<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/h2'
import type { ComponentConfig } from '../types/utils'

type ProseH2 = ComponentConfig<typeof theme, AppConfig, 'h2', 'b24ui.prose'>

export interface ProseH2Props {
  class?: any
  b24ui?: ProseH2['slots']
}
/**
 * @todo add Pick<Xxxx
 */

export interface ProseH2Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = defineProps<ProseH2Props>()
defineSlots<ProseH2Slots>()

const appConfig = useAppConfig() as ProseH2['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.h2 || {}) })())
</script>

<template>
  <h2 :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </h2>
</template>
