---
title: extendLocale
description: 'A utility to extend an existing locale with custom translation overrides.'
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/defineLocale.ts
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/composables/extend-locale
---

## Usage

Use the `extendLocale` utility to customize an existing locale by overriding specific properties or messages.

```vue
<script setup lang="ts">
import { en } from '@bitrix24/b24ui-nuxt/locale'

const locale = extendLocale(en, {
  locale: 'en-AU',
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

This is useful when you want to:
- Create a regional variant of a language (e.g., `en-AU` from `en`)
- Override specific translations without redefining the entire locale
- Customize component labels for your application

::tip{to="/docs/getting-started/integrations/i18n/"}
Learn more about internationalization in the **i18n integration** documentation.
::

## API

`extendLocale<M>(locale: Locale<M>, options: Partial<DefineLocaleOptions<DeepPartial<M>>>): Locale<M>`{lang="ts-type"}

Extends an existing locale with the provided options, deeply merging the messages.

#### Parameters

::field-group
  ::field{name="locale" type="Locale<M>" required}
  The base locale to extend. Import from `@bitrix24/b24ui-nuxt/locale`.
  ::

  ::field{name="options" type="Partial<DefineLocaleOptions<DeepPartial<M>>>" required}
  The properties to override:

  ::collapsible
    ::field-group
      ::field{name="name" type="string"}
      Override the display name of the locale.
      ::

      ::field{name="code" type="string" required}
      The code of the locale from [Bitrix24](https://apidocs.bitrix24.com/api-reference/sale/status-lang/sale-status-lang-get-list-langs.html).
      ::

      ::field{name="locale" type="string"}
      Override the ISO code of the locale (e.g., `'en-GB'`, `'fr-CA'`).
      ::

      ::field{name="dir" type="'ltr' | 'rtl'"}
      Override the text direction of the locale.
      ::

      ::field{name="messages" type="DeepPartial<M>"}
      Partial messages object to merge with the base locale. Only specify the messages you want to override.
      ::
    ::
  ::
  ::
::

**Returns:** A new `Locale<M>` object with the merged properties.

## Example

Here's an example extending the English locale for an Australian variant:

```vue
<script setup lang="ts">
import { en } from '@bitrix24/b24ui-nuxt/locale'

const locale = extendLocale(en, {
  name: 'English (Australia)',
  locale: 'en-AU',
  messages: {
    colorMode: {
      dark: 'Dark',
      light: 'Light',
      system: 'System'
    },
    selectMenu: {
      search: 'Search…',
      noData: 'No results found',
      noMatch: 'No matching results'
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

::note
The `extendLocale` utility uses deep merging, so you only need to specify the messages you want to override. All other messages will be inherited from the base locale.
::
