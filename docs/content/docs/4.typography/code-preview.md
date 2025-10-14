---
title: CodePreview
description: 'Display code examples with a preview and their source for clearer documentation.'
category: components
links:
  - label: GitHub
    iconName: GitHubIcon
    icon: i-simple-icons-github
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/CodePreview.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/code-preview
---

## Usage

Wrap any content with the `code-preview` component to display a live preview alongside its source code using the `code` slot.

::code-preview{class="[&>div]:*:my-0 [&>div]:*:w-full" label="Preview"}

::code-preview{class="[&>div]:*:my-0"}
`inline code`

#code

```mdc
`inline code`
```

::

#code

````mdc
::code-preview
`inline code`

#code
```mdc
`inline code`
```
::
````

::

## API

### Props

:component-props{prose}

### Slots

:component-slots{prose}

## Theme

:component-theme{prose}
