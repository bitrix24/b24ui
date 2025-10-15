---
title: CodeGroup
description: 'Use a tabbed layout to present multiple code snippets for a clearer view.'
framework: nuxt
category: components
links:
  - label: GitHub
    iconName: GitHubIcon
    icon: i-simple-icons-github
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/CodeGroup.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/code-group
---

## Usage

Wrap your code blocks around a `code-group` component to group them together in tabs.

::code-preview{class="[&>div]:*:my-0 [&>div]:*:w-full"}

:::code-group

```bash [pnpm]
pnpm add @bitrix24/b24ui-nuxt
```

```bash [yarn]
yarn add @bitrix24/b24ui-nuxt
```

```bash [npm]
npm install @bitrix24/b24ui-nuxt
```

```bash [bun]
bun add @bitrix24/b24ui-nuxt
```

:::

#code

````mdc
::code-group

```bash [pnpm]
pnpm add @bitrix24/b24ui-nuxt
```

```bash [yarn]
yarn add @bitrix24/b24ui-nuxt
```

```bash [npm]
npm install @bitrix24/b24ui-nuxt
```

```bash [bun]
bun add @bitrix24/b24ui-nuxt
```

::
````

::

::note{to="/docs/typography/code/#code-blocks"}
Like the `ProsePre` component, the `CodeGroup` handles filenames, icons and copy button.
::

## API

### Props

:component-props{prose}

### Slots

:component-slots{prose}

## Theme

:component-theme{prose}
