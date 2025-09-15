---
title: Color Mode in Vue Application
description: 'Bitrix24 UI integrates with VueUse to allow for easy switching between light and dark themes.'
outline: deep
---
# Color Mode in Vue Application

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

<Description
  nuxt-ui="https://ui3.nuxt.dev/getting-started/color-mode/vue"
>
  Bitrix24 UI integrates with VueUse to allow for easy switching between light and dark themes.
</Description>

## Usage

Bitrix24 UI automatically registers the [useDark](https://vueuse.org/core/useDark) composable as a Vue plugin, so there's no additional setup required. You can simply use it to switch between light and dark modes:

```vue [ColorModeButton.vue]
<script setup>
import SunIcon from '@bitrix24/b24icons-vue/main/SunIcon'
import MoonIcon from '@bitrix24/b24icons-vue/main/MoonIcon'

import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
</script>

<template>
  <B24Button
    :icon="mode === 'dark' ? MoonIcon : SunIcon"
    color="link"
    depth="dark"
    @click="mode = (mode === 'dark' ? 'light' : 'dark')"
  />
</template>
```

You can disable this plugin with the `colorMode` option in your `vite.config.ts`:

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import bitrix24UIPluginVite from '@bitrix24/b24ui-nuxt/vite'

export default defineConfig({
  plugins: [
    vue(),
    bitrix24UIPluginVite({
      colorMode: false
    })
  ]
})
```
