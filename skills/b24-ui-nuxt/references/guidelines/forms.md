# Forms

## Basic pattern

Bitrix24 UI forms use `B24Form` + `B24FormField` + Standard Schema validation (Zod, Valibot, Yup, or Joi).

```vue
<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters')
})

type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({ email: '', password: '' })

function onSubmit(event: FormSubmitEvent<Schema>) {
  // B24Form validates before emitting @submit — access validated data via event.data
}
</script>

<template>
  <B24Form :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <B24FormField name="email" label="Email" required>
      <B24Input v-model="state.email" type="email" placeholder="you@example.com" />
    </B24FormField>

    <B24FormField name="password" label="Password" required>
      <B24Input v-model="state.password" type="password" placeholder="Min 8 characters" />
    </B24FormField>

    <B24Button type="submit" label="Sign in" />
  </B24Form>
</template>
```

## Key rules

- Always use `B24FormField` around inputs — it connects validation errors via the `name` prop
- The `name` prop on `B24FormField` must match the schema field name exactly
- Use `reactive<Partial<Schema>>({})` for state — `Partial` allows empty initial values
- `@submit` only fires when validation passes
- For nested objects, use dot notation: `name="address.city"`

## B24FormField props

| Prop | Purpose |
|---|---|
| `name` | Links to schema field for validation errors |
| `label` | Visible label text |
| `description` | Help text below the input |
| `hint` | Right-aligned hint text (e.g., "Optional") |
| `required` | Shows required indicator |
| `size` | Inherits to child input |

## Field layout patterns

### Vertical stack (default)

```vue
<B24Form :schema="schema" :state="state" class="space-y-4">
  <B24FormField name="name" label="Name">
    <B24Input v-model="state.name" />
  </B24FormField>
  <B24FormField name="email" label="Email">
    <B24Input v-model="state.email" />
  </B24FormField>
</B24Form>
```

### Inline fields with UFieldGroup

```vue
<B24FieldGroup>
  <B24FormField name="firstName" label="First name">
    <B24Input v-model="state.firstName" />
  </B24FormField>
  <B24FormField name="lastName" label="Last name">
    <B24Input v-model="state.lastName" />
  </B24FormField>
</B24FieldGroup>
```

### Grid layout

```vue
<B24Form :schema="schema" :state="state" class="grid grid-cols-2 gap-4">
  <B24FormField name="firstName" label="First name">
    <B24Input v-model="state.firstName" />
  </B24FormField>
  <B24FormField name="lastName" label="Last name">
    <B24Input v-model="state.lastName" />
  </B24FormField>
  <B24FormField name="email" label="Email" class="col-span-2">
    <B24Input v-model="state.email" type="email" />
  </B24FormField>
</B24Form>
```

## Common field patterns

### Select

```vue
<B24FormField name="role" label="Role">
  <B24Select v-model="state.role" :items="['Admin', 'Editor', 'Viewer']" placeholder="Choose role" />
</B24FormField>
```

### Checkbox

```vue
<B24FormField name="terms">
  <B24Checkbox v-model="state.terms" label="I agree to the terms and conditions" />
</B24FormField>
```

### Radio group

```vue
<B24FormField name="plan" label="Plan">
  <B24RadioGroup
    v-model="state.plan"
    :items="[
      { label: 'Free', value: 'free', description: 'For personal projects' },
      { label: 'Pro', value: 'pro', description: 'For teams' }
    ]"
  />
</B24FormField>
```

### Switch

```vue
<B24FormField name="notifications" label="Email notifications">
  <B24Switch v-model="state.notifications" />
</B24FormField>
```

### Textarea

```vue
<B24FormField name="bio" label="Bio" description="Brief description for your profile.">
  <B24Textarea v-model="state.bio" :rows="3" autoresize :maxrows="6" />
</B24FormField>
```

### File upload

```vue
<B24FormField name="avatar" label="Avatar">
  <B24FileUpload v-model="state.avatar" accept="image/*" />
</B24FormField>

<!-- Or as a drop area -->
<B24FormField name="documents" label="Documents">
  <B24FileUpload v-model="state.documents" multiple variant="area" />
</B24FormField>
```

### Date

```vue
<B24FormField name="date" label="Date">
  <B24InputDate v-model="state.date" />
</B24FormField>

<!-- Date range -->
<B24FormField name="dateRange" label="Date range">
  <B24InputDate v-model="state.dateRange" range />
</B24FormField>
```

## Programmatic validation

```vue
<script setup lang="ts">
const form = useTemplateRef('form')

async function validateAndSubmit() {
  const result = await form.value?.validate()
  if (result) {
    // valid — submit
  }
}

async function validateEmail() {
  await form.value?.validate({ name: 'email' })
}

function setServerError() {
  form.value?.setErrors([
    { name: 'email', message: 'Email already taken' }
  ])
}

function resetErrors() {
  form.value?.clearErrors()
}
</script>

<template>
  <B24Form ref="form" :schema="schema" :state="state" @submit="onSubmit">
    <!-- fields -->
  </B24Form>
</template>
```

## Record-edit form pattern

For record-editing UIs (UF placements, slider edit panels, CRM-like detail panes) the standard composition is: a titled section bar, vertical-label fields, optional two-column rows, and nested sub-sections grouping related fields with their own border. **No new component is needed** — `B24Form` + `B24FormField` + a small `<div>` for the inner section is enough.

Key structural rules:

- One outer `B24Form` with `:schema` for the whole record.
- Header bar = `<div class="flex flex-wrap items-center justify-between gap-2">` + heading + leading edit-pencil `B24Button variant="link"` + trailing "Cancel" link button.
- Inner sub-section (e.g. "Client") = label `<span>` above + a `<div role="group" aria-labelledby="...">` bordered container (`rounded-md border border-(--ui-color-design-outline-stroke) p-3 sm:p-4 space-y-4`) containing nested `B24FormField`s. `role`/`aria-labelledby` associate the label with the group (there is no dedicated fieldset primitive).
- Two-column rows (e.g. amount + currency) = `<div class="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">` so the secondary input drops below on narrow viewports.
- `B24InputDate` binds an `@internationalized/date` value, **not** a native `Date` — type that schema field loosely (`z.any().optional()`), never `z.date()`.
- On `B24Select`, `class` targets the trigger and `b24ui.root` the wrapper, so a full-width select needs both; on `B24Input`/`B24InputNumber`, `class` already targets the root, so `class="w-full"` alone is enough.
- Footer actions (Cancel / Save) stick to the bottom with `<div class="flex flex-wrap justify-end gap-2 pt-2">`.

Skeleton:

```vue
<B24Form :schema="schema" :state="state" class="space-y-4 w-full max-w-lg" @submit="onSubmit">
  <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-(--ui-color-divider-vibrant-default)">
    <div class="flex items-center gap-1">
      <h3 class="text-(length:--ui-font-size-lg) font-(--ui-font-weight-semi-bold) uppercase tracking-wide">Order details</h3>
      <B24Button variant="link" size="sm" :icon="EditPencilIcon" aria-label="Edit section" />
    </div>
    <B24Button variant="link" size="sm" label="Cancel" @click="onCancel" />
  </div>

  <B24FormField label="Stage" name="stage">
    <B24Select v-model="state.stage" :items="stages" class="w-full" :b24ui="{ root: 'w-full' }" />
  </B24FormField>

  <B24FormField label="Amount and currency" name="amount">
    <div class="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
      <B24InputNumber v-model="state.amount" :min="0" class="w-full" />
      <B24Select v-model="state.currency" :items="currencies" class="w-full sm:w-32" :b24ui="{ root: 'w-full sm:w-32' }" />
    </div>
  </B24FormField>

  <!-- Nested sub-section: label outside + bordered container. clientGroupId = useId() so the label/group link stays unique if the form is rendered more than once. -->
  <div class="space-y-1.5">
    <span :id="clientGroupId" class="block text-(length:--ui-font-size-sm) text-(--ui-color-typography-secondary)">Client</span>
    <div role="group" :aria-labelledby="clientGroupId" class="rounded-md border border-(--ui-color-design-outline-stroke) p-3 sm:p-4 space-y-4">
      <B24FormField label="Company" name="company">
        <B24Input v-model="state.company" :icon="UserCompanyIcon" placeholder="Company name, phone or email" class="w-full" />
      </B24FormField>
      <B24FormField label="Contact" name="contact">
        <B24Input v-model="state.contact" :icon="PersonIcon" placeholder="Contact name, phone or email" class="w-full" />
      </B24FormField>
      <B24Button variant="link" size="sm" :icon="CirclePlusIcon" label="Add participant" />
    </div>
  </div>

  <!-- Remaining fields below the Client group -->
  <B24FormField label="Salutation" name="salutation">
    <B24Select v-model="state.salutation" :items="salutations" class="w-full" :b24ui="{ root: 'w-full' }" />
  </B24FormField>
  <B24FormField label="Last name" name="lastName">
    <B24Input v-model="state.lastName" class="w-full" />
  </B24FormField>
  <B24FormField label="First name" name="firstName">
    <B24Input v-model="state.firstName" class="w-full" />
  </B24FormField>
  <B24FormField label="Service type" name="serviceType">
    <B24Select v-model="state.serviceType" :items="serviceTypes" placeholder="Choose a service" class="w-full" :b24ui="{ root: 'w-full' }" />
  </B24FormField>
  <B24FormField label="Scheduled date" name="scheduledAt">
    <!-- v-model is an @internationalized/date value, not a native Date -->
    <B24InputDate v-model="state.scheduledAt" class="w-full" />
  </B24FormField>

  <div class="flex flex-wrap justify-end gap-2 pt-2">
    <B24Button color="air-tertiary" label="Cancel" @click="onCancel" />
    <B24Button color="air-primary" type="submit" label="Save" />
  </div>
</B24Form>
```

Full working example: [docs/components/form#record-edit-section](https://bitrix24.github.io/b24ui/docs/components/form#record-edit-section).

## Form in a modal

Use `#footer="{ close }"` scoped slot for cancel/submit actions. Wrap the modal body in `B24Form` with a `type="submit"` button in the footer so validation runs on submit.

```vue
<B24Modal v-model:open="isOpen" title="Edit profile" description="Update your information." :b24ui="{ footer: 'justify-end' }">
  <template #body>
    <B24Form id="profile-form" :schema="schema" :state="state" class="space-y-4" @submit="onSave">
      <B24FormField name="name" label="Name">
        <B24Input v-model="state.name" />
      </B24FormField>
      <B24FormField name="email" label="Email">
        <B24Input v-model="state.email" type="email" />
      </B24FormField>
    </B24Form>
  </template>
  <template #footer="{ close }">
    <B24Button type="submit" form="profile-form" label="Save" />
    <B24Button label="Cancel" color="air-tertiary" @click="close" />
  </template>
</B24Modal>
```
