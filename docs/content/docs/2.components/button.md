---
title: Button
description: A button capable of linking or performing an action.
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Button.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/button/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui4.nuxt.com/docs/components/button
---

## Usage

Use the default slot to set the label of the Button.

::component-code
---
prettier: true
slots:
  default: Button
---
::

### Label

Use the `label` prop to set the label of the Button.

::component-code
---
prettier: true
props:
  label: Button
---
::

### Color

Use the `color` prop to change the color of the Button.

::component-code
---
prettier: true
props:
  color: 'air-secondary-no-accent'
slots:
  default: Button
---
::

### Size

Use the `size` prop to change the size of the Button.

::component-code
---
prettier: true
props:
  size: xl
slots:
  default: Button
---
::

### Icon

Use the `icon` prop to show an [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) inside the Button.

::component-code
---
prettier: true
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  size: md
  color: 'air-primary'
slots:
  default: Button
---
::

Use the `use-dropdown` prop to show trailing-icon.

::component-code
---
prettier: true
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  useDropdown: true
  icon: 'RocketIcon'
  size: md
  color: 'air-primary'
slots:
  default: Button
---
::

The `label` as prop or slot is optional so you can use the Button as an icon-only button.

::component-code
---
prettier: true
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  size: md
  color: 'air-primary'
---
::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/components/avatar/) inside the Button.

::component-code
---
prettier: true
ignore:
  - avatar.src
props:
  avatar:
    src: '/b24ui/avatar/employee.png'
  size: md
  color: 'air-primary'
slots:
  default: |

    Button
---
::

The `label` as prop or slot is optional so you can use the Button as an avatar-only button.

::component-code
---
prettier: true
props:
  avatar:
    src: '/b24ui/avatar/employee.png'
  size: md
  color: 'air-primary'
---
::

### Link

You can pass any property from the [Link](/docs/components/link/#props) component such as `to`, `target`, etc.

::component-code
---
prettier: true
ignore:
  - target
props:
  to: https://apidocs.bitrix24.com
  target: _blank
slots:
  default: Button
---
::

When the Button is a link or when using the `active` prop, you can use the `active-color` props to customize the active state.

::component-code
---
prettier: true
ignore:
  - color
items:
  activeColor:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-secondary
    - air-secondary-alert
    - air-secondary-accent
    - air-secondary-accent-1
    - air-secondary-accent-2
    - air-secondary-no-accent
    - air-tertiary
    - air-tertiary-accent
    - air-tertiary-no-accent
    - air-selection
    - air-boost
props:
  active: true
  color: 'air-secondary-no-accent'
  activeColor: 'air-primary'
slots:
  default: |

    Button
---

Button
::

You can also use the `active-class` and `inactive-class` props to customize the active state.

::component-code
---
prettier: true
props:
  active: true
  activeClass: 'italic'
  inactiveClass: 'tracking-widest'
slots:
  default: Button
---

Button
::

### Loading

Use the `loading` prop to show a loading icon and disable the Button.

::component-code
---
prettier: true
props:
  loading: true
  color: 'air-primary'
slots:
  default: Button
---
Button
::

Use the `loading-auto` prop to show the loading icon automatically while the `@click` promise is pending.

:component-example{name="button-loading-auto-example"}

This also works with the [Form](/docs/components/form/) component.

:component-example{name="button-loading-auto-form-example"}

### Loading Icon

Use `use-clock` or `use-wait` props to show different loading icons.

::component-code
---
prettier: true
props:
  loading: true
  useWait: true
  useClock: false
  color: 'air-primary'
slots:
  default: Button
---
Button
::

### Disabled

Use the `disabled` prop to disable the Button.

::component-code
---
prettier: true
props:
  disabled: true
  color: 'air-primary'
slots:
  default: Button
---

Button
::

### Rounded

Use the `rounded` prop to round the Button.

::component-code
---
prettier: true
props:
  rounded: true
  color: 'air-primary'
slots:
  default: Button
---

Button
::

### Block

Use the `block` property to set `w-full` for the Button.

::component-code
---
prettier: true
props:
  block: true
  color: 'air-primary'
slots:
  default: Button
---

Button
::

### NormalCase

Use the `normalCase` property to set `uppercase` for the Button.

::component-code
---
prettier: true
props:
  normalCase: false
  color: 'air-primary'
slots:
  default: Button
---

Button
::

## API

### Props

:component-props

::callout{icon-name="GitHubIcon" color="air-secondary-accent" to="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Link.vue#L13"}
The `Button` component extends the `Link` component. Check out the source code on GitHub.
::

### Slots

:component-slots

## Theme

:component-theme
