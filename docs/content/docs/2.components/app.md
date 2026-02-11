---
title: App
description: Encases your app to deliver global settings and additional features.
category: layout
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/App.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/app
---

## Usage

This component implements Reka UI [ConfigProvider](https://reka-ui.com/docs/utilities/config-provider) to provide global configuration to all components:

- Enables all primitives to inherit global reading direction.
- Enables changing the behavior of scroll body when setting body lock.
- Much more controls to prevent layout shifts.

It's also using [ToastProvider](https://reka-ui.com/docs/components/toast#provider) and [TooltipProvider](https://reka-ui.com/docs/components/tooltip#provider) to provide global toasts and tooltips.

Use it as at the root of your app:

```vue [app.vue]
<template>
  <B24App>
    <NuxtPage />
  </B24App>
</template>
```

::framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/i18n/nuxt/#locale"}
Learn how to use the `locale` prop to change the locale of your app. This also controls the date/time format in components like Calendar, InputDate, and InputTime.
:::

#vue
:::tip{to="/docs/getting-started/integrations/i18n/vue/#locale"}
Learn how to use the `locale` prop to change the locale of your app. This also controls the date/time format in components like Calendar, InputDate, and InputTime.
:::
::

## API

### Props

:component-props

### Slots

:component-slots
