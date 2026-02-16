<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/em'
import type { ComponentConfig } from '../../types/tv'

type ProseEm = ComponentConfig<typeof theme, AppConfig, 'em', 'b24ui.prose'>

export interface ProseEmProps {
  class?: any
  b24ui?: ProseEm['slots']
}

export interface ProseEmSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../../composables/useComponentUI'
import { tv } from '../../utils/tv'

const props = defineProps<ProseEmProps>()
defineSlots<ProseEmSlots>()

const appConfig = useAppConfig() as ProseEm['AppConfig']
const uiProp = useComponentUI('prose.em', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.em || {}) })())
</script>

<template>
  <em data-slot="base" :class="b24ui.base({ class: [uiProp?.base, props.class] })">
    <slot />
  </em>
</template>
