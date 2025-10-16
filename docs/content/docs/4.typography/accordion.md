---
title: Accordion
description: 'Add interactive toggles for a more structured content presentation.'
category: components
links:
  - label: GitHub
    iconName: GitHubIcon
    icon: i-simple-icons-github
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/Accordion.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/accordion
---

## Usage

Use the `accordion` and `accordion-item` components to display an [Accordion](/docs/components/accordion/) in your content.

::code-preview{class="[&>div]:*:my-0"}

:::accordion
---
defaultValue:
  - '1'
---

::accordion-item{label="Is Bitrix24 UI free to use?"}
Yes! Bitrix24 UI is completely free and open source under the MIT license. All 100+ components are available to everyone.
::

::accordion-item{label="Can I use Bitrix24 UI with Vue without Nuxt?"}
Yes! While optimized for Nuxt, Bitrix24 UI works perfectly with standalone Vue projects via our Vite plugin. You can follow the [installation guide](/docs/getting-started/installation/vue/) to get started.
::

::accordion-item{label="Is Bitrix24 UI production-ready?"}
Yes! Bitrix24 UI is used in production by thousands of applications with extensive tests, regular updates, and active maintenance.
::

:::

#code

```mdc
::accordion
---
defaultValue:
  - '1'
---

::accordion-item{label="Is Bitrix24 UI free to use?"}
Yes! Bitrix24 UI is completely free and open source under the MIT license. All 100+ components are available to everyone.
::

::accordion-item{label="Can I use Bitrix24 UI with Vue without Nuxt?"}
Yes! While optimized for Nuxt, Bitrix24 UI works perfectly with standalone Vue projects via our Vite plugin. You can follow the [installation guide](/docs/getting-started/installation/vue/) to get started.
::

::accordion-item{label="Is Bitrix24 UI production-ready?"}
Yes! Bitrix24 UI is used in production by thousands of applications with extensive tests, regular updates, and active maintenance.
::

::
```

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
  - accordionItem
---
::
