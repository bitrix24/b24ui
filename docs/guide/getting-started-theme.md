---
title: Theme
description: 'Learn how to customize Bitrix24 UI components using Tailwind CSS v4, CSS variables and the Tailwind Variants API for powerful and flexible theming.'
---

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

## Tailwind CSS

Bitrix24 UI uses Tailwind CSS v4, you can read the official [upgrade guide](https://tailwindcss.com/docs/upgrade-guide#changes-from-v3) to learn about all the breaking changes.

### `@theme`

Tailwind CSS v4 takes a CSS-first configuration approach, you now customize your theme with CSS variables inside a [`@theme`](https://tailwindcss.com/docs/functions-and-directives#theme-directive) directive to define your project's custom design tokens, like fonts, colors, and breakpoints:

@todo

The `@theme` directive tells Tailwind to make new utilities and variants available based on these variables. It's the equivalent of the `theme.extend` key in Tailwind CSS v3 `tailwind.config.ts` file.

::: tip
Learn [more](https://tailwindcss.com/docs/theme) about customizing your theme in the theme variables documentation.
:::

### `@source`

You can use the [`@source` directive](https://tailwindcss.com/docs/functions-and-directives#source-directive) to explicitly specify source files that aren't picked up by Tailwind's automatic content detection:

This can be useful when writing Tailwind CSS classes in markdown files with [`@nuxt/content`](https://github.com/nuxt/content) for example:

@todo

::: tip
Learn [more](https://tailwindcss.com/docs/detecting-classes-in-source-files) about automatic content detection in the detecting classes in source files documentation.
:::

## Design system

Bitrix24 UI extends Tailwind CSS's theming capabilities, providing a flexible design system with pre-configured color aliases based on [Tailwind CSS colors](https://tailwindcss.com/docs/customizing-colors#color-palette-reference). This allows for easy customization and quick adaptation of the UI to your brand's aesthetic.

@todo

### Configuration for Nuxt

You can configure these color aliases at runtime in your [`app.config.ts`](https://nuxt.com/docs/guide/directory-structure/app-config#app-config-file) file under the `b24ui.colors` key, allowing for dynamic theme customization without requiring an application rebuild:

@todo

### Configuration for Vue

You can configure these color aliases at runtime in your `vite.config.ts` file under the `b24ui.colors` key:

@todo

::: warning
When configuring your theme colors, you must use either color names from the [default Tailwind palette](https://tailwindcss.com/docs/colors) (like 'blue', 'green', etc.) or reference custom colors that you've previously defined in your [CSS file](#theme).
:::

## CSS Variables

Bitrix24 UI leverages a robust system of CSS variables as design tokens to ensure consistent and flexible component styling. These tokens form the foundation of the theming system, offering smooth support for both light and dark modes.

### Colors

Bitrix24 UI provides a CSS variable for each color alias you define which represent the default shade used in both light and dark modes:

@todo

These CSS variables are defined in Tailwind CSS's `@theme` so you can use them as classes:

@todo

## Components theme

Bitrix24 UI components are styled using the [Tailwind Variants](https://www.tailwind-variants.org/) API, which provides a powerful way to create variants and manage component styles. Let's explore the key features of this API:

### Slots

Components in Bitrix24 UI can have multiple `slots`, each representing a distinct HTML element or section within the component. These slots allow for flexible content insertion and styling. Let's take the [Card](/components/card) component as an example:

@todo

Some components don't have slots, they are just composed of a single root element. In this case, the theme only defines the `base` slot like the [Container](/components/container) component for example:

@todo

### Variants

Bitrix24 UI components use `variants` to change the `slots` styles based on props. Here's an example of the [Avatar](/components/avatar) component:

@todo

This way, the `size` prop will apply the corresponding styles to the `root` slot:

@todo

The `defaultVariants` property specifies the default values for each variant. It determines how a component looks and behaves when no prop is provided.

## Customize theme

@todo

### Config

@todo

### Props

#### `b24ui` prop

You can also override a component's **slots** using the `b24ui` prop. This has priority over the global configuration and `variants` resolution.

@todo

::: tip
In this example, the `font-bold` class will override the default `font-medium` class on this button.
:::
