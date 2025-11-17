<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/tr'
import type { ComponentConfig } from '../../types/tv'

type ProseTr = ComponentConfig<typeof theme, AppConfig, 'tr', 'b24ui.prose'>

export interface ProseTrProps {
  class?: any
  b24ui?: ProseTr['slots']
}
/**
 * @todo add Pick<Xxxx
 */

export interface ProseTrSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = defineProps<ProseTrProps>()
defineSlots<ProseTrSlots>()

const appConfig = useAppConfig() as ProseTr['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.tr || {}) })())
</script>

<template>
  <tr data-slot="base" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </tr>
</template>
