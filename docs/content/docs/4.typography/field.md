---
title: Field
description: Provide clear and comprehensive documentation for the API configurable elements.
category: components
links:
  - label: GitHub
    iconName: GitHubIcon
    icon: i-simple-icons-github
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/Field.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/field
---

## Usage

A field, prop or parameter to display in your content.

::code-preview
::field{name="name" type="string" required class="w-full"}
The `description` can be set as prop or in the default slot with full **markdown** support.
::

#code

```mdc
::field{name="name" type="string" required}
The `description` can be set as prop or in the default slot with full **markdown** support.
::
```

::

## API

### Props

:component-props{prose}

### Slots

:component-slots{prose}

## Theme

:component-theme{prose}
