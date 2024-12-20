<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/form-field'
import { tv } from '../utils/tv'

const appConfig = _appConfig as AppConfig & { b24ui: { formField: Partial<typeof theme> } }

const formField = tv({ extend: tv(theme), ...(appConfig.b24ui?.formField || {}) })

type FormFieldVariants = VariantProps<typeof formField>

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
  error?: string | boolean
  hint?: string
  size?: FormFieldVariants['size']
  required?: boolean
  eagerValidation?: boolean
  validateOnInputDelay?: number
  class?: any
  b24ui?: Partial<typeof formField.slots>
}

export interface FormFieldSlots {
  label(props: { label?: string }): any
  hint(props: { hint?: string }): any
  description(props: { description?: string }): any
  help(props: { help?: string }): any
  error(props: { error?: string | boolean }): any
  default(props: { error?: string | boolean }): any
}
</script>

<script setup lang="ts">
import { computed, ref, inject, provide, type Ref, useId } from 'vue'
import { Primitive, Label } from 'reka-ui'
import { formFieldInjectionKey, inputIdInjectionKey } from '../composables/useFormField'
import type { FormError, FormFieldInjectedOptions } from '../types/form'

const props = defineProps<FormFieldProps>()
const slots = defineSlots<FormFieldSlots>()

const b24ui = computed(() => formField({
  size: props.size,
  required: props.required
}))

const formErrors = inject<Ref<FormError[]> | null>('form-errors', null)

const error = computed(() => props.error || formErrors?.value?.find(error => error.name === props.name || (props.errorPattern && error.name.match(props.errorPattern)))?.message)

const id = ref(useId())

provide(inputIdInjectionKey, id)

provide(formFieldInjectionKey, computed(() => ({
  error: error.value,
  name: props.name,
  size: props.size,
  eagerValidation: props.eagerValidation,
  validateOnInputDelay: props.validateOnInputDelay,
  errorPattern: props.errorPattern
}) as FormFieldInjectedOptions<FormFieldProps>))
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <div :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
      <div v-if="label || !!slots.label" :class="b24ui.labelWrapper({ class: props.b24ui?.labelWrapper })">
        <Label :for="id" :class="b24ui.label({ class: props.b24ui?.label })">
          <slot name="label" :label="label">
            {{ label }}
          </slot>
        </Label>
        <span v-if="hint || !!slots.hint" :class="b24ui.hint({ class: props.b24ui?.hint })">
          <slot name="hint" :hint="hint">
            {{ hint }}
          </slot>
        </span>
      </div>

      <p v-if="description || !!slots.description" :class="b24ui.description({ class: props.b24ui?.description })">
        <slot name="description" :description="description">
          {{ description }}
        </slot>
      </p>
    </div>

    <div :class="[(label || !!slots.label || description || !!slots.description) && b24ui.container({ class: props.b24ui?.container })]">
      <slot :error="error" />

      <p v-if="(typeof error === 'string' && error) || !!slots.error" :class="b24ui.error({ class: props.b24ui?.error })">
        <slot name="error" :error="error">
          {{ error }}
        </slot>
      </p>
      <p v-else-if="help || !!slots.help" :class="b24ui.help({ class: props.b24ui?.help })">
        <slot name="help" :help="help">
          {{ help }}
        </slot>
      </p>
    </div>
  </Primitive>
</template>
