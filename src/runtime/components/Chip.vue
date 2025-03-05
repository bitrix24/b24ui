<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/chip'
import { tv } from '../utils/tv'

const appConfigChip = _appConfig as AppConfig & { b24ui: { chip: Partial<typeof theme> } }

const chip = tv({ extend: tv(theme), ...(appConfigChip.b24ui?.chip || {}) })

type ChipVariants = VariantProps<typeof chip>

export interface ChipProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /** Display some text inside the chip. */
  text?: string | number
  /**
   * @defaultValue 'danger'
   */
  color?: ChipVariants['color']
  /**
   * @defaultValue 'sm'
   */
  size?: ChipVariants['size']
  /**
   * The position of the chip.
   * @defaultValue 'top-right'
   */
  position?: ChipVariants['position']
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
  class?: any
  b24ui?: Partial<typeof chip.slots>
}

export interface ChipEmits {
  (e: 'update:show', payload: boolean): void
}

export interface ChipSlots {
  default(props?: {}): any
  content(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive, Slot } from 'reka-ui'
import { useAvatarGroup } from '../composables/useAvatarGroup'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ChipProps>(), {
  inset: false,
  standalone: false
})
defineSlots<ChipSlots>()

const show = defineModel<boolean>('show', { default: true })

const { size } = useAvatarGroup(props)

const b24ui = computed(() => chip({
  color: props.color,
  size: size.value,
  position: props.position,
  inset: Boolean(props.inset),
  standalone: Boolean(props.standalone)
}))
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <Slot v-bind="$attrs">
      <slot />
    </Slot>

    <span v-if="show" :class="b24ui.base({ class: props.b24ui?.base })">
      <slot name="content">
        {{ text }}
      </slot>
    </span>
  </Primitive>
</template>
