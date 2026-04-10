# Bitrix24 UI

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Bitrix24 UI][b24ui-src]][b24ui-href]

Bitrix24 UI for developing web applications REST API for NUXT & VUE

Find more details in the [documentation](https://bitrix24.github.io/b24ui/)

## Documentation

Visit https://bitrix24.github.io/b24ui/ to explore the documentation.

## Installation

```bash [pnpm]
pnpm add @bitrix24/b24ui-nuxt @bitrix24/b24icons-vue tailwindcss
```

```bash [yarn]
yarn add @bitrix24/b24ui-nuxt @bitrix24/b24icons-vue tailwindcss
```

```bash [npm]
npm install @bitrix24/b24ui-nuxt @bitrix24/b24icons-vue tailwindcss
```

```bash [bun]
yarn add @bitrix24/b24ui-nuxt @bitrix24/b24icons-vue tailwindcss
```

### Nuxt

1. Add the Bitrix24 UI module in your `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@bitrix24/b24ui-nuxt']
})
```

2. Import Tailwind CSS and Bitrix24 UI in your CSS:

```css [assets/css/main.css]
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";
```

Learn more in the [installation guide](https://bitrix24.github.io/b24ui/docs/getting-started/installation/nuxt/).

### Vue

1. Add the Bitrix24 UI Vite plugin in your `vite.config.ts`:

```ts [vite.config.ts]
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

2. Use the Bitrix24 UI Vue plugin in your `main.ts`:

```ts [main.ts]
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

3. Import Tailwind CSS and Bitrix24 UI in your CSS:

```css [assets/main.css]
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";
```

Learn more in the [installation guide](https://bitrix24.github.io/b24ui/docs/getting-started/installation/vue/).

## Contribution

Thank you for considering contributing to Bitrix24 UI. Here are a few ways you can get involved:

- Reporting Bugs: If you come across any bugs or issues, please check out the reporting bugs guide to learn how to submit a bug report.
- Suggestions: Have any thoughts to enhance Bitrix24 UI? We'd love to hear them! Check out the [contribution guide](https://bitrix24.github.io/b24ui/docs/getting-started/contribution/) to share your suggestions.

> [!TIP]
> We provide contributing guidelines through [`AGENTS.md`](https://github.com/bitrix24/b24ui/blob/main/AGENTS.md) for AI assistants to help you contribute to Bitrix24 UI. It is automatically picked up by all AI coding agents and guides through component structure, theming patterns, testing conventions, and documentation guidelines.

## Credits

- [nuxt/nuxt](https://github.com/nuxt/nuxt)
- [nuxt/ui](https://github.com/nuxt/ui)
- [unovue/reka-ui](https://github.com/unovue/reka-ui)
- [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)
- [vueuse/vueuse](https://github.com/vueuse/vueuse)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@bitrix24/b24ui-nuxt.svg?style=flat&colorA=020420&colorB=2fc6f6
[npm-version-href]: https://www.npmjs.com/package/@bitrix24/b24ui-nuxt

[npm-downloads-src]: https://img.shields.io/npm/dm/@bitrix24/b24ui-nuxt.svg?style=flat&colorA=020420&colorB=2fc6f6
[npm-downloads-href]: https://npm.chart.dev/@bitrix24/b24ui-nuxt

[license-src]: https://img.shields.io/github/license/bitrix24/b24ui.svg?style=flat&colorA=020420&colorB=2fc6f6
[license-href]: https://github.com/bitrix24/b24ui/blob/main/LICENSE

[b24ui-src]: https://img.shields.io/badge/Bitrix24%20-UI%20Kit-2fc6f6?labelColor=020420
[b24ui-href]: https://apidocs.bitrix24.com/
