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
