---
LLMS_URL: "https://bitrix24.github.io/b24ui/\\guide\\color-mode-nuxt.md"
title: Color Mode in Nuxt Application
description: 'Bitrix24 UI integrates with Nuxt Color Mode to allow for easy switching between light and dark themes.'
outline: deep
---
# Color Mode in Nuxt Application

<Description
  git-custom="https://github.com/nuxt-modules/color-mode"
  git-custom-title="nuxtjs/color-mode"
  nuxt-ui="https://ui3.nuxt.dev/getting-started/color-mode/nuxt"
>
  Bitrix24 UI integrates with Nuxt Color Mode to allow for easy switching between light and dark themes.
</Description>

## Usage

Bitrix24 UI automatically registers the [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode) module for you, so there's no additional setup required. You can simply use the `useColorMode` composable to switch between light and dark modes:

```vue [ColorModeButton.vue]
<script setup>
import SunIcon from '@bitrix24/b24icons-vue/main/SunIcon'
import MoonIcon from '@bitrix24/b24icons-vue/main/MoonIcon'

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <B24Button
      :icon="isDark ? MoonIcon : SunIcon"
      color="link"
      depth="dark"
      @click="isDark = !isDark"
    />

    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>
```

You can disable the `@nuxtjs/color-mode` module with the `b24ui.colorMode` option in your `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@bitrix24/b24ui-nuxt'],
  css: ['~/assets/css/main.css'],
  b24ui: {
    colorMode: false
  }
})
```
