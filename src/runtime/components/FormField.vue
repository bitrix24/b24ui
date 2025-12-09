<script lang="ts">
import type { Ref } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/form-field'
import type { ComponentConfig } from '../types/tv'

type FormField = ComponentConfig<typeof theme, AppConfig, 'formField'>

export interface FormFieldProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /** The name of the FormField. Also used to match form errors. */
  name?: string
  /** A regular expression to match form error names. */
  errorPattern?: RegExp
  label?: string
  description?: string
  help?: string
  error?: boolean | string
  hint?: string
  /**
   * @defaultValue 'md'
   */
  size?: FormField['variants']['size']
  /**
   * @defaultValue false
   */
  required?: boolean
  /** If true, validation on input will be active immediately instead of waiting for a blur event. */
  eagerValidation?: boolean
  /**
   * Delay in milliseconds before validating the form on input events.
   * @defaultValue `300`
   */
  validateOnInputDelay?: number
  class?: any
  b24ui?: FormField['slots']
}

export interface FormFieldSlots {
  label(props: { label?: string }): any
  hint(props: { hint?: string }): any
  description(props: { description?: string }): any
  help(props: { help?: string }): any
  error(props: { error?: boolean | string }): any
  default(props: { error?: boolean | string }): any
}
</script>

<script setup lang="ts">
import { computed, ref, inject, provide, useId, watch } from 'vue'
import { Primitive, Label } from 'reka-ui'
import { useAppConfig } from '#imports'
import { formFieldInjectionKey, inputIdInjectionKey, formErrorsInjectionKey, formInputsInjectionKey } from '../composables/useFormField'
import { tv } from '../utils/tv'
import type { FormError, FormFieldInjectedOptions } from '../types/form'
import WarningIcon from '@bitrix24/b24icons-vue/main/WarningIcon'

const props = withDefaults(defineProps<FormFieldProps>(), {
  error: undefined
})
const slots = defineSlots<FormFieldSlots>()

const appConfig = useAppConfig() as FormField['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.formField || {}) })({
  size: props.size,
  required: props.required,
  useDescription: Boolean(props.description) || !!slots.description
}))

const formErrors = inject<Ref<FormError[]> | null>(formErrorsInjectionKey, null)

const error = computed(() => props.error || formErrors?.value?.find(error => error.name === props.name || (props.errorPattern && error.name?.match(props.errorPattern)))?.message)

const id = ref(useId())
// Copies id's initial value to bind aria-attributes such as aria-describedby.
// This is required for the RadioGroup component which unsets the id value.
const ariaId = id.value

const formInputs = inject(formInputsInjectionKey, undefined)
watch(id, () => {
  if (formInputs && props.name) {
    formInputs.value[props.name] = { id: id.value, pattern: props.errorPattern }
  }
}, { immediate: true })

provide(inputIdInjectionKey, id)

provide(formFieldInjectionKey, computed(() => ({
  error: error.value,
  name: props.name,
  size: props.size,
  eagerValidation: props.eagerValidation,
  validateOnInputDelay: props.validateOnInputDelay,
  errorPattern: props.errorPattern,
  hint: props.hint,
  description: props.description,
  help: props.help,
  ariaId
}) as FormFieldInjectedOptions<FormFieldProps>))
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div data-slot="wrapper" :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
      <div v-if="label || !!slots.label" data-slot="root" :class="b24ui.labelWrapper({ class: props.b24ui?.labelWrapper })">
        <Label :for="id" data-slot="label" :class="b24ui.label({ class: props.b24ui?.label })">
          <slot name="label" :label="label">
            {{ label }}
          </slot>
        </Label>
        <span v-if="hint || !!slots.hint" :id="`${ariaId}-hint`" data-slot="hint" :class="b24ui.hint({ class: props.b24ui?.hint })">
          <slot name="hint" :hint="hint">
            {{ hint }}
          </slot>
        </span>
      </div>

      <p v-if="description || !!slots.description" :id="`${ariaId}-description`" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
        <slot name="description" :description="description">
          {{ description }}
        </slot>
      </p>
    </div>

    <div data-slot="container" :class="[(label || !!slots.label || description || !!slots.description) && b24ui.container({ class: props.b24ui?.container })]">
      <slot :error="error" />

      <div v-if="props.error !== false && ((typeof error === 'string' && error) || !!slots.error)" :id="`${ariaId}-error`" data-slot="error" :class="b24ui.error({ class: props.b24ui?.error })">
        <slot name="error" :error="error">
          <div data-slot="errorWrapper" :class="b24ui.errorWrapper({ class: props.b24ui?.errorWrapper })">
            <WarningIcon data-slot="errorIcon" :class="b24ui.errorIcon()" />
            <div>{{ error }}</div>
          </div>
        </slot>
      </div>
      <div v-else-if="help || !!slots.help" :id="`${ariaId}-help`" data-slot="help" :class="b24ui.help({ class: props.b24ui?.help })">
        <slot name="help" :help="help">
          {{ help }}
        </slot>
      </div>
    </div>
  </Primitive>
</template>
