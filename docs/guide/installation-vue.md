---
title: Installation in Vue Application
description: 'Learn how to install and configure Bitrix24 UI in your Vue application.'
outline: deep
---
# Installation in Vue Application

<Description
  nuxt-ui="https://ui3.nuxt.dev/getting-started/installation/vue"
>
  Learn how to install and configure Bitrix24 UI `@bitrix24/b24ui-nuxt` in your Vue application.
</Description>

## Setup

### Use our Vue starter

Start your project using the [bitrix24/starter-b24ui-vue](https://github.com/bitrix24/starter-b24ui-vue) template with Bitrix24 UI pre-configured.

Create a new project locally by running the following command:

::: code-group
```bash [Terminal]
npx nuxi init -t github:bitrix24/starter-b24ui-vue <my-app>
```
:::

::: tip
The `<my-app>` argument is the name of the directory where the project will be created, replace it with your project name.
:::

Once the installation is complete, navigate into your project and start the development server:

::: code-group
```bash [Terminal]
cd <my-app>
npm run dev
```
:::

### Add to a Vue project

**1. Install @bitrix24/b24ui and @bitrix24/b24icons-vue packages**

::: code-group

```bash [pnpm]
pnpm add @bitrix24/b24ui-nuxt
pnpm add @bitrix24/b24icons-vue
```

```bash [yarn]
yarn add @bitrix24/b24ui-nuxt
yarn add @bitrix24/b24icons-vue
```

```bash [npm]
npm install @bitrix24/b24ui-nuxt
npm install @bitrix24/b24icons-vue
```

```bash [bun]
bun add @bitrix24/b24ui-nuxt
bun add @bitrix24/b24icons-vue
```

:::

::: warning
If you're using **pnpm**, ensure that you either set [`shamefully-hoist=true`](https://pnpm.io/npmrc#shamefully-hoist) in your `.npmrc` file or install `tailwindcss`, `vue-router` and `@unhead/vue` in your project's root directory.
:::

**2. Add the Bitrix24 UI Vite plugin in your `vite.config.ts`{lang="ts-type"}**
::: code-group
```ts [vite.config.ts]{3,8}
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import bitrix24UIPluginVite from '@bitrix24/b24ui-nuxt/vite'

export default defineConfig({
  plugins: [
    vue(),
    bitrix24UIPluginVite()
  ]
})
```
:::

::: info
Bitrix24 UI registers `unplugin-auto-import` and `unplugin-vue-components`, which will generate `auto-imports.d.ts` and `components.d.ts` type declaration files. You will likely want to gitignore these, and add them to your `tsconfig`.

::: code-group
```json [tsconfig.app.json]{6-7}
{
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "auto-imports.d.ts",
    "components.d.ts"
  ]
}
```

```bash [.gitignore]
# Auto-generated type declarations
auto-imports.d.ts
components.d.ts
```

:::

**3. Use the Bitrix24 UI Vue plugin in your `main.ts`**

::: code-group
```ts [main.ts]{3,14}
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import b24UiPlugin from '@bitrix24/b24ui-nuxt/vue-plugin'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({
  routes: [],
  history: createWebHistory()
})

app.use(router)
app.use(b24UiPlugin)

app.mount('#app')
```
:::

**4. Import Tailwind CSS and Bitrix24 UI in your CSS**

```css [assets/main.css]
@import "tailwindcss" theme(static);
@import "@bitrix24/b24ui-nuxt";
```
::: warning
The `theme(static)` is required since [`tailwindcss@4.0.8`](https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.0.8) introduced a breaking change to only expose used CSS variables.
:::

::: tip
Import the CSS file in your `main.ts`.

::: code-group
```ts [main.ts]{1}
import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import b24UiPlugin from '@bitrix24/b24ui-nuxt/vue-plugin'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({
  routes: [],
  history: createWebHistory()
})

app.use(router)
app.use(b24UiPlugin)

app.mount('#app')
```
:::

::: info
It's recommended to install the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension for VSCode and add the following settings:

::: code-group
```json [.vscode/settings.json]
"files.associations": {
  "*.css": "tailwindcss"
},
"editor.quickSuggestions": {
  "strings": "on"
},
"tailwindCSS.classAttributes": ["class", "b24ui"],
"tailwindCSS.experimental.classRegex": [
  ["b24ui:\\s*{([^)]*)\\s*}", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
]
```

:::

**5. Wrap your app with App component**

::: code-group
```vue [App.vue]
<template>
  <B24App>
    <RouterView />
  </B24App>
</template>
```
:::

::: tip
The [`App`](/components/app) component provides global configurations and is required for **Toast**, **Tooltip** components to work as well as **Programmatic Overlays**.
:::

## Options

You can customize Bitrix24 UI by providing options in your `vite.config.ts`.

### `colorMode`

Use the `colorMode` option to enable or disable the color mode integration from `@vueuse/core`.

- Default: `true`{lang="ts-type"}

::: code-group
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
:::
