<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/h6'
import type { ComponentConfig } from '../../types/tv'

type ProseH6 = ComponentConfig<typeof theme, AppConfig, 'h6', 'b24ui.prose'>

export interface ProseH6Props {
  id?: string
  /**
   * @defaultValue 'default'
   */
  accent?: ProseH6['variants']['accent']
  class?: any
  b24ui?: ProseH6['slots']
}

export interface ProseH6Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../../composables/useComponentUI'
import { tv } from '../../utils/tv'

const props = withDefaults(defineProps<ProseH6Props>(), {
  accent: 'default'
})
defineSlots<ProseH6Slots>()

const appConfig = useAppConfig() as ProseH6['AppConfig']
const uiProp = useComponentUI('prose.h6', props)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.h6 || {}) })({
  accent: props.accent
}))
</script>

<template>
  <h6
    :id="id"
    data-slot="base"
    :class="b24ui.base({ class: [uiProp?.base, props.class] })"
  >
    <slot />
  </h6>
</template>
