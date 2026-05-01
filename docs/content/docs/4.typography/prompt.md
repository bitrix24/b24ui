---
title: Prompt
description: 'Show pre‑built AI prompts with one‑click copying and IDE integration.'
category: components
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/Prompt.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/prompt
navigation.badge: Soon
---

## Usage

Use the `prompt` component to display a pre-built AI prompt that users can copy to their clipboard or open directly in their IDE. The `description` prop is shown as the visible label, while the default slot contains the prompt text that gets copied.

::component-code{slug="prompt" prose}
---
props:
  description: Build a dashboard layout with Bitrix24 UI.
  class: 'w-full my-0'
hide:
  - class
slots:
  default: |
    You are a Bitrix24 UI expert. Help me build a dashboard layout with a collapsible sidebar and a sticky top navbar.

    Requirements:
    - Use `B24DashboardPanel`, `B24DashboardSidebar`, and `B24DashboardNavbar`
    - Use semantic color tokens like `bg-elevated` and `text-muted` for theming
    - The sidebar should include navigation links with icons using `B24NavigationMenu`
    - The navbar should display a search button, and a user dropdown menu
    - The layout must be fully responsive and collapse the sidebar on mobile
---
::

### Actions

Use the `actions` prop to control which buttons are displayed. Defaults to `["copy"]`. Available actions are `copy`, `cursor` and `windsurf`.

::component-code{slug="prompt" prose}
---
ignore:
  - description
hide:
  - class
props:
  description: Add a color mode toggle.
  actions:
    - copy
    - cursor
    - windsurf
  class: 'w-full my-0'
slots:
  default: |
    Add a color mode toggle to my Nuxt app.

    Requirements:
    - Use `useColorMode` from `'@bitrix24/b24ui-nuxt/composables` to manage the current mode
    - Render a `B24Button` with `color="air-tertiary"` that cycles between `light`, `dark`, and `system` on click
    - Update the button icon dynamically: `SunIconAir` for light, `MoonIconAir` for dark, `ScreenIcon` for system
    - Add a tooltip using `B24Tooltip` that shows the current active mode
---
::

## API

### Props

:component-props{prose}

### Slots

:component-slots{prose}

## Theme

:component-theme{prose}
