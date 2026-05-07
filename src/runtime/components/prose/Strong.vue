<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/strong'
import type { ComponentConfig } from '../../types/tv'

type ProseStrong = ComponentConfig<typeof theme, AppConfig, 'strong', 'b24ui.prose'>

export interface ProseStrongProps {
  class?: any
  b24ui?: ProseStrong['slots']
}

export interface ProseStrongSlots {
  default(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { tv } from '../../utils/tv'

const _props = defineProps<ProseStrongProps>()

defineSlots<ProseStrongSlots>()

const props = useComponentProps('prose.strong', _props)

const appConfig = useAppConfig() as ProseStrong['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.strong || {}) })())
</script>

<template>
  <strong data-slot="base" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </strong>
</template>
