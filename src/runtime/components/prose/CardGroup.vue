<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../../types/tv'
import theme from '#build/b24ui/prose/card-group'

type ProseCardGroup = ComponentConfig<typeof theme, AppConfig, 'cardGroup', 'b24ui.prose'>

export interface ProseCardGroupProps {
  class?: any
  b24ui?: { base?: any }
}

export interface ProseCardGroupSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../../composables/useComponentUI'
import { tv } from '../../utils/tv'

const props = defineProps<ProseCardGroupProps>()
defineSlots<ProseCardGroupSlots>()

const appConfig = useAppConfig() as ProseCardGroup['AppConfig']
const uiProp = useComponentUI('prose.cardGroup', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.cardGroup || {}) }))
</script>

<template>
  <div :class="b24ui({ class: [uiProp?.base, props.class] })">
    <slot />
  </div>
</template>
