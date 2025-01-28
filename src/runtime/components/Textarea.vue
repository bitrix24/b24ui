<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/textarea'
import { tv } from '../utils/tv'

const appConfigTextarea = _appConfig as AppConfig & { b24ui: { textarea: Partial<typeof theme> } }

const textarea = tv({ extend: tv(theme), ...(appConfigTextarea.b24ui?.textarea || {}) })

type TextareaVariants = VariantProps<typeof textarea>

export interface TextareaProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  id?: string
  name?: string
  /** The placeholder text when the textarea is empty. */
  placeholder?: string
  color?: TextareaVariants['color']
  /** Removes padding from input. */
  noPadding?: boolean
  /** removes all borders (rings). */
  noBorder?: boolean
  /** removes all borders (rings) except the bottom one. */
  underline?: boolean
  /** Rounds the corners of the button. */
  rounded?: boolean
  required?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  disabled?: boolean
  rows?: number
  maxrows?: number
  autoresize?: boolean
  tag?: string
  tagColor?: TextareaVariants['tagColor']
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  class?: any
  b24ui?: Partial<typeof textarea.slots>
}

export interface TextareaEmits {
  (e: 'update:modelValue', payload: string | number): void
  (e: 'blur', event: FocusEvent): void
  (e: 'change', event: Event): void
}

export interface TextareaSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { Primitive } from 'reka-ui'
import { useFormField } from '../composables/useFormField'
import { looseToNumber } from '../utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TextareaProps>(), {
  rows: 3,
  maxrows: 5,
  autofocusDelay: 0
})
defineSlots<TextareaSlots>()
const emits = defineEmits<TextareaEmits>()

const [modelValue, modelModifiers] = defineModel<string | number>()

const { emitFormFocus, emitFormBlur, emitFormInput, emitFormChange, color, id, name, highlight, disabled, ariaAttrs } = useFormField<TextareaProps>(props, { deferInputValidation: true })

const isTag = computed(() => {
  return props.tag
})

const b24ui = computed(() => textarea({
  color: color.value,
  highlight: highlight.value,
  tagColor: props.tagColor,
  rounded: Boolean(props.rounded),
  noPadding: Boolean(props.noPadding),
  noBorder: Boolean(props.noBorder),
  underline: Boolean(props.underline)
}))

const textareaRef = ref<HTMLTextAreaElement | null>(null)

function autoFocus() {
  if (props.autofocus) {
    textareaRef.value?.focus()
  }
}

// Custom function to handle the v-model properties
function updateInput(value: string) {
  if (modelModifiers.trim) {
    value = value.trim()
  }

  if (modelModifiers.number) {
    value = looseToNumber(value)
  }

  modelValue.value = value
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

onMounted(() => {
  setTimeout(() => {
    autoFocus()
  }, props.autofocusDelay)
})

function autoResize() {
  if (props.autoresize) {
    if (!textareaRef.value) {
      return
    }

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

defineExpose({
  textareaRef
})

onMounted(() => {
  setTimeout(() => {
    autoResize()
  }, 100)
})
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
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
  </Primitive>
</template>
