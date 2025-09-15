---
title: Content in Nuxt Application
description: 'Bitrix24 UI enriches Nuxt Content with elegant components and design.'
outline: deep
---
# Content in Nuxt Application

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

<Description
  nuxt-ui="https://ui.nuxt.com/getting-started/content"
>
  Bitrix24 UI enriches Nuxt Content with elegant components and design.
</Description>

## Installation

To get started, you can follow the official [guide](https://content.nuxt.com/docs/getting-started/installation) or in summary:

::: code-group

```bash [pnpm]
pnpm add @nuxt/content
```

```bash [yarn]
yarn add @nuxt/content
```

```bash [npm]
npm install @nuxt/content
```

```bash [bun]
bun add @nuxt/content
```

:::

Then, add the `@nuxt/content` module in your `nuxt.config.ts`:

::: code-group

```ts:line-numbers [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
    '@bitrix24/b24ui-nuxt',
    '@nuxt/content' // [!code ++]
  ],
  css: ['~/assets/css/main.css']
})
```

:::

::: danger
You need to register `@nuxt/content after` `@bitrix24/b24ui-nuxt` in the modules array, otherwise the prose components will not be available.
:::

::: tip
If your content includes Tailwind CSS classes, make sure to use the [`@source`](https://tailwindcss.com/docs/detecting-classes-in-source-files) directive in your CSS file.
:::

## Typography

To make the most out of `@nuxt/content` we provide custom implementations of all prose components directly within Bitrix24 UI.

This gives us precise control over styling while ensuring perfect visual harmony with our design system.

::: tip
Learn more about the [Typography](/docs/typography/) system and all the available components.
:::
