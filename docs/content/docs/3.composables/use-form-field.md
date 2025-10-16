---
title: useFormField
description: 'A composable to merge custom inputs with the Form component'
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/useFormField.ts
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/composables/use-form-field
navigation: false
---

## Usage

Use the auto-imported `useFormField` composable to integrate custom inputs with a [Form](/docs/components/form/).

```vue
<script setup lang="ts">
const { id, emitFormBlur, emitFormInput, emitFormChange } = useFormField()
</script>
```
