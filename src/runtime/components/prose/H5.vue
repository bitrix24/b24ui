<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/h5'
import type { ComponentConfig } from '../../types/tv'

type ProseH5 = ComponentConfig<typeof theme, AppConfig, 'h5', 'b24ui.prose'>

export interface ProseH5Props {
  id?: string
  /**
   * @defaultValue 'default'
   */
  accent?: ProseH5['variants']['accent']
  class?: any
  b24ui?: ProseH5['slots']
}

export interface ProseH5Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = withDefaults(defineProps<ProseH5Props>(), {
  accent: 'default'
})
defineSlots<ProseH5Slots>()

const appConfig = useAppConfig() as ProseH5['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.h5 || {}) })({
  accent: props.accent
}))
</script>

<template>
  <h5
    :id="id"
    data-slot="base"
    :class="b24ui.base({ class: [props.b24ui?.base, props.class] })"
  >
    <slot />
  </h5>
</template>
