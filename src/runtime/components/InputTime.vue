<script lang="ts">
import type { ComponentPublicInstance, VNode } from 'vue'
import type { TimeFieldRootEmits, TimeFieldRootProps, TimeRangeFieldRootEmits, TimeRangeFieldRootProps, TimeValue, SegmentPart } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/input-time'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, BadgeProps, IconComponent } from '../types'
import type { ComponentConfig } from '../types/tv'

type InputTime = ComponentConfig<typeof theme, AppConfig, 'inputTime'>

type InputTimeDefaultValue<R extends boolean = false> = R extends true
  ? TimeRangeFieldRootProps['defaultValue']
  : TimeFieldRootProps['defaultValue']

type InputTimeModelValue<R extends boolean = false> = (R extends true
  ? TimeRangeFieldRootProps['modelValue']
  : TimeFieldRootProps['modelValue']) | undefined

type _TimeFieldRootProps = Omit<TimeFieldRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale'>
type _TimeRangeFieldRootProps = Omit<TimeRangeFieldRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale'>

/**
 * @memo: we not use variant
 */
export interface InputTimeProps<R extends boolean = false> extends UseComponentIconsProps, _TimeFieldRootProps, _TimeRangeFieldRootProps {
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
  /** Keep the mobile text size on all breakpoints. (Left for backward compatibility.) */
  fixed?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  /**
   * The icon to use as a range separator.
   * @defaultValue icons.minus
   * @IconComponent
   */
  separatorIcon?: IconComponent
  /**
   * Enable time range selection.
   * @defaultValue false
   */
  range?: R & boolean
  /** The value of the input when initially rendered. Use when you do not need to control the state of the input. */
  defaultValue?: InputTimeDefaultValue<R>
  /** The controlled value of the input. Can be bind as `v-model`. */
  modelValue?: InputTimeModelValue<R>
  class?: any
  b24ui?: InputTime['slots']
}

export interface InputTimeEmits<R extends boolean = false> extends Omit<TimeFieldRootEmits & TimeRangeFieldRootEmits, 'update:modelValue'> {
  'update:modelValue': [value: InputTimeModelValue<R>]
  'change': [event: Event]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
}

export interface InputTimeSlots {
  leading?(props: { b24ui: InputTime['b24ui'] }): VNode[]
  default?(props: { b24ui: InputTime['b24ui'] }): VNode[]
  trailing?(props: { b24ui: InputTime['b24ui'] }): VNode[]
  separator?(props: { b24ui: InputTime['b24ui'] }): VNode[]
}
</script>

<script setup lang="ts" generic="R extends boolean">
import { computed, onMounted, ref } from 'vue'
import { TimeRangeFieldRoot, TimeRangeFieldInput, useForwardPropsEmits } from 'reka-ui'
import { TimeField as SingleTimeField } from 'reka-ui/namespaced'
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

const props = withDefaults(defineProps<InputTimeProps<R>>(), {
  autofocusDelay: 0
})
const emits = defineEmits<InputTimeEmits<R>>()
const slots = defineSlots<InputTimeSlots>()

const appConfig = useAppConfig() as InputTime['AppConfig']
const uiProp = useComponentUI('inputTime', props)

/** @memo we not use `variant`, `leading`, `leadingIcon`, `trailing` and `loadingIcon` */
const rootProps = useForwardPropsEmits(reactiveOmit(props, 'id', 'name', 'range', 'modelValue', 'defaultValue', 'color', 'size', 'highlight', 'fixed', 'disabled', 'autofocus', 'autofocusDelay', 'icon', 'avatar', 'trailing', 'trailingIcon', 'loading', 'separatorIcon', 'class', 'b24ui'), emits)

const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, id, color, size: formFieldSize, name, highlight, disabled, ariaAttrs } = useFormField<InputTimeProps<R>>(props)
const { orientation, size: fieldGroupSize } = useFieldGroup<InputTimeProps<R>>(props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props)

const inputSize = computed(() => fieldGroupSize.value || formFieldSize.value)

const isTag = computed(() => {
  return props.tag
})

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.inputTime || {}) })({
  color: color.value,
  size: inputSize.value,
  loading: props.loading,
  highlight: highlight.value,
  fixed: props.fixed,
  rounded: Boolean(props.rounded),
  noPadding: Boolean(props.noPadding),
  noBorder: Boolean(props.noBorder),
  underline: Boolean(props.underline),
  leading: Boolean(isLeading.value || !!props.avatar || !!slots.leading),
  trailing: Boolean(isTrailing.value || !!slots.trailing),
  fieldGroup: orientation.value
}))

const [DefineSegmentsTemplate, ReuseSegmentsTemplate] = createReusableTemplate<{
  segments?: { part: SegmentPart, value: string }[]
  type?: 'start' | 'end'
}>()

const inputsRef = ref<ComponentPublicInstance[]>([])

// FIXME: Move to namespaced when exported in `reka-ui`
const RangeTimeField = { Root: TimeRangeFieldRoot, Input: TimeRangeFieldInput }

const TimeField = computed(() => props.range ? RangeTimeField : SingleTimeField)

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
  <DefineSegmentsTemplate v-slot="{ segments, type }">
    <TimeField.Input
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
    </TimeField.Input>
  </DefineSegmentsTemplate>

  <TimeField.Root
    v-bind="{ ...rootProps, ...$attrs, ...ariaAttrs }"
    :id="id"
    v-slot="{ segments }"
    :name="name"
    :disabled="disabled"
    :model-value="(modelValue as TimeValue)"
    :default-value="(defaultValue as TimeValue)"
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
        <Component :is="separatorIcon || icons.minus" data-slot="separatorIcon" :class="b24ui.separatorIcon({ class: uiProp?.separatorIcon })" />
      </slot>
      <ReuseSegmentsTemplate :segments="segments.end" type="end" />
    </template>

    <slot :b24ui="b24ui" />

    <span v-if="isLeading || !!avatar || !!slots.leading" data-slot="leading" :class="b24ui.leading({ class: uiProp?.leading })">
      <slot name="leading" :b24ui="b24ui">
        <Component :is="leadingIconName" v-if="isLeading && leadingIconName" data-slot="leadingIcon" :class="b24ui.leadingIcon({ class: uiProp?.leadingIcon })" />
        <B24Avatar v-else-if="!!avatar" :size="((uiProp?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])" v-bind="avatar" data-slot="leadingAvatar" :class="b24ui.leadingAvatar({ class: uiProp?.leadingAvatar })" />
      </slot>
    </span>

    <span v-if="isTrailing || !!slots.trailing" data-slot="trailing" :class="b24ui.trailing({ class: uiProp?.trailing })">
      <slot name="trailing" :b24ui="b24ui">
        <Component :is="trailingIconName" v-if="trailingIconName" data-slot="trailingIcon" :class="b24ui.trailingIcon({ class: uiProp?.trailingIcon })" />
      </slot>
    </span>
  </TimeField.Root>
</template>
