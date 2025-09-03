<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/h3'
import type { ComponentConfig } from '../../types/tv'

type ProseH3 = ComponentConfig<typeof theme, AppConfig, 'h3', 'b24ui.prose'>

export interface ProseH3Props {
  /**
   * @defaultValue 'default'
   */
  accent?: ProseH3['variants']['accent']
  class?: any
  b24ui?: ProseH3['slots']
}

export interface ProseH3Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = withDefaults(defineProps<ProseH3Props>(), {
  accent: 'default'
})
defineSlots<ProseH3Slots>()

const appConfig = useAppConfig() as ProseH3['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.h3 || {}) })({
  accent: props.accent
}))
</script>

<template>
  <h3 :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </h3>
</template>
