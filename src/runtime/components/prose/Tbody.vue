<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/tbody'
import type { ComponentConfig } from '../../types/tv'

type ProseTbody = ComponentConfig<typeof theme, AppConfig, 'tbody', 'b24ui.prose'>

export interface ProseTbodyProps {
  class?: any
  b24ui?: ProseTbody['slots']
}

export interface ProseTbodySlots {
  default(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { tv } from '../../utils/tv'

const _props = defineProps<ProseTbodyProps>()

defineSlots<ProseTbodySlots>()

const props = useComponentProps('prose.tbody', _props)

const appConfig = useAppConfig() as ProseTbody['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.prose?.tbody || {}) })())
</script>

<template>
  <tbody data-slot="base" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </tbody>
</template>
