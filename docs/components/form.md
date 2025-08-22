---
title: Form
description: A form component designed for validation and handling submissions.
outline: deep
---
<script setup>
import FormExample from '/examples/form/FormExample.vue';
import ElementsExample from '/examples/form/FormExampleElementsWrap.vue';
import OnErrorExample from '/examples/form/FormExampleOnError.vue';
import NestedExample from '/examples/form/FormExampleNested.vue';
import NestedListExample from '/examples/form/FormExampleNestedList.vue';
</script>
# Form

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/form"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Form.vue"
  demo="/components/form"
>
  A form component designed for validation and handling submissions.
</Description>

## Usage

Use the Form component to validate form data using validation libraries such as [Valibot](https://github.com/fabian-hiller/valibot), [Zod](https://github.com/colinhacks/zod), [Yup](https://github.com/jquense/yup), [Joi](https://github.com/hapijs/joi), [Superstruct](https://github.com/ianstormtaylor/superstruct) or your own validation logic.

It works with the [FormField](/components/form-field) component to display error messages around form elements automatically.

### Schema Validation

It requires two props:

- `state` - a reactive object holding the form's state.
- `schema` - any [Standard Schema](https://standardschema.dev/) or a schema from [Yup](https://github.com/jquense/yup), [Joi](https://github.com/hapijs/joi) or [Superstruct](https://github.com/ianstormtaylor/superstruct).

::: warning
**No validation library is included** by default, ensure you **install the one you need**.
:::

Errors are reported directly to the [FormField](/components/form-field) component based on the `name` or `error-pattern` prop. This means the validation rules defined for the `email` attribute in your schema will be applied to `<FormField name="email">`{lang="vue"}.

Nested validation rules are handled using dot notation. For example, a rule like `{ user: z.object({ email: z.string() }) }`{lang="ts"} will be applied to `<FormField name="user.email">`{lang="vue"}.

### Custom Validation

Use the `validate` prop to apply your own validation logic.

The validation function must return a list of errors with the following attributes:

- `message` - the error message to display.
- `name` - the `name` of the `FormField` to send the error to.

::: info
It can be used alongside the `schema` prop to handle complex use cases.
:::

<div>
  <ClientOnly>
    <ComponentShowExample>
      <FormExample base="/b24ui" class="w-full sm:w-2/3" />
    </ComponentShowExample>
  </ClientOnly>
</div>

::: details
<<< @/examples/form/FormExample.vue{vue:line-numbers}
:::

### Input Events

The Form component automatically triggers validation when an input emits an `input`, `change`, or `blur` event.

- Validation on `input` occurs **as you type**.
- Validation on `change` occurs when you **commit to a value**.
- Validation on `blur` happens when an input **loses focus**.

You can control when validation happens this using the `validate-on` prop.

::: tip
The form always validates on submit.
:::

::: tip
You can use the [`useFormField`](/components/composables/use-form-field) composable to implement this inside your own components.
:::

<div>
  <ClientOnly>
      <ElementsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/form/FormExampleElements.vue{vue:line-numbers}
:::

### Error Event

You can listen to the `@error` event to handle errors. This event is triggered when the form is submitted and contains an array of `FormError` objects with the following fields:

- `id` - the input's `id`.
- `name` - the `name` of the `FormField`
- `message` - the error message to display.

Here's an example that focuses the first input element with an error after the form is submitted:

<div>
  <ClientOnly>
    <ComponentShowExample>
      <OnErrorExample class="w-full sm:w-2/3" />
    </ComponentShowExample>
  </ClientOnly>
</div>

::: details
<<< @/examples/form/FormExampleOnError.vue{vue:line-numbers}
:::

### Nesting Forms

Nesting form components allows you to manage complex data structures, such as lists or conditional fields, more efficiently.

For example, it can be used to dynamically add fields based on user's input:

<div>
  <ClientOnly>
    <ComponentShowExample>
      <NestedExample class="w-full sm:w-2/3" />
    </ComponentShowExample>
  </ClientOnly>
</div>

::: details
<<< @/examples/form/FormExampleNested.vue{vue:line-numbers}
:::

Or to validate list inputs:

<div>
  <ClientOnly>
    <ComponentShowExample>
      <NestedListExample class="w-full sm:w-2/3" />
    </ComponentShowExample>
  </ClientOnly>
</div>

::: details
<<< @/examples/form/FormExampleNestedList.vue{vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Form" />

### Slots

<ComponentSlots component="Form" />

### Emits

```ts
/**
 * Emitted events for the Form component
 */
interface FormEmits {
  error: (payload: [payload: FormErrorEvent]) => void;
  submit: (payload: [payload: FormSubmitEvent<any>]) => void;
}
```

### Expose

You can access the typed component instance using [`useTemplateRef`](https://vuejs.org/api/composition-api-helpers.html#usetemplateref).

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue'

const form = useTemplateRef('form')

async function makeValidate() {
  if (!form.value) {
    return
  }

  try {
    const state = await form.value.validate({
      silent: false
    })

    console.log(state)
  } catch (error) {
    console.log(
      `Some error ${error}`,
      error?.formId
        ? {
          formId: error.formId,
          errors: error?.errors
        }
        : '?'
    )
  }
}

function makeClear() {
  if (!form.value) {
    return
  }

  form.value.clear()
}
</script>

<template>
  <B24Form ref="form" />

  <div class="flex flex-row gap-4 items-center justify-between">
    <B24Button
      label="Validate"
      @click="makeValidate"
    />
    <B24Button
      label="Clear"
      @click="makeClear"
    />
  </div>
</template>
```

This will give you access to the following:

| Name                                                                                                                    | Type                                                                                                                                                     |
|-------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `submit()`{lang="ts"}                                                                                                   | `Promise<void>`{lang="ts"} <br> <p>Triggers form submission.</p>                                                                                         |
| `validate(opts: { name?: keyof T \| (keyof T)[], silent?: boolean, nested?: boolean, transform?: boolean })`{lang="ts"} | `Promise<T>`{lang="ts"} <br> <p>Triggers form validation. Will raise any errors unless `opts.silent` is set to true.</p>                                 |
| `clear(path?: keyof T \| RegExp)`{lang="ts"}                                                                            | `void` <br> <p>Clears form errors associated with a specific path. If no path is provided, clears all form errors.</p>                                   |
| `getErrors(path?: keyof T \| RegExp)`{lang="ts"}                                                                        | `FormError[]`{lang="ts"} <br> <p>Retrieves form errors associated with a specific path. If no path is provided, returns all form errors.</p>             |
| `setErrors(errors: FormError[], name?: keyof T \| RegExp)`{lang="ts"}                                                   | `void` <br> <p>Sets form errors for a given path. If no path is provided, overrides all errors.</p>                                                      |
| `errors`{lang="ts"}                                                                                                     | `Ref<FormError[]>`{lang="ts"} <br> <p>A reference to the array containing validation errors. Use this to access or manipulate the error information.</p> |
| `disabled`{lang="ts"}                                                                                                   | `Ref<boolean>`{lang="ts"}                                                                                                                                |
| `dirty`{lang="ts"}                                                                                                      | `Ref<boolean>`{lang="ts"} `true` if at least one form field has been updated by the user.                                                                |
| `dirtyFields`{lang="ts"}                                                                                                | `DeepReadonly<Set<keyof T>>`{lang="ts"} Tracks fields that have been modified by the user.                                                               |
| `touchedFields`{lang="ts"}                                                                                              | `DeepReadonly<Set<keyof T>>`{lang="ts"} Tracks fields that the user interacted with.                                                                     |
| `blurredFields`{lang="ts"}                                                                                              | `DeepReadonly<Set<keyof T>>`{lang="ts"} Tracks fields blurred by the user.                                                                               |
