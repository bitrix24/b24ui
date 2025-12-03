---
title: LocaleSelect
description: 'A Select to switch between locales.'
category: i18n
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/locale/LocaleSelect.vue
  - label: SelectMenu
    to: /docs/components/select-menu/
    iconName: Bitrix24Icon
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/locale-select
---

## Usage

The LocaleSelect component extends the [SelectMenu](/docs/components/select-menu/) component, so you can pass any property such as `color`, `size`, etc.

::framework-only
#nuxt
::note{to="/docs/getting-started/integrations/i18n/nuxt/"}
This component is meant to be used with the **i18n** system. Learn more about it in the guide.
::

#vue
::note{to="/docs/getting-started/integrations/i18n/vue/"}
This component is meant to be used with the **i18n** system. Learn more about it in the guide.
::

::

::warning
The flags are displayed using Unicode characters. This may result in a different display, e.g. Microsoft Edge under Windows displays the ISO 3166-1 alpha-2 code instead, as no flag icons are shipped with the OS fonts.
::

### Locales

Use the `locales` prop with an array of locales from `@bitrix24/b24ui-nuxt/locale`.

::component-example
---
name: 'locale-select-example'
---
::

You can pass only the locales you need in your application:

```vue
<script setup lang="ts">
import { en, es, ru, tr, ar } from '@bitrix24/b24ui-nuxt/locale'

const locale = ref('en')
</script>

<template>
  <B24LocaleSelect v-model="locale" :locales="[en, es, ru, tr, ar]" />
</template>
```

### Dynamic locale

::framework-only
#nuxt
::div
You can use it with Nuxt i18n:

```vue
<script setup lang="ts">
import * as locales from '@bitrix24/b24ui-nuxt/locale'

const { locale, setLocale } = useI18n()
</script>

<template>
  <B24LocaleSelect
    :model-value="locale"
    :locales="Object.values(locales)"
    @update:model-value="setLocale($event)"
  />
</template>
```

::

#vue
::div
You can use it with Vue i18n:

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import * as locales from '@bitrix24/b24ui-nuxt/locale'

const { locale, setLocale } = useI18n()
</script>

<template>
  <B24LocaleSelect
    :model-value="locale"
    :locales="Object.values(locales)"
    @update:model-value="setLocale($event)"
  />
</template>
```

::

::

## API

### Props

:component-props
