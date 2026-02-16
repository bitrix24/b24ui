<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../../types/tv'
import theme from '#build/b24ui/prose/steps'

type ProseSteps = ComponentConfig<typeof theme, AppConfig, 'steps', 'b24ui.prose'>

export interface ProseStepsProps {
  /**
   * The heading level to apply to the steps.
   * @defaultValue '3'
   */
  level?: ProseSteps['variants']['level']
  class?: any
  b24ui?: { base?: any }
}

export interface ProseStepsSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../../composables/useComponentUI'
import { tv } from '../../utils/tv'

const props = defineProps<ProseStepsProps>()
defineSlots<ProseStepsSlots>()

const appConfig = useAppConfig() as ProseSteps['AppConfig']
const uiProp = useComponentUI('prose.steps', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.steps || {}) }))
</script>

<template>
  <div :class="b24ui({ class: [uiProp?.base, props.class], level: props.level })">
    <slot />
  </div>
</template>
