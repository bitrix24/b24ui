---
title: Internationalization (i18n) in Nuxt Application
description: 'Learn how to internationalize your Nuxt app with multi-directional support (LTR/RTL).'
outline: deep
---
# Internationalization (i18n) in Nuxt Application

<Description
  nuxt-ui="https://ui3.nuxt.dev/getting-started/i18n/nuxt"
>
  Learn how to internationalize your Nuxt app with multi-directional support (LTR/RTL) in your Nuxt application.
</Description>

## Usage

::: tip
Bitrix24 UI provides an [`App`](/components/app) component that wraps your app to provide global configurations.
:::

### Locale

Use the `locale` prop with the locale you want to use from `@bitrix24/b24ui-nuxt/locale`:

::: code-group
```vue:line-numbers {2,6} [app.vue]
<script setup lang="ts">
import { it } from '@bitrix24/b24ui-nuxt/locale'
</script>

<template>
  <B24App :locale="it">
    <NuxtPage />
  </UApp>
</template>
```
:::

### Custom locale

You can create your own locale using the `defineLocale` composable:

::: code-group
```vue:line-numbers {2-9,13} [app.vue]
<script setup lang="ts">
import type { Messages } from '@bitrix24/b24ui-nuxt'

const locale = defineLocale<Messages>({
  name: 'My custom locale',
  code: 'en',
  locale: 'en',
  dir: 'ltr',
  messages: {
    // implement pairs
  }
})
</script>

<template>
  <B24App :locale="locale">
    <NuxtPage />
  </B24App>
</template>
```
:::

::: tip
Look at the `locale` parameter, there you need to pass the iso code of the language. Example:

* `hi` Hindi (language)
* `de-AT`: German (language) as used in Austria (region)

:::

### Extend locale

You can customize an existing locale by overriding its `messages`, `locale` or `code` using the `extendLocale` composable:

```vue [app.vue]
<script setup lang="ts">
import { en } from '@bitrix24/b24ui-nuxt/locale'

const locale = extendLocale(en, {
  code: 'en',
  locale: 'en',
  messages: {
    commandPalette: {
      placeholder: 'Search a component...'
    }
  }
})
</script>

<template>
  <B24App :locale="locale">
    <NuxtPage />
  </B24App>
</template>
```

### Dynamic locale

To dynamically switch between languages, you can use the [Nuxt I18n](https://i18n.nuxtjs.org/) module.

#### 1. Install the Nuxt I18n package

::: code-group

```bash [pnpm]
pnpm add @nuxtjs/i18n
```

```bash [yarn]
yarn add @nuxtjs/i18n
```

```bash [npm]
npm install @nuxtjs/i18n
```

```bash [bun]
bun add @nuxtjs/i18n
```

:::

#### 2. Add the Nuxt I18n module in your `nuxt.config.ts`{lang="ts-type"}

::: code-group
```ts:line-numbers {4,7-18} [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n'
  ],
  css: ['~/assets/css/main.css'],
  i18n: {
    locales: [{
      code: 'de',
      name: 'Deutsch'
    }, {
      code: 'en',
      name: 'English'
    }, {
      code: 'fr',
      name: 'Français'
    }]
  }
})
```
:::

#### 3. Set the `locale` prop using `useI18n`

::: code-group
```vue:line-numbers {2,4,8} [app.vue]
<script setup lang="ts">
import * as locales from '@bitrix24/b24ui-nuxt/locale'

const { locale } = useI18n()
</script>

<template>
  <B24App :locale="locales[locale]">
    <NuxtPage />
  </B24App>
</template>
```
:::


### Dynamic direction

Each locale has a `dir` property which will be used by the `App` component to set the directionality of all components.

In a multilingual application, you might want to set the `lang` and `dir` attributes on the `<html>` element dynamically based on the user's locale, which you can do with the [useHead](https://nuxt.com/docs/api/composables/use-head) composable:

::: code-group
```vue:line-numbers {6-7,9-14} [app.vue]
<script setup lang="ts">
import * as locales from '@bitrix24/b24ui-nuxt/locale'

const { locale } = useI18n()

const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

useHead({
  htmlAttrs: {
    lang,
    dir
  }
})
</script>

<template>
  <B24App :locale="locales[locale]">
    <NuxtPage />
  </B24App>
</template>
```
:::

## Supported languages

* `en` English
* `de` Deutsch
* `la` Español

* `br` Português (Brasil)
* `fr` Français
* `it` Italiano

* `pl` Polski
* `ru` Русский
* `ua` Українська

* `tr` Türkçe
* `sc` 中文（简体）
* `tc` 中文（繁體)

* `ja` 日本語
* `vn` Tiếng Việt
* `id` Bahasa Indonesia

* `ms` Bahasa Melayu
* `th` ภาษาไทย
* `ar` عربي,

* `kz` Қазақша
