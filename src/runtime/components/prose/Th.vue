<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/th'
import type { ComponentConfig } from '../../types/tv'

type ProseTh = ComponentConfig<typeof theme, AppConfig, 'th', 'b24ui.prose'>

export interface ProseThProps {
  align?: 'left' | 'center' | 'right'
  class?: any
  b24ui?: ProseTh['slots']
}

export interface ProseThSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../../composables/useComponentUI'
import { tv } from '../../utils/tv'

const props = defineProps<ProseThProps>()
defineSlots<ProseThSlots>()

const appConfig = useAppConfig() as ProseTh['AppConfig']
const uiProp = useComponentUI('prose.th', props)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.th || {}) })({
  align: props.align
}))
</script>

<template>
  <th data-slot="base" :class="b24ui.base({ class: [uiProp?.base, props.class] })">
    <slot />
  </th>
</template>
