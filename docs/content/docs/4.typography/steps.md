---
title: Steps
description: 'Transform headings into numbered step-by-step guides and tutorials.'
category: components
links:
  - label: GitHub
    iconName: GitHubIcon
    icon: i-simple-icons-github
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/Steps.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/steps
---

## Usage

Wrap your headings with the Steps component to display a list of steps.

Use the `level` prop to define which heading will be used for the steps.

:::code-preview{class="[&>div]:*:w-full"}
::steps{level="4"}

#### Add the Bitrix24 UI module in your `nuxt.config.ts`

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@bitrix24/b24ui-nuxt']
})
```

#### Import Tailwind CSS in your CSS

```css [assets/css/main.css]
@import "tailwindcss";
```

#### Start your development server

```bash
npm run dev
```

::

#code

````mdc
::steps{level="4"}

#### Add the Bitrix24 UI module in your `nuxt.config.ts`

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@bitrix24/b24ui-nuxt']
})
```

#### Import Tailwind CSS in your CSS

```css [assets/css/main.css]
@import "tailwindcss";
```

#### Start your development server

```bash
npm run dev
```

::
````

:::

## API

### Props

:component-props{prose}

### Slots

:component-slots{prose}

## Theme

:component-theme{prose}
