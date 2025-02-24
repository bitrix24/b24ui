---
title: Installation in Nuxt Application
description: Learn how to install and configure Bitrix24 UI in your Nuxt application.
outline: deep
---
# Installation in Nuxt Application

<Description
  nuxt-ui="https://ui3.nuxt.dev/getting-started/installation/nuxt"
>
  Learn how to install and configure Bitrix24 UI `@bitrix24/b24ui-nuxt` in your Nuxt application.
</Description>

## Setup

### Use our Nuxt Starter

Start your project using the [bitrix24/starter-b24ui](https://github.com/bitrix24/starter-b24ui) template with Bitrix24 UI pre-configured.

Create a new project locally by running the following command:

::: code-group
```bash [Terminal]
npx nuxi init -t github:bitrix24/starter-b24ui <my-app>
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

### Add to a Nuxt project

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
If you're using **pnpm**, ensure that you either set [`shamefully-hoist=true`](https://pnpm.io/npmrc#shamefully-hoist) in your `.npmrc` file or install `tailwindcss` in your project's root directory.
:::

**2. Add the Bitrix24 UI module in your `nuxt.config.ts`{lang="ts-type"}**

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@bitrix24/b24ui-nuxt']
})
```
:::

**3. Import Tailwind CSS and Bitrix24 UI in your CSS**

::: code-group
```css [assets/css/main.css]
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";
/**
 * @see https://github.com/tailwindlabs/tailwindcss/issues/16733#issuecomment-2676450404
 */
@source "../../../node_modules/@bitrix24/b24ui-nuxt/.nuxt";
```
:::

::: tip
Use the `css` property in your `nuxt.config.ts` to import your CSS file.

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@bitrix24/b24ui-nuxt'],
  css: ['~/assets/css/main.css']
})
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
}
```
:::


**4. Wrap your app with App component**

::: code-group
```vue [app.vue]
<template>
  <B24App>
    <NuxtPage />
  </B24App>
</template>
```
:::

::: tip
The [`App`](/components/app) component provides global configurations and is required for **Toast** and **Tooltip** components to work.
:::

## Options

You can customize Bitrix24 UI by providing options in your `nuxt.config.ts`.

### `colorMode`

Use the `colorMode` option to enable or disable the [`@nuxt/color-mode`](https://github.com/nuxt-modules/color-mode) module.

- Default: `true`{lang="ts-type"}

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@bitrix24/b24ui-nuxt'],
  b24ui: {
    colorMode: false
  }
})
```
:::
