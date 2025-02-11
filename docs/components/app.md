---
title: App
description: Encases your app to deliver global settings and additional features.
outline: deep
---
# App

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/app"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/App.vue"
>
Encases your app to deliver global settings and additional features.
</Description>

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

::: tip
Learn how to use the `locale` property to change the locale of your [Nuxt](/guide/i18n-nuxt#locale) or [Vue](/guide/i18n-vue#locale) app.
:::

## API

### Props

<ComponentProps component="App" />

### Slots

<ComponentSlots component="App" />
