import { inject, computed, provide, getCurrentScope, onScopeDispose } from 'vue'
import type { InjectionKey, Ref, ComputedRef } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import type { UseEventBusReturn } from '@vueuse/core'
import type { FormFieldProps } from '../components/FormField.vue'
import type { FormErrorWithId, FormEvent, FormInputEvents, FormFieldInjectedOptions, FormInjectedOptions } from '../types/form'
import type { GetObjectField } from '../types/utils'

type Props<T> = {
  id?: string
  name?: string
  size?: GetObjectField<T, 'size'>
  color?: GetObjectField<T, 'color'>
  highlight?: boolean
  disabled?: boolean
}

/** `Form`'s own settings — `disabled`, validation timing — read by every field under it. */
export const formOptionsInjectionKey: InjectionKey<ComputedRef<FormInjectedOptions>> = Symbol('bitrix24-ui.form-options')
/** The bus a `Form` and its fields talk over: blur, input, change, focus, and validation requests. */
export const formBusInjectionKey: InjectionKey<UseEventBusReturn<FormEvent<any>, string>> = Symbol('bitrix24-ui.form-events')
/** The `Form`'s `state` object, so a field can read the value it is bound to without a prop. */
export const formStateInjectionKey: InjectionKey<ComputedRef<Record<string, any> | undefined>> = Symbol('bitrix24-ui.form-state')
/** What a `FormField` tells the control inside it: `name`, `size`, `error`, and the ids for aria wiring. */
export const formFieldInjectionKey: InjectionKey<ComputedRef<FormFieldInjectedOptions<FormFieldProps>> | undefined> = Symbol('bitrix24-ui.form-field')
/** The id a `FormField` minted for its control, so `<label for>` and the control agree on one. */
export const inputIdInjectionKey: InjectionKey<Ref<string | undefined>> = Symbol('bitrix24-ui.input-id')
/** Every control registered with the `Form`, keyed by `name` — how `validate()` finds the field to focus. */
export const formInputsInjectionKey: InjectionKey<Ref<Record<string, { id?: string, pattern?: RegExp }>>> = Symbol('bitrix24-ui.form-inputs')
/** Whether the `Form`'s submit handler is still running; disables controls without each one being told. */
export const formLoadingInjectionKey: InjectionKey<Readonly<Ref<boolean>>> = Symbol('bitrix24-ui.form-loading')
/** The `Form`'s current validation errors, so a field can find its own by `name` or `errorPattern`. */
export const formErrorsInjectionKey: InjectionKey<Readonly<Ref<FormErrorWithId[]>>> = Symbol('bitrix24-ui.form-errors')

/**
 * Wires an input to its wrapping `<B24FormField>` (id/name/aria, validation events, error-driven color).
 *
 * **Always pass the raw `_props`, never the `useComponentProps` proxy.**
 * The internal fallback `props?.x ?? formField?.value.x` must distinguish
 * "explicit prop" from "theme default" — passing the proxy would leak
 * `<B24Theme :props>` defaults into the explicit slot and let theme size/color
 * silently override the wrapping field (regression-tested in `Theme.spec.ts`).
 *
 * To get `<B24Theme :props>` to apply when no `<B24FormField>` wraps the input,
 * fall back to the proxy at the `tv()` call site:
 *
 * ```ts
 * size: size.value ?? props.size,
 * color: color.value ?? props.color,
 * highlight: highlight.value ?? props.highlight,
 * disabled: disabled.value ?? props.disabled
 * ```
 *
 * `highlight` and `disabled` are Boolean props, which Vue auto-casts to `false`
 * when unset, so they are normalized back to `undefined` here. Otherwise the
 * `??` above would short-circuit on `false` and the proxy would never be read.
 *
 * Final precedence: `explicit > FormField > <B24Theme :props> > app.config > withDefaults > tv defaults`,
 * matching what `useComponentProps` resolves.
 *
 * `bitrix24-ui/no-unresolved-form-field-refs` (see `eslint.config.mjs`) enforces
 * the fallback at every read site, in script and in template — in a template a
 * ref auto-unwraps, so an unresolved binding is indistinguishable from a
 * resolved one by eye.
 */
export function useFormField<T>(props?: Props<T>, opts?: { bind?: boolean, deferInputValidation?: boolean }) {
  const formOptions = inject(formOptionsInjectionKey, undefined)
  const formBus = inject(formBusInjectionKey, undefined)
  const formField = inject(formFieldInjectionKey, undefined)
  const inputId = inject(inputIdInjectionKey, undefined)

  // Blocks the FormField injection to avoid duplicating events when nesting input components.
  provide(formFieldInjectionKey, undefined)

  if (formField && inputId) {
    if (opts?.bind === false) {
      // Removes for="..." attribute on label for RadioGroup and alike.
      inputId.value = undefined
    } else if (props?.id) {
      // Updates for="..." attribute on label if props.id is provided.
      inputId.value = props?.id
    }
  }

  function emitFormEvent(type: FormInputEvents, name?: string, eager?: boolean) {
    if (formBus && formField && name) {
      formBus.emit({ type, name, eager })
    }
  }

  function emitFormBlur() {
    emitFormEvent('blur', formField?.value.name)
  }

  function emitFormFocus() {
    emitFormEvent('focus', formField?.value.name)
  }

  function emitFormChange() {
    emitFormEvent('change', formField?.value.name)
  }

  // The trailing call still fires after teardown, which would validate a field
  // that is no longer rendered when the input unmounts inside the debounce window.
  let disposed = false
  if (getCurrentScope()) {
    onScopeDispose(() => {
      disposed = true
    })
  }

  const emitFormInput = useDebounceFn(
    () => {
      if (disposed) return

      emitFormEvent('input', formField?.value.name, !opts?.deferInputValidation || formField?.value.eagerValidation)
    },
    formField?.value.validateOnInputDelay ?? formOptions?.value.validateOnInputDelay ?? 0
  )

  return {
    id: computed(() => props?.id ?? inputId?.value),
    name: computed(() => props?.name ?? formField?.value.name),
    size: computed(() => props?.size ?? formField?.value.size),
    color: computed(() => formField?.value.error ? 'air-primary-alert' : props?.color),
    highlight: computed(() => formField?.value.error ? true : (props?.highlight || undefined)),
    disabled: computed(() => formOptions?.value.disabled || props?.disabled || undefined),
    emitFormBlur,
    emitFormInput,
    emitFormChange,
    emitFormFocus,
    ariaAttrs: computed(() => {
      if (!formField?.value) return

      const descriptiveAttrs = ['error' as const, 'hint' as const, 'description' as const, 'help' as const]
        .filter(type => formField?.value?.[type])
        .map(type => `${formField?.value.ariaId}-${type}`) || []

      const attrs: Record<string, any> = {
        'aria-invalid': !!formField?.value.error
      }

      if (descriptiveAttrs.length > 0) {
        attrs['aria-describedby'] = descriptiveAttrs.join(' ')
      }

      return attrs
    })
  }
}
