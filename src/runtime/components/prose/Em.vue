<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/em'
import type { ComponentConfig } from '../../types/tv'

type ProseEm = ComponentConfig<typeof theme, AppConfig, 'em', 'b24ui.prose'>

export interface ProseEmProps {
  class?: any
  b24ui?: ProseEm['slots']
}
/**
 * @todo add Pick<Xxxx
 */

export interface ProseEmSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = defineProps<ProseEmProps>()
defineSlots<ProseEmSlots>()

const appConfig = useAppConfig() as ProseEm['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.em || {}) })())
</script>

<template>
  <em data-slot="base" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </em>
</template>
