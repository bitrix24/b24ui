---
title: CardGroup
description: 'Arrange content cards into flexible grids to enhance structure and readability.'
category: components
links:
  - label: GitHub
    iconName: GitHubIcon
    icon: i-simple-icons-github
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/CardGroup.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/card-group
---

## Usage

Wrap your `card` components with the `card-group` component to group them together in a grid layout.

::code-preview

:::card-group{class="w-full my-0"}

::card
---
title: Pricing
to: https://www.bitrix24.com/prices/
target: _blank
---
Bitrix24 plans and pricing
::

::card
---
title: Webinars
to: https://www.bitrix24.com/webinars/
target: _blank
---
Our webinars cover a wide range of topics and are available for free in multiple languages.
::

::card
---
title: Bitrix24 REST API
to: https://apidocs.bitrix24.com/
target: _blank
---
A tool for creating integrations, automating workflows, and customizing user scenarios in Bitrix24
::

::card
---
title: Bitrix24 UI-Kit
to: https://bitrix24.github.io/b24ui/
target: _blank
---
Documentation for `@bitrix24/b24ui`.
::

:::

#code

```mdc
::card-group

::card
---
title: Pricing
to: https://www.bitrix24.com/prices/
target: _blank
---
Bitrix24 plans and pricing
::

::card
---
title: Webinars
to: https://www.bitrix24.com/webinars/
target: _blank
---
Our webinars cover a wide range of topics and are available for free in multiple languages.
::

::card
---
title: Bitrix24 REST API
to: https://apidocs.bitrix24.com/
target: _blank
---
A tool for creating integrations, automating workflows, and customizing user scenarios in Bitrix24
::

::card
---
title: Bitrix24 UI-Kit
to: https://bitrix24.github.io/b24ui/
target: _blank
---
Documentation for `@bitrix24/b24ui`.
::

::
```

::

## API

### Slots

:component-slots{prose}

## Theme

:component-theme{prose}
