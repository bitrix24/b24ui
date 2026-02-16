<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/p'
import type { ComponentConfig } from '../../types/tv'

type ProseP = ComponentConfig<typeof theme, AppConfig, 'p', 'b24ui.prose'>

export interface ProsePProps {
  /**
   * @defaultValue false
   */
  small?: boolean
  /**
   * @defaultValue 'default'
   */
  accent?: ProseP['variants']['accent']
  class?: any
  b24ui?: ProseP['slots']
}

export interface ProsePSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../../composables/useComponentUI'
import { tv } from '../../utils/tv'

const props = withDefaults(defineProps<ProsePProps>(), {
  small: false,
  accent: 'default'
})

defineSlots<ProsePSlots>()

const appConfig = useAppConfig() as ProseP['AppConfig']
const uiProp = useComponentUI('prose.p', props)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.p || {}) })({
  small: Boolean(props.small),
  accent: props.accent
}))
</script>

<template>
  <p data-slot="base" :class="b24ui.base({ class: [uiProp?.base, props.class] })">
    <slot />
  </p>
</template>
