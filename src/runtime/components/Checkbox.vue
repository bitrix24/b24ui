<script lang="ts">
import type { CheckboxRootProps, CheckboxRootEmits } from 'reka-ui'
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/checkbox'
import type { ButtonHTMLAttributes } from '../types/html'
import type { IconComponent } from '../types/icons'
import type { ComponentConfig } from '../types/tv'

type Checkbox = ComponentConfig<typeof theme, AppConfig, 'checkbox'>

export interface CheckboxProps<T = boolean> extends Pick<CheckboxRootProps<T>, 'disabled' | 'required' | 'name' | 'value' | 'id' | 'defaultValue' | 'modelValue' | 'trueValue' | 'falseValue'>, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled' | 'name'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  label?: string
  description?: string
  /**
   * @defaultValue 'air-primary'
   */
  color?: Checkbox['variants']['color']
  /**
   * @defaultValue 'list'
   */
  variant?: Checkbox['variants']['variant']
  /**
   * @defaultValue 'md'
   */
  size?: Checkbox['variants']['size']
  /**
   * Position of the indicator.
   * @defaultValue 'start'
   */
  indicator?: Checkbox['variants']['indicator']
  /**
   * The icon displayed when checked, or above the label when `indicator` is `hidden`.
   * @defaultValue icons.check
   * @IconComponent
   */
  icon?: IconComponent
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  class?: any
  b24ui?: Checkbox['slots']
}

export interface CheckboxEmits<T = boolean> extends CheckboxRootEmits<T> {
  change: [event: Event]
}

export interface CheckboxSlots {
  label?(props: { label: string | undefined }): VNode[]
  description?(props: { description: string | undefined }): VNode[]
}
</script>

<script setup lang="ts" generic="T = boolean">
import { computed, useAttrs, useId } from 'vue'
import { Primitive, CheckboxRoot, CheckboxIndicator, Label } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useForwardProps } from '../composables/useForwardProps'
import { useFormField } from '../composables/useFormField'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'

defineOptions({ inheritAttrs: false })

const _props = defineProps<CheckboxProps<T>>()
const slots = defineSlots<CheckboxSlots>()
const emits = defineEmits<CheckboxEmits<T>>()

const props = useComponentProps<CheckboxProps<T>>('checkbox', _props)

const appConfig = useAppConfig() as Checkbox['AppConfig']

const rootProps = useForwardProps(reactivePick(props, 'required', 'value', 'defaultValue', 'modelValue', 'trueValue', 'falseValue'), emits)

const { id: _id, emitFormChange, emitFormInput, size: formFieldSize, color: formFieldColor, highlight: formFieldHighlight, name, disabled: formFieldDisabled, ariaAttrs } = useFormField<CheckboxProps<T>>(_props)
const id = _id.value ?? useId()

// eslint-disable-next-line vue/no-dupe-keys
const size = computed(() => formFieldSize.value ?? props.size)
// eslint-disable-next-line vue/no-dupe-keys
const color = computed(() => formFieldColor.value ?? props.color)
// eslint-disable-next-line vue/no-dupe-keys
const highlight = computed(() => formFieldHighlight.value ?? props.highlight)

const disabled = computed(() => formFieldDisabled.value ?? props.disabled)

// When the indicator is hidden the checked icon is never visible, so `icon` renders above the
// label instead. No dictionary fallback here: an unset `icon` must render nothing.
const labelIcon = computed(() => props.indicator === 'hidden' ? props.icon : undefined)

const attrs = useAttrs()
// Omit `data-state` to prevent conflicts with parent components (e.g. TooltipTrigger)
const forwardedAttrs = computed(() => {
  const { 'data-state': _, ...rest } = attrs
  return rest
})

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.checkbox || {}) })({
  size: size.value,
  color: color.value,
  variant: props.variant,
  indicator: props.indicator,
  highlight: highlight.value,
  required: props.required,
  disabled: disabled.value
}))

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emits('change', event)
  emitFormChange()
  emitFormInput()
}
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <Primitive :as="(!props.variant || props.variant === 'list') ? props.as : Label" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div data-slot="container" :class="b24ui.container({ class: props.b24ui?.container })">
      <CheckboxRoot
        :id="id"
        v-bind="{ ...rootProps, ...forwardedAttrs, ...ariaAttrs }"
        :name="name"
        :disabled="disabled"
        data-slot="base"
        :class="b24ui.base({ class: props.b24ui?.base })"
        @update:model-value="onUpdate"
      >
        <template #default="{ state }">
          <CheckboxIndicator v-if="props.indicator !== 'hidden'" data-slot="indicator" :class="b24ui.indicator({ class: props.b24ui?.indicator })">
            <Component :is="icons.minus" v-if="state === 'indeterminate'" data-slot="icon" :class="b24ui.icon({ class: props.b24ui?.icon })" />
            <Component :is="props.icon || icons.check" v-else data-slot="icon" :class="b24ui.icon({ class: props.b24ui?.icon })" />
          </CheckboxIndicator>
        </template>
      </CheckboxRoot>
    </div>

    <div v-if="labelIcon || (props.label || !!slots.label) || (props.description || !!slots.description)" data-slot="wrapper" :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
      <Component :is="labelIcon" v-if="labelIcon" data-slot="icon" :class="b24ui.icon({ class: props.b24ui?.icon })" />
      <component
        :is="props.variant === 'list' ? Label : 'span'"
        v-if="props.label || !!slots.label"
        :for="props.variant === 'list' ? id : undefined"
        data-slot="label"
        :class="b24ui.label({ class: props.b24ui?.label })"
      >
        <slot name="label" :label="props.label">
          {{ props.label }}
        </slot>
      </component>
      <p v-if="props.description || !!slots.description" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
        <slot name="description" :description="props.description">
          {{ props.description }}
        </slot>
      </p>
    </div>
  </Primitive>
</template>
