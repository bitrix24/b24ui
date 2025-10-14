---
title: Tabs
description: 'Organize related content in interactive tabbed interfaces.'
category: components
links:
  - label: GitHub
    iconName: GitHubIcon
    icon: i-simple-icons-github
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/Tabs.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/tabs
---

## Usage

Use the `tabs` and `tabs-item` components to display [Tabs](/docs/components/tabs/) in your content.

::code-preview{class="[&>div]:*:my-0"}

:::tabs{class="w-full"}

:::tabs-item{label="Code"}

```mdc
::callout
Lorem velit voluptate ex reprehenderit ullamco et culpa.
::
```

:::

:::tabs-item{label="Preview"}

::callout
Lorem velit voluptate ex reprehenderit ullamco et culpa.
::

:::

:::

#code

````mdc
::tabs

:::tabs-item{label="Code"}

```mdc
::callout
Lorem velit voluptate ex reprehenderit ullamco et culpa.
::
```

:::

:::tabs-item{label="Preview"}

::callout
Lorem velit voluptate ex reprehenderit ullamco et culpa.
::

:::

::
````

::

## API

### Props

:component-props{prose}

### Slots

:component-slots{prose}

## Theme

::component-theme{prose}
---
extra:
  - tabsItem
---
::
