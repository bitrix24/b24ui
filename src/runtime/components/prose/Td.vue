<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/td'
import type { ComponentConfig } from '../../types/tv'

type ProseTd = ComponentConfig<typeof theme, AppConfig, 'td', 'b24ui.prose'>

export interface ProseTdProps {
  class?: any
  b24ui?: ProseTd['slots']
}
/**
 * @todo add Pick<Xxxx
 */

export interface ProseTdSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = defineProps<ProseTdProps>()
defineSlots<ProseTdSlots>()

const appConfig = useAppConfig() as ProseTd['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.td || {}) })())
</script>

<template>
  <td data-slot="base" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </td>
</template>
