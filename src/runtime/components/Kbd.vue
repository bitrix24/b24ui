<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/kbd'
import type { KbdKey } from '../composables/useKbd'
import type { ComponentConfig } from '../types/tv'

type Kbd = ComponentConfig<typeof theme, AppConfig, 'kbd'>

/**
 * @remove depth
 */
export interface KbdProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'kbd'
   */
  as?: any
  value?: KbdKey | string
  /**
   * @defaultValue 'default'
   */
  accent?: Kbd['variants']['accent']
  /**
   * @defaultValue 'md'
   */
  size?: Kbd['variants']['size']
  class?: any
  b24ui?: Kbd['slots']
}

export interface KbdSlots {
  default?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useKbd } from '../composables/useKbd'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'

const _props = withDefaults(defineProps<KbdProps>(), {
  as: 'kbd',
  accent: 'default'
})
defineSlots<KbdSlots>()

const props = useComponentProps('kbd', _props)

const { getKbdKey } = useKbd()

const appConfig = useAppConfig() as Kbd['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.kbd || {}) })({
  accent: props.accent,
  size: props.size
}))
</script>

<template>
  <Primitive :as="props.as" data-slot="base" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot>
      {{ getKbdKey(props.value) }}
    </slot>
  </Primitive>
</template>
