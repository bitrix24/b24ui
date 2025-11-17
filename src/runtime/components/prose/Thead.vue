<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/thead'
import type { ComponentConfig } from '../../types/tv'

type ProseThead = ComponentConfig<typeof theme, AppConfig, 'thead', 'b24ui.prose'>

export interface ProseTheadProps {
  class?: any
  b24ui?: ProseThead['slots']
}
/**
 * @todo add Pick<Xxxx
 */

export interface ProseTheadSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = defineProps<ProseTheadProps>()
defineSlots<ProseTheadSlots>()

const appConfig = useAppConfig() as ProseThead['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.thead || {}) })())
</script>

<template>
  <thead data-slot="base" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </thead>
</template>
