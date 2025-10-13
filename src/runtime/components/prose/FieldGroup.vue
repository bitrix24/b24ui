<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../../types/tv'
import theme from '#build/b24ui/prose/field-group'

type ProseFieldGroup = ComponentConfig<typeof theme, AppConfig, 'fieldGroup', 'b24ui.prose'>

export interface ProseFieldGroupProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
}

export interface ProseFieldGroupSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = defineProps<ProseFieldGroupProps>()
defineSlots<ProseFieldGroupSlots>()

const appConfig = useAppConfig() as ProseFieldGroup['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.fieldGroup || {}) }))
</script>

<template>
  <Primitive :as="as" :class="b24ui({ class: props.class })">
    <slot />
  </Primitive>
</template>
