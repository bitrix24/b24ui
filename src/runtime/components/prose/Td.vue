<script lang="ts">
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
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../../composables/useComponentUI'
import { tv } from '../../utils/tv'

const props = defineProps<ProseTdProps>()
defineSlots<ProseTdSlots>()

const appConfig = useAppConfig() as ProseTd['AppConfig']
const uiProp = useComponentUI('prose.td', props)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.td || {}) })({
  align: props.align
}))
</script>

<template>
  <td data-slot="base" :class="b24ui.base({ class: [uiProp?.base, props.class] })">
    <slot />
  </td>
</template>
