---
title: Link
description: A wrapper around NuxtLink with extra props.
category: navigation
---
<script setup>
import LinkExample from '/examples/link/Link.vue';
import LinkToExample from '/examples/link/LinkTo.vue';
import RawExample from '/examples/link/Raw.vue';
import IsActionExample from '/examples/link/IsAction.vue';
</script>
# Link

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/link"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Link.vue"
  demo="/components/link"
>
  A wrapper around <code>NuxtLink</code> with extra props.
</Description>

## Usage

The Link component is a wrapper around [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link) using the [`custom`](https://router.vuejs.org/api/interfaces/RouterLinkProps.html#Properties-custom) prop. It provides a few extra props:

- `inactive-class` prop to set a class when the link is inactive, `active-class` is used when active.
- `exact` prop to style with `active-class` when the link is active and the route is exactly the same as the current route.
- `exact-query` and `exact-hash` props to style with `active-class` when the link is active and the query or hash is exactly the same as the current query or hash.
  - use `exact-query="partial"` to style with `active-class` when the link is active and the query partially match the current query.

The incentive behind this is to provide the same API as NuxtLink back in Nuxt 2 / Vue 2. You can read more about it in the Vue Router [migration from Vue 2](https://router.vuejs.org/guide/migration/#removal-of-the-exact-prop-in-router-link) guide.

::: info
It is used by the [`Button`](/docs/components/button/) components.
:::

### Tag

The `Link` components renders an `<a>` tag when a `to` prop is provided, otherwise it renders a `<button>` tag. You can use the `as` prop to change fallback tag.

::: info
You can inspect the rendered HTML.
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <LinkExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/link/demo/Link.vue{12,15 vue:line-numbers}
:::

### Style

By default, the link has default active and inactive styles.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <LinkToExample />
  </ClientOnly>
</div>

You can override this behavior by using the `raw` prop and provide your own styles using `class`, `active-class` and `inactive-class`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <RawExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/link/demo/Raw.vue{4,5,6,13,15 vue:line-numbers}
:::

You can use the `is-action prop` to indicate a pseudo-link.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <IsActionExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/link/demo/IsAction.vue{2,5 vue:line-numbers}
:::

## IntelliSense

If you're using VSCode and wish to get autocompletion for the classes `active-class` and `inactive-class`, you can add the following settings to your `.vscode/settings.json`:

```json [.vscode/settings.json]
{
  "tailwindCSS.classAttributes": [
    "active-class",
    "inactive-class"
  ]
}
```

## API

### Props

<ComponentProps component="Link" />

### Slots

<ComponentSlots component="Link" />
