<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/th'
import type { ComponentConfig } from '../types/utils'

type ProseTh = ComponentConfig<typeof theme, AppConfig, 'th', 'b24ui.prose'>

export interface ProseThProps {
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
import { tv } from '../utils/tv'

const props = defineProps<ProseThProps>()
defineSlots<ProseThSlots>()

const appConfig = useAppConfig() as ProseTh['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.th || {}) })())
</script>

<template>
  <th :class="b24ui.base({ class: [props.class, props.b24ui?.base] })">
    <slot />
  </th>
</template>
