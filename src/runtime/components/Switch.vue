<script lang="ts">
import type { SwitchRootProps, SwitchRootEmits } from 'reka-ui'
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/switch'
import type { IconComponent } from '../types/icons'
import type { ButtonHTMLAttributes } from '../types/html'
import type { ComponentConfig } from '../types/tv'

type Switch = ComponentConfig<typeof theme, AppConfig, 'switch'>

export interface SwitchProps<T = boolean> extends Pick<SwitchRootProps<T>, 'disabled' | 'id' | 'name' | 'required' | 'value' | 'defaultValue' | 'modelValue' | 'trueValue' | 'falseValue'>, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled' | 'name'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * @defaultValue 'air-primary'
   */
  color?: Switch['variants']['color']
  /**
   * @defaultValue 'md'
   */
  size?: Switch['variants']['size']
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  /**
   * When `true`, the loading icon will be displayed
   * @defaultValue false
   */
  loading?: boolean
  /**
   * The icon when the `loading` prop is `true`.
   * @defaultValue icons.refresh
   * @IconComponent
   */
  loadingIcon?: IconComponent
  /**
   * Display an icon when the switch is checked.
   * @IconComponent
   */
  checkedIcon?: IconComponent
  /**
   * Display an icon when the switch is unchecked.
   * @IconComponent
   */
  uncheckedIcon?: IconComponent
  label?: string
  description?: string
  class?: any
  b24ui?: Switch['slots']
}

export interface SwitchEmits<T = boolean> extends SwitchRootEmits<T> {
  change: [event: Event]
}

export interface SwitchSlots {
  label?(props: { label: string | undefined }): VNode[]
  description?(props: { description: string | undefined }): VNode[]
}
</script>

<script setup lang="ts" generic="T = boolean">
import { computed, useAttrs, useId } from 'vue'
import { Primitive, SwitchRoot, SwitchThumb, Label } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useForwardProps } from '../composables/useForwardProps'
import { useFormField } from '../composables/useFormField'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'

defineOptions({ inheritAttrs: false })

const _props = defineProps<SwitchProps<T>>()
const slots = defineSlots<SwitchSlots>()
const emits = defineEmits<SwitchEmits<T>>()

const props = useComponentProps<SwitchProps<T>>('switch', _props)

const appConfig = useAppConfig() as Switch['AppConfig']

const rootProps = useForwardProps(reactivePick(props, 'required', 'value', 'defaultValue', 'modelValue', 'trueValue', 'falseValue'), emits)

const { id: _id, emitFormChange, emitFormInput, size, color, highlight, name, disabled, ariaAttrs } = useFormField<SwitchProps<T>>(_props)
const id = _id.value ?? useId()

const attrs = useAttrs()
// Omit `data-state` to prevent conflicts with parent components (e.g. TooltipTrigger)
const forwardedAttrs = computed(() => {
  const { 'data-state': _, ...rest } = attrs
  return rest
})

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.switch || {}) })({
  size: size.value ?? props.size,
  color: color.value ?? props.color,
  highlight: highlight.value ?? props.highlight,
  required: props.required,
  loading: props.loading,
  disabled: disabled.value || props.loading
}))

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emits('change', event)
  emitFormChange()
  emitFormInput()
}
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div data-slot="container" :class="b24ui.container({ class: props.b24ui?.container })">
      <SwitchRoot
        :id="id"
        v-bind="{ ...rootProps, ...forwardedAttrs, ...ariaAttrs }"
        :name="name"
        :disabled="disabled || props.loading"
        data-slot="base"
        :class="b24ui.base({ class: props.b24ui?.base })"
        @update:model-value="onUpdate"
      >
        <SwitchThumb data-slot="thumb" :class="b24ui.thumb({ class: props.b24ui?.thumb })">
          <Component
            :is="props.loadingIcon || icons.refresh"
            v-if="props.loading"
            data-slot="icon"
            :class="b24ui.icon({ class: props.b24ui?.icon, checked: true, unchecked: true })"
          />
          <template v-else>
            <Component
              :is="props.checkedIcon"
              v-if="props.checkedIcon"
              data-slot="icon"
              :class="b24ui.icon({ class: props.b24ui?.icon, checked: true })"
            />
            <Component
              :is="props.uncheckedIcon"
              v-if="props.uncheckedIcon"
              data-slot="icon"
              :class="b24ui.icon({ class: props.b24ui?.icon, unchecked: true })"
            />
          </template>
        </SwitchThumb>
      </SwitchRoot>
    </div>
    <div v-if="(props.label || !!slots.label) || (props.description || !!slots.description)" data-slot="wrapper" :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
      <Label v-if="props.label || !!slots.label" :for="id" data-slot="label" :class="b24ui.label({ class: props.b24ui?.label })">
        <slot name="label" :label="props.label">
          {{ props.label }}
        </slot>
      </Label>
      <p v-if="props.description || !!slots.description" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
        <slot name="description" :description="props.description">
          {{ props.description }}
        </slot>
      </p>
    </div>
  </Primitive>
</template>
