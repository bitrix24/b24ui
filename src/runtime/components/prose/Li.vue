<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/li'
import type { ComponentConfig } from '../../types/tv'

type ProseLi = ComponentConfig<typeof theme, AppConfig, 'li', 'b24ui.prose'>

export interface ProseLiProps {
  class?: any
  b24ui?: ProseLi['slots']
}
/**
 * @todo add Pick<Xxxx
 */

export interface ProseLiSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = defineProps<ProseLiProps>()
defineSlots<ProseLiSlots>()

const appConfig = useAppConfig() as ProseLi['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.li || {}) })())
</script>

<template>
  <li data-slot="base" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </li>
</template>
