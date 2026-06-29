<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/em'
import type { ComponentConfig } from '../../types/tv'

type ProseEm = ComponentConfig<typeof theme, AppConfig, 'em', 'b24ui.prose'>

export interface ProseEmProps {
  class?: any
  b24ui?: ProseEm['slots']
}

export interface ProseEmSlots {
  default(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { tv } from '../../utils/tv'

const _props = defineProps<ProseEmProps>()

defineSlots<ProseEmSlots>()

const props = useComponentProps('prose.em', _props)

const appConfig = useAppConfig() as ProseEm['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.prose?.em || {}) })())
</script>

<template>
  <em data-slot="base" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </em>
</template>
