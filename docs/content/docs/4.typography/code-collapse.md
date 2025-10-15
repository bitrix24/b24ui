---
title: CodeCollapse
description: 'Add toggle functionality for lengthy code sections to optimize layout.'
category: components
links:
  - label: GitHub
    iconName: GitHubIcon
    icon: i-simple-icons-github
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/CodeCollapse.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/code-collapse
---

## Usage

Wrap your code-block with a `code-collapse` component to display a collapsible code block.

::code-preview{class="[&>div]:*:my-0 [&>div]:*:w-full"}

::code-collapse{class="[&>div]:my-0"}

```css [main.css]
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";

@theme static {
  --font-sans: 'Public Sans', sans-serif;

  --breakpoint-3xl: 1920px;

  --color-green-50: #EFFDF5;
}
```

::

#code

````mdc
::code-collapse

```css [main.css]
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";

@theme static {
  --font-sans: 'Public Sans', sans-serif;

  --breakpoint-3xl: 1920px;

  --color-green-50: #EFFDF5;
}
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
