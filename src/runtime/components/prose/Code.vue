<script lang="ts">
import type { VNode } from 'vue'
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
  default(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { tv } from '../../utils/tv'

const _props = defineProps<ProseCodeProps>()

defineSlots<ProseCodeSlots>()

const props = useComponentProps('prose.code', _props)

const appConfig = useAppConfig() as ProseCode['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
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
