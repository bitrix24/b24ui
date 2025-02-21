# Bitrix24 UI

Bitrix24 UI for developing web applications REST API for NUXT & VUE

Find more details in the [documentation](https://bitrix24.github.io/b24ui/)

## Installation

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
yarn add @bitrix24/b24ui-nuxt
yarn add @bitrix24/b24icons-vue
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

Learn more in the [installation guide](https://bitrix24.github.io/b24ui/guide/installation-nuxt-app.html).

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

Learn more in the [installation guide](https://bitrix24.github.io/b24ui/guide/installation-vue.html).

## Credits

- [nuxt/nuxt](https://github.com/nuxt/nuxt)
- [nuxt/ui](https://github.com/nuxt/ui)
- [nuxt-modules/color-mode](https://github.com/nuxt-modules/color-mode)
- [unovue/reka-ui](https://github.com/unovue/reka-ui)
- [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)
- [vueuse/vueuse](https://github.com/vueuse/vueuse)
