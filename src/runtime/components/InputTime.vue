<script lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type { TimeFieldRootProps, TimeFieldRootEmits } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/input-time'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, BadgeProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type InputTime = ComponentConfig<typeof theme, AppConfig, 'inputTime'>

export interface InputTimeProps extends Omit<TimeFieldRootProps, 'as' | 'asChild' | 'locale' | 'dir'>, UseComponentIconsProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * @defaultValue 'air-primary'
   */
  color?: InputTime['variants']['color']
  /**
   * @defaultValue 'md'
   */
  size?: InputTime['variants']['size']
  /**
   * Removes padding from input
   * @defaultValue false
   */
  noPadding?: boolean
  /**
   * Removes all borders (rings)
   * @defaultValue false
   */
  noBorder?: boolean
  /**
   * Removes all borders (rings) except the bottom one
   * @defaultValue false
   */
  underline?: boolean
  /**
   * Rounds the corners of the input
   * @defaultValue false
   */
  rounded?: boolean
  tag?: string
  /**
   * @defaultValue 'air-primary'
   */
  tagColor?: BadgeProps['color']
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  class?: any
  b24ui?: InputTime['slots']
}

export interface InputTimeEmits extends TimeFieldRootEmits {
  change: [event: Event]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}

export interface InputTimeSlots {
  leading(props: { b24ui: InputTime['b24ui'] }): any
  default(props: { b24ui: InputTime['b24ui'] }): any
  trailing(props: { b24ui: InputTime['b24ui'] }): any
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { TimeFieldRoot, TimeFieldInput, useForwardPropsEmits } from 'reka-ui'
import { reactiveOmit } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { useFieldGroup } from '../composables/useFieldGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFormField } from '../composables/useFormField'
import { tv } from '../utils/tv'
import B24Badge from './Badge.vue'
import B24Avatar from './Avatar.vue'

const props = withDefaults(defineProps<InputTimeProps>(), {
  autofocusDelay: 0
})
const emits = defineEmits<InputTimeEmits>()
const slots = defineSlots<InputTimeSlots>()

const appConfig = useAppConfig() as InputTime['AppConfig']
const uiProp = useComponentUI('inputTime', props)

const rootProps = useForwardPropsEmits(reactiveOmit(props, 'id', 'name', 'color', 'size', 'highlight', 'disabled', 'autofocus', 'autofocusDelay', 'icon', 'avatar', 'trailingIcon', 'loading', 'class', 'b24ui'), emits)

const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, id, color, size: formGroupSize, name, highlight, disabled, ariaAttrs } = useFormField<InputTimeProps>(props)
const { orientation, size: fieldGroupSize } = useFieldGroup<InputTimeProps>(props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props)

const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value)

const isTag = computed(() => {
  return props.tag
})

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.inputTime || {}) })({
  color: color.value,
  size: inputSize.value,
  loading: props.loading,
  highlight: highlight.value,
  rounded: Boolean(props.rounded),
  noPadding: Boolean(props.noPadding),
  noBorder: Boolean(props.noBorder),
  underline: Boolean(props.underline),
  leading: Boolean(isLeading.value || !!props.avatar || !!slots.leading),
  trailing: Boolean(isTrailing.value || !!slots.trailing),
  fieldGroup: orientation.value
}))

const inputsRef = ref<ComponentPublicInstance[]>([])

function setInputRef(index: number, el: Element | ComponentPublicInstance | null) {
  // @ts-expect-error - ComponentPublicInstance type mismatch in Nuxt module augmentation
  inputsRef.value[index] = el
}

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emits('change', event)

  emitFormChange()
  emitFormInput()
}

function onBlur(event: FocusEvent) {
  emitFormBlur()
  emits('blur', event)
}

function onFocus(event: FocusEvent) {
  emitFormFocus()
  emits('focus', event)
}

function autoFocus() {
  if (props.autofocus) {
    inputsRef.value[0]?.$el?.focus()
  }
}

onMounted(() => {
  setTimeout(() => {
    autoFocus()
  }, props.autofocusDelay)
})

defineExpose({
  inputsRef
})
</script>

<template>
  <TimeFieldRoot
    v-bind="{ ...rootProps, ...ariaAttrs }"
    :id="id"
    v-slot="{ segments }"
    :name="name"
    :disabled="disabled"
    data-slot="base"
    :class="b24ui.base({ class: [uiProp?.base, props.class] })"
    @update:model-value="onUpdate"
    @blur="onBlur"
    @focus="onFocus"
  >
    <B24Badge
      v-if="isTag"
      data-slot="tag"
      :class="b24ui.tag({ class: uiProp?.tag })"
      :color="props.tagColor"
      :label="props.tag"
      size="xs"
    />

    <TimeFieldInput
      v-for="(segment, index) in segments"
      :key="`${segment.part}-${index}`"
      :ref="el => setInputRef(index, el)"
      :part="segment.part"
      data-slot="segment"
      :class="b24ui.segment({ class: uiProp?.segment })"
    >
      {{ segment.value.trim() }}
    </TimeFieldInput>

    <slot :b24ui="b24ui" />

    <span v-if="isLeading || !!avatar || !!slots.leading" data-slot="leading" :class="b24ui.leading({ class: uiProp?.leading })">
      <slot name="leading" :b24ui="b24ui">
        <Component
          :is="leadingIconName"
          v-if="isLeading && leadingIconName"
          data-slot="leadingIcon"
          :class="b24ui.leadingIcon({ class: uiProp?.leadingIcon })"
        />
        <B24Avatar
          v-else-if="!!avatar"
          :size="((uiProp?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])"
          v-bind="avatar"
          data-slot="leadingAvatar"
          :class="b24ui.leadingAvatar({ class: uiProp?.leadingAvatar })"
        />
      </slot>
    </span>

    <span v-if="isTrailing || !!slots.trailing" data-slot="trailing" :class="b24ui.trailing({ class: uiProp?.trailing })">
      <slot name="trailing" :b24ui="b24ui">
        <Component
          :is="trailingIconName"
          v-if="trailingIconName"
          data-slot="trailingIcon"
          :class="b24ui.trailingIcon({ class: uiProp?.trailingIcon })"
        />
      </slot>
    </span>
  </TimeFieldRoot>
</template>
