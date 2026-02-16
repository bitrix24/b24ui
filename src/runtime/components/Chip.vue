<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/chip'
import type { IconComponent } from '../types'
import type { ComponentConfig } from '../types/tv'

type Chip = ComponentConfig<typeof theme, AppConfig, 'chip'>

export interface ChipProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /** Display some text inside the chip. */
  text?: string | number
  /**
   * The icon displayed on the right side of the chip.
   * @IconComponent
   */
  trailingIcon?: IconComponent
  /**
   * @defaultValue 'danger'
   */
  color?: Chip['variants']['color']
  /**
   * If set to `true` the color is inverted.
   * Used for 'air-primary', 'air-primary-success', 'air-primary-alert', 'air-primary-copilot' and 'air-primary-warning' colors.
   * @defaultValue false
   */
  inverted?: boolean
  /**
   * @defaultValue 'sm'
   */
  size?: Chip['variants']['size']
  /**
   * The position of the chip.
   * @defaultValue 'top-right'
   */
  position?: Chip['variants']['position']
  /**
   * When `true`, keep the chip inside the component for rounded elements
   * @defaultValue false
   */
  inset?: boolean
  /**
   * When `true`, render the chip relatively to the parent.
   * @defaultValue false
   */
  standalone?: boolean
  /**
   * When `true`, hide chip if value='0'
   * @defaultValue false
   */
  hideZero?: boolean
  class?: any
  b24ui?: Chip['slots']
}

export interface ChipEmits {
  'update:show': [value: boolean]
}

export interface ChipSlots {
  default(props?: {}): any
  content(props?: {}): any
  trailing(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive, Slot } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { tv } from '../utils/tv'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ChipProps>(), {
  inverted: false,
  inset: false,
  standalone: false,
  hideZero: false
})
defineSlots<ChipSlots>()

const show = defineModel<boolean>('show', { default: true })

// const { size } = useAvatarGroup(props)
const appConfig = useAppConfig() as Chip['AppConfig']
const uiProp = useComponentUI('chip', props)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.chip || {}) })({
  color: props.color,
  inverted: Boolean(props.inverted),
  size: props.size, // size.value
  position: props.position,
  inset: Boolean(props.inset),
  standalone: Boolean(props.standalone),
  hideZero: Boolean(props.hideZero),
  oneDigit: !props.trailingIcon && props.text?.toString().length === 1
}))

const value = computed(() => {
  return props.text
})
</script>

<template>
  <Primitive
    :as="as"
    data-slot="root"
    :class="b24ui.root({ class: [uiProp?.root, props.class] })"
  >
    <Slot v-bind="$attrs">
      <slot />
    </Slot>

    <span
      v-if="show"
      data-slot="base"
      :class="b24ui.base({ class: uiProp?.base })"
      :data-value="value"
    >
      <slot name="content">
        <span>{{ text }}</span>
      </slot>
      <slot name="trailing">
        <Component
          :is="trailingIcon"
          data-slot="trailingIcon"
          :class="b24ui.trailingIcon({ class: uiProp?.trailingIcon })"
        />
      </slot>
    </span>
  </Primitive>
</template>
