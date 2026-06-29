<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/kbd'
import type { ComponentConfig } from '../../types/tv'

type ProseKbd = ComponentConfig<typeof theme, AppConfig, 'kbd', 'b24ui.prose'>

export interface ProseKbdProps {
  value?: string
  class?: any
  b24ui?: { base?: any }
}

export interface ProseKbdSlots {
  default?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { tv } from '../../utils/tv'
import B24Kbd from '../Kbd.vue'

const _props = defineProps<ProseKbdProps>()
defineSlots<ProseKbdSlots>()

const props = useComponentProps('prose.kbd', _props)

const appConfig = useAppConfig() as ProseKbd['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.prose?.kbd || {}) }))
</script>

<template>
  <B24Kbd :value="props.value" :class="b24ui({ class: [props.b24ui?.base, props.class] })">
    <slot />
  </B24Kbd>
</template>
