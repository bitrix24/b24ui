<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/h6'
import type { ComponentConfig } from '../types/utils'

type ProseH6 = ComponentConfig<typeof theme, AppConfig, 'h6', 'b24ui.prose'>

export interface ProseH6Props {
  class?: any
  b24ui?: ProseH6['slots']
}
/**
 * @todo add Pick<Xxxx
 */

export interface ProseH6Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = defineProps<ProseH6Props>()
defineSlots<ProseH6Slots>()

const appConfig = useAppConfig() as ProseH6['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.h6 || {}) })())
</script>

<template>
  <h6 :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </h6>
</template>
