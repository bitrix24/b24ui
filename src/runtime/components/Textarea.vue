<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/textarea'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps } from '../types'
import type { AcceptableValue, ComponentConfig } from '../types/utils'

type Textarea = ComponentConfig<typeof theme, AppConfig, 'textarea'>

export interface TextareaProps extends UseComponentIconsProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  id?: string
  name?: string
  /**
   * The placeholder text when the textarea is empty
   */
  placeholder?: string
  /**
   * @defaultValue 'primary'
   */
  color?: Textarea['variants']['color']
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
   * Rounds the corners of the button
   * @defaultValue false
   */
  rounded?: boolean
  /**
   * @defaultValue false
   */
  required?: boolean
  /**
   * @defaultValue false
   */
  autofocus?: boolean
  /**
   * @defaultValue 0
   */
  autofocusDelay?: number
  /**
   * @defaultValue false
   */
  autoresize?: boolean
  /**
   * @defaultValue 0
   */
  autoresizeDelay?: number
  /**
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * @defaultValue 3
   */
  rows?: number
  /**
   * @defaultValue 5
   */
  maxrows?: number
  tag?: string
  /**
   * @defaultValue 'primary'
   */
  tagColor?: Textarea['variants']['tagColor']
  /**
   * Highlight the ring color like a focus state
   * @defaultValue false
   */
  highlight?: boolean
  class?: any
  b24ui?: Textarea['slots']
}

export interface TextareaEmits<T extends AcceptableValue = AcceptableValue> {
  (e: 'update:modelValue', payload: T): void
  (e: 'blur', event: FocusEvent): void
  (e: 'change', event: Event): void
}

export interface TextareaSlots {
  leading(props?: {}): any
  default(props?: {}): any
  trailing(props?: {}): any
}
</script>

<script setup lang="ts" generic="T extends AcceptableValue">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFormField } from '../composables/useFormField'
import { looseToNumber } from '../utils'
import { tv } from '../utils/tv'
import B24Avatar from './Avatar.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TextareaProps>(), {
  rows: 3,
  maxrows: 5,
  autofocusDelay: 0,
  autoresizeDelay: 0
})
const emits = defineEmits<TextareaEmits<T>>()
const slots = defineSlots<TextareaSlots>()

const [modelValue, modelModifiers] = defineModel<T>()

const appConfig = useAppConfig() as Textarea['AppConfig']

const { emitFormFocus, emitFormBlur, emitFormInput, emitFormChange, color, id, name, highlight, disabled, ariaAttrs } = useFormField<TextareaProps>(props, { deferInputValidation: true })
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props)

const isTag = computed(() => {
  return props.tag
})

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.textarea || {}) })({
  color: color.value,
  loading: props.loading,
  highlight: highlight.value,
  autoresize: Boolean(props.autoresize),
  tagColor: props.tagColor,
  rounded: Boolean(props.rounded),
  noPadding: Boolean(props.noPadding),
  noBorder: Boolean(props.noBorder),
  underline: Boolean(props.underline),
  leading: Boolean(isLeading.value || !!props.avatar || !!slots.leading),
  trailing: Boolean(isTrailing.value || !!slots.trailing)
}))

const textareaRef = ref<HTMLTextAreaElement | null>(null)

// Custom function to handle the v-model properties
function updateInput(value: string | null) {
  if (modelModifiers.trim) {
    value = value?.trim() ?? null
  }

  if (modelModifiers.number) {
    value = looseToNumber(value)
  }

  if (modelModifiers.nullify) {
    value ||= null
  }

  modelValue.value = value as T
  emitFormInput()
}

function onInput(event: Event) {
  autoResize()

  if (!modelModifiers.lazy) {
    updateInput((event.target as HTMLInputElement).value)
  }
}

function onChange(event: Event) {
  const value = (event.target as HTMLInputElement).value

  if (modelModifiers.lazy) {
    updateInput(value)
  }

  // Update trimmed textarea so that it has same behavior as native textarea https://github.com/vuejs/core/blob/5ea8a8a4fab4e19a71e123e4d27d051f5e927172/packages/runtime-dom/src/directives/vModel.ts#L63
  if (modelModifiers.trim) {
    (event.target as HTMLInputElement).value = value.trim()
  }

  emitFormChange()
  emits('change', event)
}

function onBlur(event: FocusEvent) {
  emitFormBlur()
  emits('blur', event)
}

function autoFocus() {
  if (props.autofocus) {
    textareaRef.value?.focus()
  }
}

function autoResize() {
  if (props.autoresize && textareaRef.value) {
    textareaRef.value.rows = props.rows
    const overflow = textareaRef.value.style.overflow
    textareaRef.value.style.overflow = 'hidden'

    const styles = window.getComputedStyle(textareaRef.value)
    const paddingTop = Number.parseInt(styles.paddingTop)
    const paddingBottom = Number.parseInt(styles.paddingBottom)
    const padding = paddingTop + paddingBottom
    const lineHeight = Number.parseInt(styles.lineHeight)
    const { scrollHeight } = textareaRef.value
    const newRows = (scrollHeight - padding) / lineHeight

    if (newRows > props.rows) {
      textareaRef.value.rows = props.maxrows ? Math.min(newRows, props.maxrows) : newRows
    }

    textareaRef.value.style.overflow = overflow
  }
}

watch(modelValue, () => {
  nextTick(autoResize)
})

onMounted(() => {
  setTimeout(() => {
    autoFocus()
  }, props.autofocusDelay)

  setTimeout(() => {
    autoResize()
  }, props.autoresizeDelay)
})

defineExpose({
  textareaRef
})
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div v-if="isTag" :class="b24ui.tag({ class: props.b24ui?.tag })">
      {{ props.tag }}
    </div>

    <textarea
      :id="id"
      ref="textareaRef"
      :value="modelValue"
      :name="name"
      :rows="rows"
      :placeholder="placeholder"
      :class="b24ui.base({ class: props.b24ui?.base })"
      :disabled="disabled"
      :required="required"
      v-bind="{ ...$attrs, ...ariaAttrs }"
      @input="onInput"
      @blur="onBlur"
      @change="onChange"
      @focus="emitFormFocus"
    />

    <slot />

    <span v-if="isLeading || !!avatar || !!slots.leading" :class="b24ui.leading({ class: props.b24ui?.leading })">
      <slot name="leading">
        <Component
          :is="leadingIconName"
          v-if="isLeading && leadingIconName"
          :class="b24ui.leadingIcon({ class: props.b24ui?.leadingIcon })"
        />
        <B24Avatar
          v-else-if="!!avatar"
          :size="((props.b24ui?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])"
          v-bind="avatar"
          :class="b24ui.leadingAvatar({ class: props.b24ui?.leadingAvatar })"
        />
      </slot>
    </span>

    <span v-if="isTrailing || !!slots.trailing" :class="b24ui.trailing({ class: props.b24ui?.trailing })">
      <slot name="trailing">
        <Component
          :is="trailingIconName"
          v-if="trailingIconName"
          :class="b24ui.trailingIcon({ class: props.b24ui?.trailingIcon })"
        />
      </slot>
    </span>
  </Primitive>
</template>
