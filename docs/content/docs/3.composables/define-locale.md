---
title: defineLocale
description: 'A utility to create a custom locale configuration for your application.'
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/defineLocale.ts
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/composables/define-locale
---

## Usage

Use the `defineLocale` utility to create a custom locale with your own translations.

```vue
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

::tip{to="/docs/getting-started/integrations/i18n/"}
Learn more about internationalization in the **i18n integration** documentation.
::

## API

`defineLocale<M>(options: DefineLocaleOptions<M>): Locale<M>`{lang="ts-type"}

Creates a new locale object with the provided options.

#### Parameters

::field-group

  ::field{name="options" type="DefineLocaleOptions<M>" required}
  The locale configuration object with the following properties:

    ::collapsible
  
      ::field-group
  
        ::field{name="name" type="string" required}
        The display name of the locale (e.g., `'English'`, `'Français'`).
        ::
  
        ::field{name="code" type="string" required}
        The code of the locale from [Bitrix24](https://apidocs.bitrix24.com/api-reference/sale/status-lang/sale-status-lang-get-list-langs.html).
        ::
  
        ::field{name="locale" type="string" required}
        The ISO code of the locale (e.g., `'en'`, `'fr'`, `'de-AT'`).
        ::
  
        ::field{name="dir" type="'ltr' | 'rtl'"}
        The text direction of the locale. Defaults to `'ltr'`.
        ::
  
        ::field{name="messages" type="M" required}
        The translation messages object. Use the `Messages` type from `@bitrix24/b24ui-nuxt` for type safety.
        ::
      ::
    ::
  ::
::

**Returns:** A `Locale<M>` object that can be passed to the `locale` prop of the [App](/docs/components/app/) component.

## Example

Here's a complete example of creating a custom locale:

```vue
<script setup lang="ts">
import type { Messages } from '@bitrix24/b24ui-nuxt'

const locale = defineLocale<Messages>({
  name: 'Español',
  code: 'la',
  locale: 'es',
  dir: 'ltr',
  messages: {
    alert: {
      close: 'Cerrar'
    },
    modal: {
      close: 'Cerrar'
    },
    commandPalette: {
      back: 'Atrás',
      close: 'Cerrar',
      noData: 'Sin datos',
      noMatch: 'Sin resultados',
      placeholder: 'Escribe un comando o busca…'
    }
    // ... other component messages
  }
})
</script>

<template>
  <B24App :locale="locale">
    <NuxtPage />
  </B24App>
</template>
```

::note
You can look at the [built-in locales](https://github.com/bitrix24/b24ui/tree/main/src/runtime/locale) for reference on how to structure the messages object.
::
