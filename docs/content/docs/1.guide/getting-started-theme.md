---
title: Theme
description: 'Learn how to customize Bitrix24 UI components using Tailwind CSS v4, CSS variables and the Tailwind Variants API for powerful and flexible theming.'
outline: deep
---

# Theme

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

## Tailwind CSS

Bitrix24 UI uses Tailwind CSS v4.

### `@theme`

Tailwind CSS v4 takes a CSS-first configuration approach, you now customize your theme with CSS variables inside a [`@theme`](https://tailwindcss.com/docs/functions-and-directives#theme-directive) directive to define your project's custom design tokens, like fonts, colors, and breakpoints:

```css
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";

@theme static {
  --air-theme-bg-image: url(/bg/edge-dark-v1.jpg);
  --air-theme-bg-image-blurred: url(/bg/edge-dark-v1-blurred.webp);
  --air-theme-bg-position: 0 0;
  --air-theme-bg-size: cover;
  --air-theme-bg-repeat: no-repeat;
  --air-theme-bg-attachment: fixed;
  --air-theme-bg-color: #162345;
}
```

The `@theme` directive tells Tailwind to make new utilities and variants available based on these variables. It's the equivalent of the `theme.extend` key in Tailwind CSS v3 `tailwind.config.ts` file.

::: tip
Learn [more](https://tailwindcss.com/docs/theme) about customizing your theme in the theme variables documentation.
:::

### `@source`

You can use the [`@source` directive](https://tailwindcss.com/docs/functions-and-directives#source-directive) to explicitly specify source files that aren't picked up by Tailwind's automatic content detection:

```css
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";

@source "../../../..";
```

### contexts

Bitrix24 interface components automatically adapt to different backgrounds.  
To ensure this works correctly, the appropriate context must be set.  
This guarantees optimal readability and visual harmony.

#### light

The standard context for light solid-color backgrounds.

**Examples:** White or light-gray panels (`#ffffff`, `#eef2f4`).

#### dark

For dark solid-color backgrounds. Text and icons become light.

**Examples:** Dark gray or black side panels (`#161618`, `#000000`).

#### edge-light

For elements placed over light background images. Components use additional effects (such as subtle shadows) to better stand out against complex backgrounds.

#### edge-dark

For elements placed over dark background images. Like edge-light, it ensures clear contrast and visibility on non-uniform backgrounds.

#### CSS Variables

Для реализации контекстов фона используются CSS-переменные.

* `--air-theme-bg-image`: Основное фоновое изображение.
* `--air-theme-bg-image-blurred`: Размытая версия изображения.
* `--air-theme-bg-size`: Масштабирование изображения.
* `--air-theme-bg-repeat`: Повторение изображения.
* `--air-theme-bg-color`: Цвет подложки. Этот цвет выполняет две важные роли: 1) служит фаллбэком на случай, если изображение не загрузится; 2) задаёт основной тон.

Example:

```css
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";

@layer base {
  .light,
  :root {
    --air-theme-bg-color: #eef2f4;
  }

  .dark {
    --air-theme-bg-color: #000000;
  }
  .edge-light {
    --air-theme-bg-image: url(/bg/edge-light-v1.svg);
    --air-theme-bg-image-blurred: url(/bg/edge-light-v1-blurred.webp);
    --air-theme-bg-position: 0 0;
    --air-theme-bg-size: 240px 240px;
    --air-theme-bg-repeat: repeat;
    --air-theme-bg-attachment: fixed;
    --air-theme-bg-color: #f1dbdb87;
  }

  .edge-dark {
    --air-theme-bg-image: url(/bg/edge-dark-v1.jpg);
    --air-theme-bg-image-blurred: url(/bg/edge-dark-v1-blurred.webp);
    --air-theme-bg-position: 0 0;
    --air-theme-bg-size: cover;
    --air-theme-bg-repeat: no-repeat;
    --air-theme-bg-attachment: fixed;
    --air-theme-bg-color: #162345;
  }
}
```

## Components theme

Bitrix24 UI components are styled using the [Tailwind Variants](https://www.tailwind-variants.org/) API, which provides a powerful way to create variants and manage component styles.
Let's explore the key features of this API:

### Slots

Components in Bitrix24 UI can have multiple `slots`, each representing a distinct HTML element or section within the component.
These slots allow for flexible content insertion and styling. Let's take the [AvatarGroup](/docs/components/avatar-group/) component as an example:

```ts
export default {
  slots: {
    root: 'inline-flex justify-end',
    base: 'relative rounded-full last:me-0'
  }
}
```

Some components don't have slots, they are just composed of a single root element. In this case, the theme only defines the `base` slot like the [Container](/docs/components/container/) component for example:

```ts
export default {
  slots: {
    base: 'w-full max-w-[1280px] mx-auto px-[22px]'
  }
}
```

### Variants

Bitrix24 UI components use `variants` to change the `slots` styles based on props. Here's an example of the [Avatar](/docs/components/avatar/) component:

```ts
export default {
  slots: {
    // ...
  },
  variants: {
    size: {
      '3xs': {
        root: 'size-[10px] text-4xs font-(--ui-font-weight-regular)',
        icon: 'size-[10px]'
      },
      '2xs': {
        root: 'size-[20px] text-(length:--ui-font-size-4xs)/(--ui-font-line-height-reset) font-(--ui-font-weight-regular)',
        icon: 'size-[20px]'
      },
      'xs': {
        root: 'size-[24px] text-(length:--ui-font-size-3xs)/(--ui-font-line-height-reset) font-(--ui-font-weight-regular)',
        icon: 'size-[24px]'
      },
      'sm': {
        root: 'size-[28px] text-(length:--ui-font-size-xs)/(--ui-font-line-height-reset)',
        icon: 'size-[28px]'
      },
      'md': {
        root: 'size-[32px] text-(length:--ui-font-size-sm)/(--ui-font-line-height-reset)',
        icon: 'size-[32px]'
      },
      'lg': {
        root: 'size-[42px] text-(length:--ui-font-size-2xl)/(--ui-font-line-height-reset)',
        icon: 'size-[42px]'
      },
      'xl': {
        root: 'ring-2 size-[48px] text-(length:--ui-font-size-2xl)/(--ui-font-line-height-reset)',
        icon: 'size-[48px]'
      },
      '2xl': {
        root: 'ring-2 size-[60px] text-(length:--ui-font-size-5xl)/(--ui-font-line-height-reset)',
        icon: 'size-[60px]'
      },
      '3xl': {
        root: 'ring-2 size-[94px] text-[34px]/(--ui-font-line-height-reset)',
        icon: 'size-[94px]'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
}
```
This way, the `size` prop will apply the corresponding styles to the `root` slot:

```vue
<template>
  <B24Avatar src="..." size="lg" />
</template>
```

The `defaultVariants` property specifies the default values for each variant. It determines how a component looks and behaves when no prop is provided.

## Customize theme

You have multiple ways to customize the appearance of Nuxt UI components, you can do it for all components at once or on a per-component basis.

::: tip
Tailwind Variants uses [`tailwind-merge`](https://github.com/dcastil/tailwind-merge) under the hood to merge classes so you don't have to worry about conflicting classes.
:::

::: info
You can explore the theme for each component in the GitHub repository at [src/theme](https://github.com/bitrix24/b24ui/tree/main/src/theme).
:::

### `b24ui` prop

You can also override a component's **slots** using the `b24ui` prop. This has priority over the global configuration and `variants` resolution.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import Expand1Icon from '@bitrix24/b24icons-vue/actions/Expand1Icon'

const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const value = ref('My company details')
</script>

<template>
  <B24Select
    v-model="value"
    :items="items"
    :trailing-icon="Expand1Icon"
    :b24ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
  />
</template>
```

### `class` prop

The `class` prop allows you to override the classes of the `root` or `base` slot.
This has priority over the global configuration and `variants` resolution.

```vue
<template>
  <B24Button class="font-bold rounded-full">Button</B24Button>
</template>
```
