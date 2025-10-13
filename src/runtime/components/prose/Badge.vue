<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/badge'
import type { ComponentConfig } from '../../types/tv'

type ProseBadge = ComponentConfig<typeof theme, AppConfig, 'badge', 'b24ui.prose'>

export interface ProseBadgeProps {
  class?: any
}

export interface ProseBadgeSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'
import B24Badge from '../Badge.vue'

const props = defineProps<ProseBadgeProps>()
defineSlots<ProseBadgeSlots>()

const appConfig = useAppConfig() as ProseBadge['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.badge || {}) }))
</script>

<template>
  <B24Badge color="air-primary" :class="b24ui({ class: props.class })">
    <slot mdc-unwrap="p" />
  </B24Badge>
</template>
