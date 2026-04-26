---
name: b24-ui-nuxt
description: Build UIs with @bitrix24/b24ui-nuxt v2 — 125+ accessible Vue components with Tailwind CSS theming. Use when creating interfaces, building forms, or composing layouts for Bitrix24 application.
---

# Bitrix24 UI

Vue component library built on [Reka UI](https://reka-ui.com/) + [Tailwind CSS](https://tailwindcss.com/) + [Tailwind Variants](https://www.tailwind-variants.org/). Works with Nuxt, Vue (Vite), Laravel (Vite + Inertia), and AdonisJS (Vite + Inertia).

## LLMs.txt

For component API details (props, slots, events, full documentation, examples), use the [Bitrix24 UI documentation](https://bitrix24.github.io/b24ui/llms.txt). If not already configured, add it.

When you need to know **what a component accepts** or **how its API works**, use the [Bitrix24 UI documentation](https://bitrix24.github.io/b24ui/llms.txt). This skill teaches you **when to use which component** and **how to build well**.

## Core rules (always apply)

1. **Always wrap the app in `B24App`** — required for toasts, tooltips, and programmatic overlays. Accepts a `locale` prop for i18n.
2. **Always use semantic colors** — `text-description`, `bg-elevated`, `border-muted`, etc. Never use raw Tailwind palette colors like `text-gray-500`.
3. **Read generated theme files for slot names** — Nuxt: `.nuxt/ui/<component>.ts`, Vue: `node_modules/.b24ui-nuxt/b24ui/<component>.ts`. These show every slot, variant, and default class for any component.
4. **Override priority** (highest wins): `b24ui` prop / `class` prop → global config → theme defaults.
5. See [icons guideline](references/guidelines/icons.md) for find icons.

## How to use this skill

Based on the task, load the relevant reference files **before writing any code**. Don't load everything — only what's needed.

### Reference files

**Guidelines** — design decisions and conventions:
- [design-system](references/guidelines/design-system.md) — semantic colors, theming, brand customization, variants, the `b24ui` prop
- [component-selection](references/guidelines/component-selection.md) — decision matrices: when to use Modal vs Slideover, Select vs SelectMenu, Toast vs Alert, etc.
- [conventions](references/guidelines/conventions.md) — coding patterns, slot naming, items arrays, composables, keyboard shortcuts
- [forms](references/guidelines/forms.md) — form validation, field layout, error handling, Standard Schema
- [icons](references/guidelines/icons.md) — import icon and use it

**Layouts** — full page structure patterns:
- [landing](references/layouts/landing.md) — landing pages
- [dashboard](references/layouts/dashboard.md) — admin UI with sidebar and panels

**Recipes** — complete patterns for common tasks:
- [data-tables](references/recipes/data-tables.md) — tables with filters, pagination, sorting, selection
- [overlays](references/recipes/overlays.md) — modals, slideovers, drawers, command palette
- [navigation](references/recipes/navigation.md) — headers, sidebars, breadcrumbs, tabs

**Quick reference:**
- [components](references/components.md) — categorized component index for finding the right component name

### Routing table

| Task | Load these references |
|---|---|
| Build application for Bitrix24 / a dashboard / admin UI | conventions, component-selection, dashboard |
| Build a landing page | design-system, conventions, landing |
| Add a settings page | conventions, forms |
| Create a login / signup form | conventions, forms, auth |
| Display data in a table | conventions, component-selection, data-tables |
| Add a chat interface | conventions, chat |
| Add a modal, slideover, or drawer | conventions, component-selection, overlays |
| Build site navigation | conventions, component-selection, navigation |
| Add a rich text editor | conventions, editor |
| General UI work | conventions, component-selection |

## Installation

### Nuxt

```bash
pnpm add @bitrix24/b24ui-nuxt @bitrix24/b24icons-vue tailwindcss
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@bitrix24/b24ui-nuxt'],
  css: ['~/assets/css/main.css']
})
```

```css
/* app/assets/css/main.css */
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";
```

```vue
<!-- app.vue -->
<template>
  <B24App>
    <NuxtPage />
  </B24App>
</template>
```

### Vue (Vite)

```bash
pnpm add @bitrix24/b24ui-nuxt @bitrix24/b24icons-vue tailwindcss
```

```ts
// vite.config.ts
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

```ts
// src/main.ts
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

```css
/* src/assets/css/main.css */
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";
```

```vue
<!-- src/App.vue -->
<template>
  <B24App>
    <RouterView />
  </B24App>
</template>
```

> Add `class="isolate"` to your root `<div id="app">` in `index.html`.
> For Inertia: use `b24ui({ router: 'inertia' })` in `vite.config.ts`.
