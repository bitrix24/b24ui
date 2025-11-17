<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/ul'
import type { ComponentConfig } from '../../types/tv'

type ProseUl = ComponentConfig<typeof theme, AppConfig, 'ul', 'b24ui.prose'>

export interface ProseUlProps {
  class?: any
  b24ui?: ProseUl['slots']
}
/**
 * @todo add Pick<Xxxx
 */

export interface ProseUlSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = defineProps<ProseUlProps>()
defineSlots<ProseUlSlots>()

const appConfig = useAppConfig() as ProseUl['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.ul || {}) })())
</script>

<template>
  <ul data-slot="base" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </ul>
</template>
