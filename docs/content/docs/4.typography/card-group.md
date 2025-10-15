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
title: Dashboard
to: https://github.com/nuxt-ui-templates/dashboard
target: _blank
---
A dashboard with multi-column layout.
::

::card
---
title: SaaS
to: https://github.com/nuxt-ui-templates/saas
target: _blank
---
A template with landing, pricing, docs and blog.
::

::card
---
title: Docs
to: https://github.com/nuxt-ui-templates/docs
target: _blank
---
A documentation with `@nuxt/content`.
::

::card
---
title: Landing
to: https://github.com/nuxt-ui-templates/landing
target: _blank
---
A landing page you can use as starting point.
::

:::

#code

```mdc
::card-group

::card
---
title: Dashboard
target: _blank
---
A dashboard with multi-column layout.
::

::card
---
title: SaaS
target: _blank
---
A template with landing, pricing, docs and blog.
::

::card
---
title: Docs
target: _blank
---
A documentation with `@nuxt/content`.
::

::card
---
title: Landing
target: _blank
---
A landing page you can use as starting point.
::

::
```

::

## API

### Slots

:component-slots{prose}

## Theme

:component-theme{prose}
