---
title: Link
description: A wrapper around <NuxtLink> with extra props.
category: navigation
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Link.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/link
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/link
---

## Usage

The Link component is a wrapper around [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link) using the [`custom`](https://router.vuejs.org/api/interfaces/RouterLinkProps.html#Properties-custom) prop. It provides a few extra props:

- `inactive-class` prop to set a class when the link is inactive, `active-class` is used when active.
- `exact` prop to style with `active-class` when the link is active and the route is exactly the same as the current route.
- `exact-query` and `exact-hash` props to style with `active-class` when the link is active and the query or hash is exactly the same as the current query or hash.
  - use `exact-query="partial"` to style with `active-class` when the link is active and the query partially match the current query.

The incentive behind this is to provide the same API as NuxtLink back in Nuxt 2 / Vue 2. You can read more about it in the Vue Router [migration from Vue 2](https://router.vuejs.org/guide/migration/#removal-of-the-exact-prop-in-router-link) guide.

::note
It is used by the [`Breadcrumb`](/docs/components/breadcrumb/), [`Button`](/docs/components/button/), [`ContextMenu`](/docs/components/context-menu/), [`DropdownMenu`](/docs/components/dropdown-menu/) and [`NavigationMenu`](/docs/components/navigation-menu/) components.
::

### Tag

The `Link` components renders an `<a>` tag when a `to` prop is provided, otherwise it renders a `<button>` tag. You can use the `as` prop to change fallback tag.

::component-code
---
props:
  to: ''
  as: 'button'
slots:
  default: Link
---
::

::note
You can inspect the rendered HTML by changing the `to` prop.
::

### Style

By default, the link has default active and inactive styles, check out the [#theme](#theme) section.

::component-code
---
props:
  to: /docs/components/link/
slots:
  default: Link
---
::

::note
Try changing the `to` prop to see the active and inactive states.
::

You can override this behavior by using the `raw` prop and provide your own styles using `class`, `active-class` and `inactive-class`.

::component-code
---
ignore:
  - raw
props:
  raw: true
  to: /docs/components/link/
  activeClass: 'font-(--ui-font-weight-bold) text-(--ui-color-copilot-accent-primary)'
  inactiveClass: 'text-(--ui-color-accent-main-alert)'
slots:
  default: Link
---

Link
::

You can use the `is-action` prop to indicate a pseudo-link.

::component-code
---
props:
  isAction: true
  to: /docs/components/link/'
slots:
  default: Link
---

Link
::

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

::component-props
---
ignore:
  - custom
---
::

### Slots

:component-slots

## Theme

:component-theme
