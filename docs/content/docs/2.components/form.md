---
title: Form
description: A form component designed for validation and handling submissions.
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Form.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/form
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/form
---

## Usage

Use the Form component to validate form data using any validation library supporting [Standard Schema](https://github.com/standard-schema/standard-schema) such as [Valibot](https://github.com/fabian-hiller/valibot), [Zod](https://github.com/colinhacks/zod), [Regle](https://github.com/victorgarciaesgi/regle), [Yup](https://github.com/jquense/yup), [Joi](https://github.com/hapijs/joi) or [Superstruct](https://github.com/ianstormtaylor/superstruct) or your own validation logic.

It works with the [FormField](/docs/components/form-field/) component to display error messages around form elements automatically.

### Schema validation

It requires two props:

- `state` - a reactive object holding the form's state.
- `schema` - any [Standard Schema](https://github.com/standard-schema/standard-schema) or [Superstruct](https://github.com/ianstormtaylor/superstruct).

::warning
**No validation library is included** by default, ensure you **install the one you need**.
::

::tabs{class="gap-0"}
  ::component-example{label="Valibot"}
  ---
  name: 'form-example-valibot'
  props:
    class: 'w-60'
  ---
  ::

  ::component-example{label="Zod"}
  ---
  name: 'form-example-zod'
  props:
    class: 'w-60'
  ---
  ::

  ::component-example{label="Regle"}
  ---
  name: 'form-example-regle'
  props:
    class: 'w-60'
  ---
  ::

  ::component-example{label="Yup"}
  ---
  name: 'form-example-yup'
  props:
    class: 'w-60'
  ---
  ::

  ::component-example{label="Joi"}
  ---
  name: 'form-example-joi'
  props:
    class: 'w-60'
  ---
  ::

  ::component-example{label="Superstruct"}
  ---
  name: 'form-example-superstruct'
  props:
    class: 'w-60'
  ---
  ::
::

### Custom validation

Use the `validate` prop to apply your own validation logic.

The validation function must return a list of errors with the following attributes:

- `message` - the error message to display.
- `name` - the `name` of the `FormField` to send the error to.

::tip
It can be used alongside the `schema` prop to handle complex use cases.
::

::component-example
---
name: 'form-example-basic'
props:
  class: 'w-60'
---
::

### Error reporting

Errors are matched to the corresponding [FormField](/docs/components/form-field/) using its `name` prop. An error on the `email` field is shown by `<FormField name="email">`{lang="vue"}.

Nested fields are matched using dot notation. A schema like `{ user: z.object({ email: z.string() }) }`{lang="ts"} will be applied to `<FormField name="user.email">`{lang="vue"}.

::warning
Errors on array items include the index in their name (e.g. `tags.0`, `tags.1`) and won't match `<FormField name="tags">`{lang="vue"} by `name` alone. Use the `error-pattern` prop with a regular expression like `/^tags\..+/`{lang="ts"} to capture them. This is especially useful for components like [InputTags](/docs/components/input-tags/).
::

::component-example
---
name: 'form-example-error-pattern'
props:
  class: 'w-60'
---
::

### Input events

The Form component automatically triggers validation when an input emits an `input`, `change`, or `blur` event.

- Validation on `input` occurs **as you type**.
- Validation on `change` occurs when you **commit to a value**.
- Validation on `blur` happens when an input **loses focus**.

You can control when validation happens this using the `validate-on` prop.

::tip
The form always validates on submit.
::

::component-example{label="Default"}
---
source: false
name: 'form-example-elements'
options:
  - name: 'validate-on'
    label: 'validate-on'
    items:
    - 'input'
    - 'change'
    - 'blur'
    default:
    - 'input'
    - 'change'
    - 'blur'
    multiple: true
---
::

::tip
You can use the [`useFormField`](/docs/composables/use-form-field/) composable to implement this inside your own components.
::

### Error event

You can listen to the `@error` event to handle errors. This event is triggered when the form is submitted and contains an array of `FormError` objects with the following fields:

- `id` - the input's `id`.
- `name` - the `name` of the `FormField`
- `message` - the error message to display.

Here's an example that focuses the first input element with an error after the form is submitted:

::component-example
---
name: 'form-example-on-error'
collapse: true
props:
  class: 'w-60'
---
::

### HTML5 validation

When calling `form.submit()` programmatically, the Form component automatically triggers native HTML5 validation before submission.

::note
This is particularly useful when the submit button is outside the form element, such as in a modal footer.
::

::component-example
---
name: 'form-example-html5-validation'
props:
  class: 'w-60'
---
::


### Nesting forms

Use the `nested` prop to nest multiple Form components and link their validation functions. In this case, validating the parent form will automatically validate all the other forms inside it.

Nested forms directly inherit their parent's state, so you don't need to define a separate state for them. You can use the `name` prop to target a nested attribute within the parent's state.

It can be used to dynamically add fields based on user's input:

::component-example
---
collapse: true
name: 'form-example-nested'
---
::

Or to validate list inputs:

::component-example
---
collapse: true
name: 'form-example-nested-list'
---
::

### Record edit section

A common record-edit pattern (UF placement, slider context): a titled section with vertical-label fields, a two-column row for amount + currency, a nested "Client" sub-section, and a series of additional fields. Built entirely from `B24Form`, `B24FormField`, `B24Input`, `B24Select`, `B24InputNumber`, `B24InputDate`, `B24Popover` and `B24Calendar` — no custom components.

The full field set: Stage (`B24Select`), Amount and currency (`B24InputNumber` + `B24Select` in a two-column row), a "Client" group (Company + Contact `B24Input`s and an "Add participant" link), then Salutation (`B24Select`), Last name and First name (`B24Input`), Service type (`B24Select`) and Scheduled date (`B24InputDate` with a dropdown `B24Calendar` in a `B24Popover`).

The "Client" sub-section is just a `<div>` with a label above and a bordered container (`rounded-md border ... p-3 sm:p-4 space-y-4`) wrapping nested `B24FormField`s — `role="group"` + `aria-labelledby` associate the label with the group. The two-column "Amount and currency" row uses `grid-cols-1 sm:grid-cols-[1fr_auto]` so the currency drops below the amount on narrow viewports. `B24InputDate` binds an `@internationalized/date` value (not a native `Date`), so the schema types that field loosely.

::component-example
---
collapse: true
name: 'form-example-edit-section'
---
::

::prompt
---
description: Build a record-edit form section (slider / UF placement edit panel).
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
Lean on the `b24-ui-nuxt` skill (see `references/guidelines/forms.md` → "Record-edit form pattern") to build a record-edit form section — the titled edit panel used in Bitrix24 sliders and UF placements. Assemble it only from stock primitives (`B24Form`, `B24FormField`, `B24Input`, `B24Select`, `B24InputNumber`, `B24InputDate`, `B24Popover`, `B24Calendar`) under a single `:schema`; no custom components.

Before writing any code, ask me for the missing context — don't assume:
- Which record is being edited (deal, lead, order, ticket, contact…)? That decides the section title, the field set and the validation rules.
- Which fields belong in the section, in what order, and which are required? Group related ones (e.g. a "Client" sub-section) and flag any two-column rows (such as amount + currency).
- For each field, which control fits: enum → `B24Select` (list the options), free text → `B24Input`, number → `B24InputNumber`, date → `B24InputDate` with a dropdown `B24Calendar`.
- The header affordance: a title plus a single icon-only action on the right — confirm the icon and its `aria-label`.
- Locale, the default values used by the reset action, and what submit should do (toast, API call, close the slider).

Once those answers are in:
- Build the labelled sub-section as a `<div role="group" :aria-labelledby="...">` whose id comes from `useId()` (b24ui has no fieldset primitive).
- For a full-width `B24Select`, set both `class` (the trigger) and `:b24ui="{ root: 'w-full' }"` (the wrapper); `B24Input` / `B24InputNumber` need only `class="w-full"`.
- Type the date field loosely in the schema (`z.any().optional()`) — `B24InputDate` binds an `@internationalized/date` value, not a native `Date` — and pair the input with a `B24Calendar` in its `#trailing` `B24Popover`, both sharing the same `v-model`.
- Use `color="air-tertiary-no-accent"` for icon/link-style buttons (the header action and "Add participant") — there is no `variant` prop on `B24Button`.

Keep all copy in the requested locale.
::

## API

### Props

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attributes" target="_blank"}
This component also supports all native `<form>` HTML attributes.
::

### Slots

:component-slots

### Emits

:component-emits

### Expose

You can access the typed component instance using [`useTemplateRef`](https://vuejs.org/api/composition-api-helpers.html#usetemplateref).

```vue
<script setup lang="ts">
const form = useTemplateRef('form')
</script>

<template>
  <B24Form ref="form" />
</template>
```

This will give you access to the following:

| Name | Type |
| ---- | ---- |
| `submit()`{lang="ts-type"} | `Promise<void>`{lang="ts-type"} <br> <div class="text-(--ui-color-design-tinted-na-content) mt-1"><p>Triggers form submission with HTML5 validation.</p></div> |
| `validate(opts: { name?: keyof T \| (keyof T)[], silent?: boolean, nested?: boolean, transform?: boolean })`{lang="ts-type"} | `Promise<T>`{lang="ts-type"} <br> <div class="text-(--ui-color-design-tinted-na-content) mt-1"><p>Triggers form validation. Will raise any errors unless `opts.silent` is set to true.</p></div> |
| `clear(path?: keyof T \| RegExp)`{lang="ts-type"} | `void` <br> <div class="text-(--ui-color-design-tinted-na-content) mt-1"><p>Clears form errors associated with a specific path. If no path is provided, clears all form errors.</p></div> |
| `getErrors(path?: keyof T \| RegExp)`{lang="ts-type"} | `FormErrorWithId[]`{lang="ts-type"} <br> <div class="text-(--ui-color-design-tinted-na-content) mt-1"><p>Retrieves form errors associated with a specific path. If no path is provided, returns all form errors.</p></div> |
| `setErrors(errors: FormError[], name?: keyof T \| RegExp)`{lang="ts-type"} | `void` <br> <div class="text-(--ui-color-design-tinted-na-content) mt-1"><p>Sets form errors for a given path. If no path is provided, overrides all errors.</p></div> |
| `errors`{lang="ts-type"} | `Ref<FormErrorWithId[]>`{lang="ts-type"} <br> <div class="text-(--ui-color-design-tinted-na-content) mt-1"><p>A reference to the array containing validation errors. Use this to access or manipulate the error information.</p></div> |
| `disabled`{lang="ts-type"} | `Ref<boolean>`{lang="ts-type"} |
| `dirty`{lang="ts-type"} | `Ref<boolean>`{lang="ts-type"} `true` if at least one form field has been updated by the user. |
| `dirtyFields`{lang="ts-type"} | `ReadonlySet<DeepReadonly<keyof T>>`{lang="ts-type"} Tracks fields that have been modified by the user. |
| `touchedFields`{lang="ts-type"} | `ReadonlySet<DeepReadonly<keyof T>>`{lang="ts-type"} Tracks fields that the user interacted with. |
| `blurredFields`{lang="ts-type"} | `ReadonlySet<DeepReadonly<keyof T>>`{lang="ts-type"} Tracks fields blurred by the user. |

## Theme

:component-theme
