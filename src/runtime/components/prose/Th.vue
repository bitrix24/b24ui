<script lang="ts">
import type { VNode } from 'vue'
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
  default(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { tv } from '../../utils/tv'

const _props = defineProps<ProseThProps>()

defineSlots<ProseThSlots>()

const props = useComponentProps('prose.th', _props)

const appConfig = useAppConfig() as ProseTh['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.prose?.th || {}) })({
  align: props.align
}))
</script>

<template>
  <th data-slot="base" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </th>
</template>
