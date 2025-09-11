---
title: Internationalization (i18n) in Vue Application
description: 'Learn how to internationalize your Vue app with multi-directional support (LTR/RTL).'
outline: deep
---
# Internationalization (i18n) in Vue Application

<Description
  nuxt-ui="https://ui3.nuxt.dev/getting-started/i18n/vue"
>
  Learn how to internationalize your Vue app with multi-directional support (LTR/RTL) in your Vue application.
</Description>

## Usage

::: tip
Bitrix24 UI provides an [`App`](/docs/components/app/) component that wraps your app to provide global configurations.
:::

### Locale

Use the `locale` prop with the locale you want to use from `@bitrix24/b24ui-nuxt/locale`:

::: code-group
```vue:line-numbers {2,6} [App.vue]
<script setup lang="ts">
import { it } from '@bitrix24/b24ui-nuxt/locale'
</script>

<template>
  <B24App :locale="it">
    <RouterView />
  </B24App>
</template>
```
:::

### Custom locale

You can create your own locale using the `defineLocale` composable:

::: code-group
```vue:line-numbers {2,4-11,15} [App.vue]
<script setup lang="ts">
import type { Messages } from '@bitrix24/b24ui-nuxt'
import { defineLocale } from '@bitrix24/b24ui-nuxt/composables/defineLocale.js'

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
    <RouterView />
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

```vue [App.vue]
<script setup lang="ts">
import { en } from '@bitrix24/b24ui-nuxt/locale'
import { extendLocale } from '@bitrix24/b24ui-nuxt/composables/defineLocale.js'

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
    <RouterView />
  </B24App>
</template>
```

### Dynamic locale

To dynamically switch between languages, you can use the [Vue I18n](https://vue-i18n.intlify.dev/) plugin.

#### 1. Install the Vue I18n package

::: code-group

```bash [pnpm]
pnpm add vue-i18n@11
```

```bash [yarn]
yarn add vue-i18n@11
```

```bash [npm]
npm install vue-i18n@11
```

```bash [bun]
bun add vue-i18n@11
```

:::

#### 2. Use the Vue I18n plugin in your `main.ts`

::: code-group
```ts:line-numbers {3,14-26,29} [main.ts]
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'
import b24UiPlugin from '@bitrix24/b24ui-nuxt/vue-plugin'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({
  routes: [],
  history: createWebHistory()
})

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  availableLocales: ['en', 'de'],
  messages: {
    en: {
      // ...
    },
    de: {
      // ...
    }
  }
})

app.use(router)
app.use(i18n)
app.use(b24UiPlugin)

app.mount('#app')
```
:::

#### 3. Set the `locale` prop using `useI18n`

::: code-group
```vue:line-numbers {2,3,5,9} [App.vue]
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import * as locales from '@bitrix24/b24ui-nuxt/locale'

const { locale } = useI18n()
</script>

<template>
  <B24App :locale="locales[locale]">
    <RouterView />
  </B24App>
</template>
```
:::

### Dynamic direction

Each locale has a `dir` property which will be used by the `App` component to set the directionality of all components.

In a multilingual application, you might want to set the `lang` and `dir` attributes on the `<html>` element dynamically based on the user's locale, which you can do with the [useHead](https://unhead.unjs.io/docs/api/use-head) composable:

::: code-group
```vue:line-numbers {4,12-17} [App.vue]
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
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
    <RouterView />
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
