<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/tbody'
import type { ComponentConfig } from '../../types/tv'

type ProseTbody = ComponentConfig<typeof theme, AppConfig, 'tbody', 'b24ui.prose'>

export interface ProseTbodyProps {
  class?: any
  b24ui?: ProseTbody['slots']
}

export interface ProseTbodySlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../../composables/useComponentUI'
import { tv } from '../../utils/tv'

const props = defineProps<ProseTbodyProps>()
defineSlots<ProseTbodySlots>()

const appConfig = useAppConfig() as ProseTbody['AppConfig']
const uiProp = useComponentUI('prose.tbody', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.tbody || {}) })())
</script>

<template>
  <tbody data-slot="base" :class="b24ui.base({ class: [uiProp?.base, props.class] })">
    <slot />
  </tbody>
</template>
