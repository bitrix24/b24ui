# Composables

## useDevice

Detect the current platform (Bitrix24 mobile/desktop app or web) and screen size based.

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

| Property | Type | Description |
| --- | --- | --- |
| `platform` | `Readonly<{name?:PlatformName,version?:string}>` | Raw platform state (readonly) |
| `version` | `ComputedRef<string\|undefined>` | Version string of the Bitrix app (if available) |
| `isWeb` | `ComputedRef<boolean>` | `true` when running in a regular web browser |
| `isBitrixMobile` | `ComputedRef<boolean>` | `true` inside the Bitrix24 mobile app |
| `isBitrixDesktop` | `ComputedRef<boolean>` | `true` inside the Bitrix24 desktop app |
| `screen.current` | `ComputedRefS<creenSize>` | The smallest active breakpoint: `'2xl'|'xl'|'lg'|'md'|'sm'|'xs'` |
| `screen.xs` | `ComputedRef<boolean>` | Width < 640px |
| `screen.sm` | `ComputedRef<boolean>` | Width ≥ 640px |
| `screen.md` | `ComputedRef<boolean>` | Width ≥ 768px |
| `screen.lg` | `ComputedRef<boolean>` | Width ≥ 1024px |
| `screen.xl` | `ComputedRef<boolean>` | Width ≥ 1280px |
| `screen['2xl']` | `ComputedRef<boolean>` | Width ≥ 1536px |
| `screen.isMobile` | `ComputedRef<boolean>` | Width < 768px (alias for `!screen.md` ) |
| `screen.isTablet` | `ComputedRef<boolean>` | Width between 768px and 1023px (alias for `screen.md&&!screen.lg` ) |
| `screen.isDesktop` | `ComputedRef<boolean>` | Width ≥ 1024px (alias for `screen.lg` ) |
| `screen.isLargeDesktop` | `ComputedRef<boolean>` | Width ≥ 1536px (alias for `screen['2xl']` ) |

## useToast

Show notifications. Requires `<B24App>` wrapper.

```ts
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'

const toast = useToast()

toast.add({
  title: 'Success',
  description: 'Item saved',
  color: 'air-primary-success', // air-primary, air-primary-success, air-primary-alert, air-primary-warning, air-primary-copilot, air-secondary
  icon: CircleCheckIcon,
  duration: 5000, // 0 = never dismiss
  actions: [{ label: 'Undo', onClick: () => {} }]
})

toast.remove('toast-id')
toast.clear()
```

## useOverlay

Programmatically create modals, slideovers, drawers.

```ts
const overlay = useOverlay()

// create() returns a reusable instance with open(), close(), patch()
const modal = overlay.create(MyComponent)

// open() accepts props and returns an object with .result (a Promise)
const { result } = modal.open({ title: 'Confirm' })

if (await result) {
  // User confirmed
}

// Inside the overlay component, emit close with a value:
// emit('close', true) or emit('close', false)

// You can also close from outside:
modal.close(false)
```

## defineShortcuts

Define keyboard shortcuts.

```ts
defineShortcuts({
  meta_k: () => openSearch(),        // Cmd+K (Mac) / Ctrl+K (Win)
  meta_shift_p: () => openPalette(), // Cmd+Shift+P
  escape: () => close(),
  ctrl_s: () => save(),

  // With condition
  meta_enter: {
    handler: () => submit(),
    whenever: [isFormValid]
  }
})
```

| Key | Meaning |
|---|---|
| `meta` | Cmd (Mac) / Ctrl (Windows) |
| `ctrl` | Ctrl key |
| `alt` | Alt / Option key |
| `shift` | Shift key |
| `_` | Key separator |

## useConfetti

Performant confetti animation.

```ts
const confetti = useConfetti()

function fireConfetti(): void {
  confetti.fire()
}
```

## defineLocale / extendLocale

i18n locale definition.

```ts
import { fr } from '@nuxt/ui/locale'

// Use a built-in locale (50+ available)
// <B24App :locale="fr">

// Define custom locale
const locale = defineLocale({
  name: 'Español',
  code: 'es',
  dir: 'ltr',
  messages: {
    select: { placeholder: 'Seleccionar...' }
  }
})

// Extend existing locale
import { en } from '@nuxt/ui/locale'

const customEn = extendLocale(en, {
  messages: { commandPalette: { placeholder: 'Search a component...' } }
})
```

```vue
<B24App :locale="fr"><NuxtPage /></B24App>
```

## extractShortcuts

Extract shortcut keys from a list of items (e.g., dropdown menu items) into a shortcuts map for `defineShortcuts`.

```ts
const items = [
  { label: 'New file', kbds: ['meta', 'n'], onSelect: () => newFile() },
  { label: 'Save', kbds: ['meta', 's'], onSelect: () => save() }
]

defineShortcuts(extractShortcuts(items))
```

## Quick reference

| Composable | Purpose |
|---|---|
| `useDevice` | Detect platform (mobile/desktop app or web) and screen size |
| `useToast` | Show notifications |
| `useOverlay` | Programmatic modals/slideovers |
| `defineShortcuts` | Keyboard shortcuts |
| `useConfetti` | Performant confetti animation |
| `defineLocale` / `extendLocale` | i18n locale |
| `extractShortcuts` | Parse shortcut definitions |
