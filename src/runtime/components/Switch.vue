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
import { computed, useId } from 'vue'
import { Primitive, SwitchRoot, SwitchThumb, useForwardProps, Label } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useFormField } from '../composables/useFormField'
import { tv } from '../utils/tv'
import { omit } from '../utils'
import icons from '../dictionary/icons'

defineOptions({ inheritAttrs: false })

const props = defineProps<SwitchProps>()
const slots = defineSlots<SwitchSlots>()
const emits = defineEmits<SwitchEmits>()

const modelValue = defineModel<boolean>({ default: undefined })

const appConfig = useAppConfig() as Switch['AppConfig']

const rootProps = useForwardProps(reactivePick(props, 'required', 'value', 'defaultValue'))

const { id: _id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField<SwitchProps>(props)
const id = _id.value ?? useId()

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
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div data-slot="container" :class="b24ui.container({ class: props.b24ui?.container })">
      <SwitchRoot
        :id="id"
        v-bind="{ ...rootProps, ...omit({ ...$attrs }, ['data-state']), ...ariaAttrs }"
        v-model="modelValue"
        :name="name"
        :disabled="disabled || loading"
        data-slot="base"
        :class="b24ui.base({ class: props.b24ui?.base })"
        @update:model-value="onUpdate"
      >
        <SwitchThumb data-slot="thumb" :class="b24ui.thumb({ class: props.b24ui?.thumb })">
          <Component
            :is="loadingIcon || icons.refresh"
            v-if="loading"
            data-slot="icon"
            :class="b24ui.icon({ class: props.b24ui?.icon, checked: true, unchecked: true })"
          />
          <template v-else>
            <Component
              :is="checkedIcon"
              v-if="checkedIcon"
              data-slot="icon"
              :class="b24ui.icon({ class: props.b24ui?.icon, checked: true })"
            />
            <Component
              :is="uncheckedIcon"
              v-if="uncheckedIcon"
              data-slot="icon"
              :class="b24ui.icon({ class: props.b24ui?.icon, unchecked: true })"
            />
          </template>
        </SwitchThumb>
      </SwitchRoot>
    </div>
    <div v-if="(label || !!slots.label) || (description || !!slots.description)" data-slot="wrapper" :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
      <Label v-if="label || !!slots.label" :for="id" data-slot="label" :class="b24ui.label({ class: props.b24ui?.label })">
        <slot name="label" :label="label">
          {{ label }}
        </slot>
      </Label>
      <p v-if="description || !!slots.description" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
        <slot name="description" :description="description">
          {{ description }}
        </slot>
      </p>
    </div>
  </Primitive>
</template>
