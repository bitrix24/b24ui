---
title: useFormField
description: 'A composable to merge custom inputs with the Form component'
---
# useFormField

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

<Description
  nuxt-ui="https://ui3.nuxt.dev/composables/use-form-field"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/useFormField.ts"
>
  A composable to merge custom inputs with the Form component
</Description>

## Usage

Use the auto-imported `useFormField` composable to integrate custom inputs with a [Form](/docs/components/form/).

```vue
<script setup lang="ts">
const { id, emitFormBlur, emitFormInput, emitFormChange } = useFormField()
</script>
```
