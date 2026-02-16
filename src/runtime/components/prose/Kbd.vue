<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/kbd'
import type { ComponentConfig } from '../../types/tv'

type ProseKbd = ComponentConfig<typeof theme, AppConfig, 'kbd', 'b24ui.prose'>

export interface ProseKbdProps {
  value: string
  class?: any
  b24ui?: { base?: any }
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../../composables/useComponentUI'
import { tv } from '../../utils/tv'
import B24Kbd from '../Kbd.vue'

const props = defineProps<ProseKbdProps>()

const appConfig = useAppConfig() as ProseKbd['AppConfig']
const uiProp = useComponentUI('prose.kbd', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.kbd || {}) }))
</script>

<template>
  <B24Kbd :value="value" :class="b24ui({ class: [uiProp?.base, props.class] })" />
</template>
