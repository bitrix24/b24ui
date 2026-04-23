---
title: useDevice
description: Detect the current platform (Bitrix24 mobile/desktop app or web) and screen size based on Tailwind breakpoints.
links:
  - label: useDevice
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/useDevice.ts
  - label: plugin Platform
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/plugins/platform.ts
---

## Usage

The composable is auto‑imported in Nuxt. It combines the platform detection from the Bitrix plugin with reactive screen‑size queries.

```vue
<script setup lang="ts">
const { isBitrixMobile, screen } = useDevice()
</script>
```

- Platform detection is based on the `User‑Agent`{lang="ts-type"} header and is globally shared via `useState`{lang="ts-type"}.
- Screen‑size flags are powered by `useMediaQuery`{lang="ts-type"} from VueUse, so they update reactively when the viewport changes.

::note
On the server, screen‑size flags default to `false`{lang="ts-type"}. Hydration will work correctly because the client values will eventually take over.
::

## API

The composable returns an object with the following properties:

### Platform

| Property | Type | Description |
|---|---|---|
| `platform`{lang="ts-type"} | `Readonly<{ name?: PlatformName, version?: string }>`{lang="ts-type"} | Raw platform state (readonly)  |
| `version`{lang="ts-type"} | `ComputedRef<string \| undefined>`{lang="ts-type"} | Version string of the Bitrix app (if available) |
| `isWeb`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | `true` when running in a regular web browser |
| `isBitrixMobile`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | `true` inside the Bitrix24 mobile app  |
| `isBitrixDesktop`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | `true` inside the Bitrix24 desktop app |

### Screen

The `screen` object contains reactive flags for every Tailwind breakpoint (xs, sm, md, lg, xl, 2xl) and a few convenience shortcuts.

| Property | Type | Description |
|-------------------|--------------------------|-------------------------------------------------------------------------|
| `screen.current`{lang="ts-type"} | `ComputedRef<ScreenSize>`{lang="ts-type"} | The smallest active breakpoint: `'2xl' \| 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs'` |
| `screen.xs`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Width < 640px |
| `screen.sm`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Width ≥ 640px |
| `screen.md`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Width ≥ 768px |
| `screen.lg`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Width ≥ 1024px  |
| `screen.xl`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Width ≥ 1280px  |
| `screen['2xl']`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Width ≥ 1536px  |
| `screen.isMobile`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Width < 768px (alias for `!screen.md`)  |
| `screen.isTablet`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Width between 768px and 1023px (alias for `screen.md && !screen.lg`)  |
| `screen.isDesktop`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Width ≥ 1024px (alias for `screen.lg`)  |
| `screen.isLargeDesktop`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Width ≥ 1536px (alias for `screen['2xl']`) |

## Example

### Basic usage – platform and mobile screen

::component-example
---
collapse: false
name: 'use-device-example'
---
::

### Conditional rendering based on current breakpoint

::component-example
---
collapse: false
name: 'use-device-current-breakpoint-example'
---
::

### Using screen flags in template logic

::component-example
---
collapse: false
name: 'use-device-screen-flags-in-template-logic-example'
---
::

### Combine with Tailwind CSS classes

Because the [plugin](https://github.com/bitrix24/b24ui/blob/main/src/runtime/plugins/platform.ts) already adds `data-platform` and `data-version` attributes to the `<html>` tag, you can use [Tailwind variants](https://github.com/bitrix24/b24ui/blob/09b6f208a51d85703770ac599b742c844259a0b3/src/runtime/index.css#L10) like `bitrix-mobile:` directly in your templates.

::component-example
---
collapse: false
name: 'use-device-with-tailwind-example'
---

## Notes

- The platform detection relies on the Bitrix plugin. If the plugin is not installed, `platform.name`{lang="ts-type"} will be `undefined`{lang="ts-type"}.
- Screen‑size flags are based on the **default Tailwind breakpoints**. It won't be possible to change them.
- All screen‑size flags are `ComputedRef<boolean>`{lang="ts-type"} – they can be used directly in the template and are reactive.
