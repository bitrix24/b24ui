<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/field-group'
import type { ComponentConfig } from '../types/tv'

type FieldGroup = ComponentConfig<typeof theme, AppConfig, 'fieldGroup'>

export interface FieldGroupProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * @defaultValue 'md'
   */
  size?: FieldGroup['variants']['size']
  /**
   * The orientation the buttons are laid out.
   * @defaultValue 'horizontal'
   */
  orientation?: FieldGroup['variants']['orientation']
  /**
   * Disable show split
   * @defaultValue false
   */
  noSplit?: boolean
  class?: any
  b24ui?: { base?: any }
}

export interface FieldGroupSlots {
  default?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { provide, computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { fieldGroupInjectionKey } from '../composables/useFieldGroup'
import { tv } from '../utils/tv'

const _props = withDefaults(defineProps<FieldGroupProps>(), {
  orientation: 'horizontal',
  noSplit: false
})
defineSlots<FieldGroupSlots>()

const props = useComponentProps('fieldGroup', _props)

const appConfig = useAppConfig() as FieldGroup['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.fieldGroup || {}) }))

provide(fieldGroupInjectionKey, computed(() => ({
  orientation: props.orientation,
  noSplit: Boolean(props.noSplit),
  size: props.size
})))
</script>

<template>
  <Primitive
    :as="props.as"
    :data-orientation="props.orientation"
    class="group/items is-field-group"
    :class="b24ui({ orientation: props.orientation, class: [props.b24ui?.base, props.class] })"
  >
    <slot />
  </Primitive>
</template>
