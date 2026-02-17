<script lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type { DateFieldRootProps, DateFieldRootEmits, DateRangeFieldRootProps, DateRangeFieldRootEmits, DateValue, SegmentPart } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, BadgeProps, IconComponent } from '../types'
import type { ComponentConfig } from '../types/tv'
import theme from '#build/b24ui/input-date'

type InputDate = ComponentConfig<typeof theme, AppConfig, 'inputDate'>

type _DateFieldRootProps = Omit<DateFieldRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale'>
type _RangeDateFieldRootProps = Omit<DateRangeFieldRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale'>

type InputDateDefaultValue<R extends boolean = false> = R extends true ? DateRangeFieldRootProps['defaultValue'] : DateFieldRootProps['defaultValue']
type InputDateModelValue<R extends boolean = false> = (R extends true ? DateRangeFieldRootProps['modelValue'] : DateFieldRootProps['modelValue']) | undefined

export interface InputDateProps<R extends boolean = false> extends UseComponentIconsProps, _DateFieldRootProps, _RangeDateFieldRootProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * @defaultValue 'air-primary'
   */
  color?: InputDate['variants']['color']
  /**
   * @defaultValue 'md'
   */
  size?: InputDate['variants']['size']
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
  /**
   * The icon to use as a range separator.
   * @defaultValue icons.minus
   * @IconComponent
   */
  separatorIcon?: IconComponent
  /** Whether or not a range of dates can be selected */
  range?: R & boolean
  defaultValue?: InputDateDefaultValue<R>
  modelValue?: InputDateModelValue<R>
  class?: any
  b24ui?: InputDate['slots']
}

export interface InputDateEmits<R extends boolean> extends Omit<DateFieldRootEmits & DateRangeFieldRootEmits, 'update:modelValue'> {
  'update:modelValue': [date: InputDateModelValue<R>]
  'change': [event: Event]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
}

export interface InputDateSlots {
  leading(props: { b24ui: InputDate['b24ui'] }): any
  default(props: { b24ui: InputDate['b24ui'] }): any
  trailing(props: { b24ui: InputDate['b24ui'] }): any
  separator(props: { b24ui: InputDate['b24ui'] }): any
}
</script>

<script setup lang="ts" generic="R extends boolean">
import { computed, onMounted, ref } from 'vue'
import { useForwardPropsEmits } from 'reka-ui'
import { DateField as SingleDateField, DateRangeField as RangeDateField } from 'reka-ui/namespaced'
import { reactiveOmit, createReusableTemplate } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { useFieldGroup } from '../composables/useFieldGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFormField } from '../composables/useFormField'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Badge from './Badge.vue'
import B24Avatar from './Avatar.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputDateProps<R>>(), {
  autofocusDelay: 0
})
const emits = defineEmits<InputDateEmits<R>>()
const slots = defineSlots<InputDateSlots>()

const appConfig = useAppConfig() as InputDate['AppConfig']
const uiProp = useComponentUI('inputDate', props)

const rootProps = useForwardPropsEmits(reactiveOmit(props, 'id', 'name', 'range', 'modelValue', 'defaultValue', 'color', 'size', 'highlight', 'disabled', 'autofocus', 'autofocusDelay', 'icon', 'avatar', 'trailingIcon', 'loading', 'separatorIcon', 'class', 'b24ui'), emits)
const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, size: formGroupSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField<InputDateProps<R>>(props)
const { orientation, size: fieldGroupSize } = useFieldGroup<InputDateProps<R>>(props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props)

const [DefineSegmentsTemplate, ReuseSegmentsTemplate] = createReusableTemplate<{
  segments?: { part: SegmentPart, value: string }[]
  type?: 'start' | 'end'
}>()

const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value)

const isTag = computed(() => {
  return props.tag
})

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.inputDate || {}) })({
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

const DateField = computed(() => props.range ? RangeDateField : SingleDateField)

defineExpose({
  inputsRef
})
</script>

<template>
  <DefineSegmentsTemplate v-slot="{ segments, type }">
    <DateField.Input
      v-for="(segment, index) in segments"
      :key="`${segment.part}-${index}`"
      :ref="el => setInputRef(index, el)"
      :type="type"
      :part="segment.part"
      data-slot="segment"
      :class="b24ui.segment({ class: uiProp?.segment })"
      :data-segment="segment.part"
    >
      {{ segment.value.trim() }}
    </DateField.Input>
  </DefineSegmentsTemplate>

  <DateField.Root
    v-bind="{ ...rootProps, ...$attrs, ...ariaAttrs }"
    :id="id"
    v-slot="{ segments }"
    :model-value="(modelValue as DateValue)"
    :default-value="(defaultValue as DateValue)"
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

    <template v-if="Array.isArray(segments)">
      <ReuseSegmentsTemplate :segments="segments" />
    </template>
    <template v-else>
      <ReuseSegmentsTemplate :segments="segments.start" type="start" />
      <slot name="separator" :b24ui="b24ui">
        <Component
          :is="separatorIcon || icons.minus"
          data-slot="separatorIcon"
          :class="b24ui.separatorIcon({ class: uiProp?.separatorIcon })"
        />
      </slot>
      <ReuseSegmentsTemplate :segments="segments.end" type="end" />
    </template>

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
  </DateField.Root>
</template>
