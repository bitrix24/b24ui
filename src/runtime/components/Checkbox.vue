<script lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import type { CheckboxRootProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/checkbox'

const appConfig = _appConfig as AppConfig & { b24ui: { checkbox: Partial<typeof theme> } }

const checkbox = tv({ extend: tv(theme), ...(appConfig.b24ui?.checkbox || {}) })

type CheckboxVariants = VariantProps<typeof checkbox>

export interface CheckboxProps extends Pick<CheckboxRootProps, 'disabled' | 'required' | 'name' | 'value' | 'id' | 'defaultValue'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  label?: string
  description?: string
  color?: CheckboxVariants['color']
  size?: CheckboxVariants['size']
  class?: any
  b24ui?: Partial<typeof checkbox.slots>
}

export type CheckboxEmits = {
  change: [payload: Event]
}

export interface CheckboxSlots {
  label(props: { label?: string }): any
  description(props: { description?: string }): any
}
</script>

<script setup lang="ts">
import { computed, useId } from 'vue'
import { Primitive, CheckboxRoot, CheckboxIndicator, Label, useForwardProps } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useFormField } from '../composables/useFormField'
import Minus20Icon from '@bitrix24/b24icons-vue/actions/Minus20Icon'
import CheckIcon from '@bitrix24/b24icons-vue/main/CheckIcon'

const props = defineProps<CheckboxProps>()
const slots = defineSlots<CheckboxSlots>()
const emits = defineEmits<CheckboxEmits>()

const modelValue = defineModel<boolean | 'indeterminate'>({ default: undefined })

const rootProps = useForwardProps(reactivePick(props, 'required', 'value', 'defaultValue'))

const appConfig = useAppConfig()
const { id: _id, emitFormChange, emitFormInput, size, color, name, disabled } = useFormField<CheckboxProps>(props)
const id = _id.value ?? useId()

const b24ui = computed(() => checkbox({
  size: size.value,
  color: color.value,
  required: props.required,
  disabled: disabled.value,
  checked: Boolean(modelValue.value ?? props.defaultValue)
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
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <div :class="b24ui.container({ class: props.b24ui?.container })">
      <CheckboxRoot
        :id="id"
        v-bind="rootProps"
        v-model="modelValue"
        :name="name"
        :disabled="disabled"
        :class="b24ui.base({ class: props.b24ui?.base })"
        @update:model-value="onUpdate"
      >
        <template #default="{ modelValue }">
          <CheckboxIndicator as-child>
            <Minus20Icon v-if="modelValue === 'indeterminate'" :class="b24ui.icon({ class: props.b24ui?.icon })" />
            <CheckIcon v-else :class="b24ui.icon({ class: props.b24ui?.icon })" />
          </CheckboxIndicator>
        </template>
      </CheckboxRoot>
    </div>

    <div v-if="(label || !!slots.label) || (description || !!slots.description)" :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
      <Label v-if="label || !!slots.label" :for="id" :class="b24ui.label({ class: props.b24ui?.label })">
        <slot name="label" :label="label">
          {{ label }}
        </slot>
      </Label>
      <p v-if="description || !!slots.description" :class="b24ui.description({ class: props.b24ui?.description })">
        <slot name="description" :description="description">
          {{ description }}
        </slot>
      </p>
    </div>
  </Primitive>
</template>
