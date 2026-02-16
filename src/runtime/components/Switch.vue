<script lang="ts">
import type { SwitchRootProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/switch'
import type { IconComponent } from '../types'
import type { ButtonHTMLAttributes } from '../types/html'
import type { ComponentConfig } from '../types/tv'

type Switch = ComponentConfig<typeof theme, AppConfig, 'switch'>

export interface SwitchProps extends Pick<SwitchRootProps, 'disabled' | 'id' | 'name' | 'required' | 'value' | 'defaultValue'>, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled' | 'name'> {
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

export type SwitchEmits = {
  change: [event: Event]
}

export interface SwitchSlots {
  label(props: { label?: string }): any
  description(props: { description?: string }): any
}
</script>

<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'
import { Primitive, SwitchRoot, SwitchThumb, useForwardProps, Label } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { useFormField } from '../composables/useFormField'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'

defineOptions({ inheritAttrs: false })

const props = defineProps<SwitchProps>()
const slots = defineSlots<SwitchSlots>()
const emits = defineEmits<SwitchEmits>()

const modelValue = defineModel<boolean>({ default: undefined })

const appConfig = useAppConfig() as Switch['AppConfig']
const uiProp = useComponentUI('switch', props)

const rootProps = useForwardProps(reactivePick(props, 'required', 'value', 'defaultValue'))

const { id: _id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField<SwitchProps>(props)
const id = _id.value ?? useId()

const attrs = useAttrs()
// Omit `data-state` to prevent conflicts with parent components (e.g. TooltipTrigger)
const forwardedAttrs = computed(() => {
  const { 'data-state': _, ...rest } = attrs
  return rest
})

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.switch || {}) })({
  size: size.value,
  color: color.value,
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
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <div data-slot="container" :class="b24ui.container({ class: uiProp?.container })">
      <SwitchRoot
        :id="id"
        v-bind="{ ...rootProps, ...forwardedAttrs, ...ariaAttrs }"
        v-model="modelValue"
        :name="name"
        :disabled="disabled || loading"
        data-slot="base"
        :class="b24ui.base({ class: uiProp?.base })"
        @update:model-value="onUpdate"
      >
        <SwitchThumb data-slot="thumb" :class="b24ui.thumb({ class: uiProp?.thumb })">
          <Component
            :is="loadingIcon || icons.refresh"
            v-if="loading"
            data-slot="icon"
            :class="b24ui.icon({ class: uiProp?.icon, checked: true, unchecked: true })"
          />
          <template v-else>
            <Component
              :is="checkedIcon"
              v-if="checkedIcon"
              data-slot="icon"
              :class="b24ui.icon({ class: uiProp?.icon, checked: true })"
            />
            <Component
              :is="uncheckedIcon"
              v-if="uncheckedIcon"
              data-slot="icon"
              :class="b24ui.icon({ class: uiProp?.icon, unchecked: true })"
            />
          </template>
        </SwitchThumb>
      </SwitchRoot>
    </div>
    <div v-if="(label || !!slots.label) || (description || !!slots.description)" data-slot="wrapper" :class="b24ui.wrapper({ class: uiProp?.wrapper })">
      <Label v-if="label || !!slots.label" :for="id" data-slot="label" :class="b24ui.label({ class: uiProp?.label })">
        <slot name="label" :label="label">
          {{ label }}
        </slot>
      </Label>
      <p v-if="description || !!slots.description" data-slot="description" :class="b24ui.description({ class: uiProp?.description })">
        <slot name="description" :description="description">
          {{ description }}
        </slot>
      </p>
    </div>
  </Primitive>
</template>
