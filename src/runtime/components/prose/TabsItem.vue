<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../../types/tv'
import theme from '#build/b24ui/prose/tabs-item'

type ProseTabsItem = ComponentConfig<typeof theme, AppConfig, 'tabsItem', 'b24ui.prose'>

export interface ProseTabsItemProps {
  label: string
  description?: string
  class?: any
}

export interface ProseTabsItemSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = defineProps<ProseTabsItemProps>()
defineSlots<ProseTabsItemSlots>()

const appConfig = useAppConfig() as ProseTabsItem['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.tabsItem || {}) }))
</script>

<template>
  <div :class="b24ui({ class: props.class })">
    <slot>
      {{ description }}
    </slot>
  </div>
</template>
