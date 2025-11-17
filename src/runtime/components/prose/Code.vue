<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/code'
import type { ComponentConfig } from '../../types/tv'

type ProseCode = ComponentConfig<typeof theme, AppConfig, 'code', 'b24ui.prose'>

export interface ProseCodeProps {
  /**
   * @defaultValue 'air-secondary'
   */
  color?: ProseCode['variants']['color']
  class?: any
  b24ui?: ProseCode['slots']
}

export interface ProseCodeSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = defineProps<ProseCodeProps>()
defineSlots<ProseCodeSlots>()

const appConfig = useAppConfig() as ProseCode['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.code || {}) })({
  color: props.color
}))
</script>

<template>
  <code
    data-slot="base"
    :class="b24ui.base({ class: [props.b24ui?.base, props.class] })"
  ><slot /></code>
</template>
