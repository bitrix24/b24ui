---
title: Callout
description: 'Highlight important information with eye-catching colored boxes and icons.'
category: components
links:
  - label: GitHub
    iconName: GitHubIcon
    icon: i-simple-icons-github
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/Callout.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/callout
---

## Usage

Use markdown in the default slot of the `callout` component to add eye-catching context to your content.

Use the `color` props to customize it. You can also pass any property from the [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link) component.

::component-code{slug="callout" prose}
---
prettier: true
ignore:
  - to
props:
  color: air-primary
  to: '/docs/guide/installation-nuxt-app/'
  class: 'w-full my-0'
hide:
  - class
slots:
  default: This is a `callout` with full **markdown** support.
---

Learn how to install `@bitrix24/b24ui-nuxt` in your project.
::

## Shortcuts

You can also use the `note`, `tip`, `warning` and `caution` shortcuts with pre-defined icons and colors.

::code-preview

:::div{class="flex flex-col gap-4 w-full"}

::note{class="w-full my-0"}
Here's some additional information for you.
::

::tip{class="w-full my-0"}
Here's a helpful suggestion.
::

::warning{class="w-full my-0"}
Be careful with this action as it might have unexpected results.
::

::caution{class="w-full my-0"}
This action cannot be undone.
::

:::

#code

```mdc
::note
Here's some additional information.
::

::tip
Here's a helpful suggestion.
::

::warning
Be careful with this action as it might have unexpected results.
::

::caution
This action cannot be undone.
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
