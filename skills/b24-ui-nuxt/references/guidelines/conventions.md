# Conventions

Coding patterns specific to Bitrix24 UI.

## Content module integration

When using `@nuxt/content`, it **must** come after `@bitrix24/b24ui-nuxt` in the `modules` array — otherwise prose components won't be available:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@bitrix24/b24ui-nuxt', '@nuxt/content']
})
```

Add `@source` in your CSS so Tailwind generates classes used in markdown/MDC:

```css
/* app/assets/css/main.css */
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";

@source "../../../content/**/*";
```

## IDE setup

Recommended `.vscode/settings.json` for Tailwind IntelliSense autocomplete with Bitrix24 UI:

```json
{
  "files.associations": { "*.css": "tailwindcss" },
  "editor.quickSuggestions": { "strings": "on" },
  "tailwindCSS.classAttributes": ["class", "b24ui"],
  "tailwindCSS.classFunctions": ["defineAppConfig"]
}
```

## B24App wrapper

Always wrap your app in `B24App` — it provides:
- Toast container (`useToast`)
- Tooltip provider
- Programmatic overlay context (`useOverlay`)
- i18n locale support

```vue
<B24App :locale="fr">
  <NuxtPage /> <!-- or <RouterView /> for Vue -->
</B24App>
```

## Icons

Bitrix24 UI uses [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/). See [icons guideline](icons.md) for find icons.

```vue
<script setup>
  import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
</script>

<template>
  <B24Button :icon="RocketIcon">Button</B24Button>
</template>
```

## Slot patterns

Most components follow consistent slot naming:

| Slot | Used by | Purpose |
|---|---|---|
| `#header` | Card, Modal, Slideover, DashboardPanel | Top section |
| `#body` | DashboardPanel | Scrollable content area |
| `#footer` | Card, Modal, Slideover, DashboardPanel | Bottom section |
| `#left` | Page, DashboardNavbar | Left sidebar or content |
| `#right` | Page, DashboardNavbar, Header | Right sidebar or content |
| `#leading` | Input, Button, Alert | Before main content (icon area) |
| `#trailing` | Input, Button | After main content (icon area) |
| `#content` | Modal, Slideover, Popover, Tooltip | Full content override |
| `#default` | Most components | Main content area |

## Items arrays

Many components accept an `items` prop. Two patterns:

**Flat array** — plain list:

```ts
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'

const items = [
  { label: 'Edit', icon: PersonIcon },
  { label: 'Delete', icon: TrashcanIcon, color: 'air-primary-alert' }
]
```

**Nested array** — groups with automatic separators between them:

```ts
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'

const items = [
  [
    { label: 'Edit', icon: PersonIcon },
    { label: 'Duplicate', icon: PersonIcon }
  ],
  [
    { label: 'Delete', icon: TrashcanIcon, color: 'air-primary-alert' }
  ]
]
```

Components supporting nested arrays: `B24DropdownMenu`, `B24ContextMenu`, `B24CommandPalette`, `B24NavigationMenu`.

## Composables

### useToast

```ts
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'

const toast = useToast()

toast.add({
  title: 'Success',
  description: 'Item saved',
  color: 'air-primary-success',
  icon: CircleCheckIcon,
  duration: 5000,
  actions: [{ label: 'Undo', onClick: () => {} }]
})

toast.remove('toast-id')
toast.clear()
```

### useDevice
Detect platform (Bitrix24 mobile/desktop app or web) and screen size

```vue
<script setup lang="ts">
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

### useConfetti

```ts
const confetti = useConfetti()
confetti.fire()
```

### useOverlay

Programmatic modals, slideovers, drawers — no template `v-model` needed. See [overlays recipe](../recipes/overlays.md) for full patterns.

```ts
const overlay = useOverlay()
const modal = overlay.create(MyComponent)
const instance = modal.open({ title: 'Confirm?' })
if (await instance.result) { /* confirmed */ }
```

### defineShortcuts

```ts
defineShortcuts({
  meta_k: () => openSearch(),
  escape: () => close(),
  meta_enter: {
    handler: () => submit(),
    whenever: [isFormValid]
  }
})
```

Keys: `meta` (Cmd/Ctrl), `ctrl`, `alt`, `shift`. Separator: `_`.

### extractShortcuts

Wire up keyboard shortcuts from menu items:

```ts
const items = [
  { label: 'New file', kbds: ['meta', 'n'], onSelect: () => newFile() },
  { label: 'Save', kbds: ['meta', 's'], onSelect: () => save() }
]

defineShortcuts(extractShortcuts(items))
```

### Internationalization (i18n)

Bitrix24 UI supports 50+ locales. Set the locale on `B24App` — all components inherit it.

#### Static locale

```vue
<script setup lang="ts">
import { fr } from '@bitrix24/b24ui-nuxt/locale'
</script>

<template>
  <B24App :locale="fr">
    <NuxtPage />
  </B24App>
</template>
```

#### Extend a built-in locale

`extendLocale` is auto-imported. Override specific messages or the `code` (affects date/time formatting in Calendar, InputDate, InputTime):

```ts
import { en } from '@bitrix24/b24ui-nuxt/locale'

const locale = extendLocale(en, {
  code: 'en-AU',
  messages: {
    commandPalette: { placeholder: 'Search a component...' }
  }
})
```

#### Custom locale from scratch

```ts
import type { Messages } from '@bitrix24/b24ui-nuxt'

const locale = defineLocale<Messages>({
  name: 'My locale',
  code: 'en',
  dir: 'ltr',
  messages: {
    // all component message keys
  }
})
```

#### Dynamic locale with @nuxtjs/i18n

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@bitrix24/b24ui-nuxt', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', name: 'English' },
      { code: 'fr', name: 'Français' },
      { code: 'ar', name: 'العربية' }
    ]
  }
})
```

```vue
<script setup lang="ts">
import * as locales from '@bitrix24/b24ui-nuxt/locale'

const { locale } = useI18n()

const lang = computed(() => locales[locale.value]?.code)
const dir = computed(() => locales[locale.value]?.dir)

useHead({
  htmlAttrs: { lang, dir }
})
</script>

<template>
  <B24App :locale="locales[locale]">
    <NuxtPage />
  </B24App>
</template>
```

Each locale has a `dir` property (`'ltr'` or `'rtl'`). `B24App` uses it to set directionality on all components. Use `useHead` to propagate `lang` and `dir` to the `<html>` element.

## Color mode

Bitrix24 UI registers `useColorMode` from `@vueuse/core` automatically. Built-in components for switching:
- `B24ColorModeButton` — single button toggle (light/dark)
- `B24ColorModeSwitch` — toggle switch
- `B24ColorModeSelect` — dropdown with system/light/dark options
- `B24ColorModeAvatar` — displays different avatar per mode
- `B24ColorModeImage` — displays different image per mode

For custom color mode UI, use `useColorMode` with `ClientOnly` to avoid hydration mismatch:

```vue
<script setup lang="ts">
import { useColorMode } from '#imports'

const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (v) => { colorMode.preference = v ? 'dark' : 'light' }
})
</script>

<template>
  <ClientOnly>
    <B24Switch v-model="isDark" />
    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>
```

## Official templates

Bootstrap a project from a template instead of starting from scratch:

**Dashboard**
```bash
git clone https://github.com/bitrix24/templates-dashboard.git <project-name>
cd <project-name>
pnpm install
pnpm run dev
```

**Starter**
```bash
git clone https://github.com/bitrix24/starter-b24ui.git <project-name>
cd <project-name>
pnpm install
pnpm run dev
```

## Responsive patterns

- Dashboard sidebar hides on mobile, shows a slideover/drawer via `B24DashboardSidebar` `mode` prop
- `B24Header` body slot is the mobile menu content (shown when hamburger is tapped)
- Most components handle responsiveness automatically — avoid manual breakpoint classes unless needed
- Use `B24PageAside` for sidebars that should hide below `lg` breakpoint
