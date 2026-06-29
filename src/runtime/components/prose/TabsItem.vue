<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../../types/tv'
import theme from '#build/b24ui/prose/tabs-item'

type ProseTabsItem = ComponentConfig<typeof theme, AppConfig, 'tabsItem', 'b24ui.prose'>

export interface ProseTabsItemProps {
  label: string
  description?: string
  class?: any
  b24ui?: { base?: any }
}

export interface ProseTabsItemSlots {
  default(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { tv } from '../../utils/tv'

const _props = defineProps<ProseTabsItemProps>()

defineSlots<ProseTabsItemSlots>()

const props = useComponentProps('prose.tabsItem', _props)

const appConfig = useAppConfig() as ProseTabsItem['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.prose?.tabsItem || {}) }))
</script>

<template>
  <div :class="b24ui({ class: [props.b24ui?.base, props.class] })">
    <slot>
      {{ props.description }}
    </slot>
  </div>
</template>
