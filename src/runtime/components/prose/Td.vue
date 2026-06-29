<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/td'
import type { ComponentConfig } from '../../types/tv'

type ProseTd = ComponentConfig<typeof theme, AppConfig, 'td', 'b24ui.prose'>

export interface ProseTdProps {
  align?: 'left' | 'center' | 'right'
  class?: any
  b24ui?: ProseTd['slots']
}

export interface ProseTdSlots {
  default(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { tv } from '../../utils/tv'

const _props = defineProps<ProseTdProps>()

defineSlots<ProseTdSlots>()

const props = useComponentProps('prose.td', _props)

const appConfig = useAppConfig() as ProseTd['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.prose?.td || {}) })({
  align: props.align
}))
</script>

<template>
  <td data-slot="base" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </td>
</template>
