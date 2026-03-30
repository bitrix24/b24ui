---
name: b24-ui-nuxt
description: Build UIs with @bitrix24/b24ui-nuxt v2 — 125+ accessible Vue components with Tailwind CSS theming. Use when creating interfaces, building forms, or composing layouts for Bitrix24 application.
---

# Bitrix24 UI

Vue component library built on [Reka UI](https://reka-ui.com/) + [Tailwind CSS](https://tailwindcss.com/) + [Tailwind Variants](https://www.tailwind-variants.org/). Works with Nuxt, Vue (Vite), Laravel (Inertia), and AdonisJS (Inertia).

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
/* assets/main.css */
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

> **Vue**: Add `class="isolate"` to your root `<div id="app">` in `index.html`.

> **Vue + Inertia**: Use `b24UiPlugin({ router: 'inertia' })` in `vite.config.ts`.

### B24App

Wrapping your app in `B24App` is **required** — it provides global config for toasts, tooltips, and programmatic overlays. It also accepts a `locale` prop for i18n (see [composables reference](references/composables.md)).

## Icons

Bitrix24 UI uses [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/) for 1,400+ icons.

### Usage in Component props

Import the icon to use it:

```vue
<script setup>
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
</script>

<template>
  <B24Button :icon="RocketIcon">Button</B24Button>
</template>
```

### Usage Icon component

Import the icon to use it:

```vue
<script setup>
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
</script>

<template>
  <Bitrix24Icon class="size-15" />
</template>
```

> Browse all icons at [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/icons/).

## Theming & Branding

Bitrix24 UI provides a native look and feel out of the box, so your app fits the environment perfectly without extra styling.

**Always use semantic utilities** (`text-default`, `bg-elevated`, `border-muted`), never raw Tailwind palette colors. See [references/theming.md](references/theming.md) for the full list.

### Customizing components

**Override priority** (highest wins): `b24ui` prop / `class` prop > theme defaults.

The `b24ui` prop overrides a component's **slots** after variants are computed — it wins over everything:

```vue
<B24Button :b24ui="{ base: 'rounded-none', trailingIcon: 'size-3 rotate-90' }" />
<B24Card :b24ui="{ header: 'bg-muted', body: 'p-8' }" />
```

**Read the generated theme file** to find slot names for any component:

- **Nuxt**: `.nuxt/b24ui/<component>.ts`
- **Vue**: `node_modules/.b24ui-nuxt/b24ui/<component>.ts`

> For CSS variables, custom colors, compound variants, see [references/theming.md](references/theming.md)

## Composables

```vue
<script setup lang="ts">
// Detect platform (Bitrix24 mobile/desktop app or web) and screen size
const { isBitrixMobile, screen } = useDevice()
</script>

<template>
  <div>
    <p v-if="isBitrixMobile">ou are using the Bitrix24 mobile app on a small screen.</p>
    <p v-else-if="screen.isMobile">Regular web browser on a small screen.</p>
    <p v-else-if="!isBitrixMobile && (!screen.isMobile)">Regular web browser on a desktop.</p>
    <p v-else>Other combination.</p>
  </div>
</template>
```

```ts
// Notifications
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'
const toast = useToast()
toast.add({ title: 'Saved', color: 'air-primary-success', icon: CircleCheckIcon })

// Programmatic overlays
const overlay = useOverlay()
const modal = overlay.create(MyModal)
const { result } = modal.open({ title: 'Confirm' })
await result

// Keyboard shortcuts
defineShortcuts({
  meta_k: () => openSearch(),
  escape: () => close()
})

// useConfetti
const confetti = useConfetti()
confetti.fire()
```

> For full composable reference, see [references/composables.md](references/composables.md)

## Form validation

Uses Standard Schema — works with Zod, Valibot, Yup, or Joi.

```vue
<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters')
})

type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({ email: '', password: '' })

function onSubmit() {
  // UForm validates before emitting @submit — state is valid here
}
</script>

<template>
  <B24Form :schema="schema" :state="state" @submit="onSubmit">
    B24FormField name="email" label="Email" required>
      <B24Input v-model="state.email" type="email" />
    </B24FormField>

    <B24FormField name="password" label="Password" required>
      <B24Input v-model="state.password" type="password" />
    </B24FormField>

    <B24Button color="air-primary" type="submit">Sign in</B24Button>
  </B24Form>
</template>
```

> For all form components and validation patterns, see [references/components.md](references/components.md#form)

## Overlays

```vue
<template>
  <!-- Modal -->
  <B24Modal v-model:open="isOpen" title="Edit" description="Edit your profile">
    <template #body>Content</template>
    <template #footer>
      <B24Button
        size="lg"
        color="air-primary"
        label="Reload"
        loading-auto
        @click="save"
      />
      <B24Button
        size="sm"
        color="air-tertiary"
        label="Cancel"
        :normal-case="false"
        @click="isOpen = false"
      />
    </template>
  </B24Modal>
</template>
```

```vue

```vue
<template>
  <!-- Slideover (side panel) -->
  <B24Slideover v-model:open="isOpen" title="Settings">
    <template #body>Content</template>
    <template #footer>
      <B24Button
        size="lg"
        color="air-primary"
        label="Reload"
        loading-auto
        @click="save"
      />
      <B24Button
        size="sm"
        color="air-tertiary"
        label="Cancel"
        :normal-case="false"
        @click="isOpen = false"
      />
    </template>
  </B24Slideover>
</template>
```

```vue
<script setup lang="ts">
import MoreLIcon from '@bitrix24/b24icons-vue/outline/MoreLIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'
</script>

<template>
  <!-- Dropdown menu (flat array) -->
  <B24DropdownMenu
    :items="[
      { label: 'Edit', icon: PersonIcon, onSelect: () => edit() },
      { type: 'separator' },
      { label: 'Delete', icon: TrashcanIcon, color: 'air-primary-alert' }
    ]"
    :content="{ side: 'bottom', align: 'end' }"
  >
    <B24Button :icon="MoreLIcon" color="air-secondary-accent" />
  </B24DropdownMenu>
</template>
```

```vue
<script setup lang="ts">
import MoreLIcon from '@bitrix24/b24icons-vue/outline/MoreLIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import CopyIcon from '@bitrix24/b24icons-vue/outline/CopyIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'
</script>

<template>
  <!-- Dropdown menu (nested array — groups with automatic separators) -->
  <B24DropdownMenu
    :items="[
      [{ label: 'Edit', icon: PersonIcon, onSelect: () => edit() }, { label: 'Duplicate', icon: CopyIcon }],
      [{ label: 'Delete', icon: TrashcanIcon, color: 'air-primary-alert' }]
    ]"
    :content="{ side: 'bottom', align: 'end' }"
  >
    <B24Button :icon="MoreLIcon" color="air-secondary-accent" />
  </B24DropdownMenu>
</template>
```

> For all overlay components, see [references/components.md](references/components.md#overlay)

## Layouts

Bitrix24 UI provides components to compose full page layouts. Load the reference matching your use case:

| Layout | Description | Reference |
|---|---|---|
| Dashboard | App UI with resizable sidebar and panels | [layouts/dashboard.md](references/layouts/dashboard.md) |

## Templates

Official starter templates:

| Template | Framework | GitHub |
|---|---|---|
| Dashboard | Nuxt | [bitrix24/templates-dashboard](https://github.com/bitrix24/templates-dashboard) |
| Dashboard | Vue | [bitrix24/templates-dashboard-vu](https://github.com/bitrix24/templates-dashboard-vue) |

> When starting a new project, clone the matching template instead of setting up from scratch.

## Additional references

Load based on your task — **do not load all at once**:

- [references/theming.md](references/theming.md) — CSS variables, component theme overrides
- [references/components.md](references/components.md) — all 125+ components by category with props and usage
- [references/composables.md](references/composables.md) — useDevice, useToast, useOverlay, defineShortcuts, useConfetti
- Generated theme files — all slots, variants, and default classes for any component (Nuxt: `.nuxt/b24ui/<component>.ts`, Vue: `node_modules/.b24ui-nuxt/b24ui/<component>.ts`)
