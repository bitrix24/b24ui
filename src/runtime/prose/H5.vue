<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/h5'
import type { ComponentConfig } from '../types/utils'

type ProseH5 = ComponentConfig<typeof theme, AppConfig, 'h5', 'b24ui.prose'>

export interface ProseH5Props {
  class?: any
  b24ui?: ProseH5['slots']
}
/**
 * @todo add Pick<Xxxx
 */

export interface ProseH5Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = defineProps<ProseH5Props>()
defineSlots<ProseH5Slots>()

const appConfig = useAppConfig() as ProseH5['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.h5 || {}) })())
</script>

<template>
  <h5 :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </h5>
</template>
