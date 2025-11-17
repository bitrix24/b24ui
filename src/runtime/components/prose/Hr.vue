<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/hr'
import type { ComponentConfig } from '../../types/tv'

type ProseHr = ComponentConfig<typeof theme, AppConfig, 'hr', 'b24ui.prose'>

export interface ProseHrProps {
  class?: any
  b24ui?: ProseHr['slots']
}
/**
 * @todo add Pick<Xxxx
 */
/**
 * @todo add Pick<Xxxx
 */
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = defineProps<ProseHrProps>()

const appConfig = useAppConfig() as ProseHr['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.hr || {}) })())
</script>

<template>
  <hr data-slot="base" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
</template>
