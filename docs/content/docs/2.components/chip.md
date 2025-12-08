---
title: Chip
description: An indicator that shows either a number or a state.
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Chip.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/chip
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chip
---

## Usage

Wrap any component with a Chip to display an indicator.

::component-code
---
prettier: true
slots:
  default: |

    <B24Button color="air-secondary-no-accent" label="Button" />
---
:b24-button{color="air-secondary-no-accent" label="Button"}
::

### Color

Use the `color` prop to change the color of the Chip.

::component-code
---
prettier: true
props:
  color: air-primary-warning
slots:
  default: |

    <B24Button color="air-secondary-no-accent" label="Button" />
---
:b24-button{color="air-secondary-no-accent" label="Button"}
::

### Inverted

Use the `inverted` prop to invert the color of the Chip.

::warning
Only available for `air-primary*` colors
::

::component-code
---
prettier: true
props:
  inverted: true
  color: 'air-primary'
slots:
  default: |

    <B24Button color="air-secondary-no-accent" label="Button" />
---
:b24-button{color="air-secondary-no-accent" label="Button"}
::

### Size

Use the `size` prop to change the size of the Chip.

::component-code
---
prettier: true
props:
  size: lg
slots:
  default: |

    <B24Button color="air-secondary-no-accent" label="Button" />
---
:b24-button{color="air-secondary-no-accent" label="Button"}
::

### Text

Use the `text` prop to set the text of the Chip.

::component-code
---
prettier: true
props:
  text: '+5'
  size: lg
slots:
  default: |

    <B24Button color="air-secondary-no-accent" label="Button" />
---
:b24-button{color="air-secondary-no-accent" label="Button"}
::

### Hide zero

Use the `hideZero` prop to hide the text if it is equal `0`.

::component-code
---
prettier: true
props:
  hideZero: true
  text: 1
  size: lg
slots:
  default: |

    <B24Button color="air-secondary-no-accent" label="Button" />
---
:b24-button{color="air-secondary-no-accent" label="Button"}
::

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [Icon](https://bitrix24.github.io/b24icons/icons/).

::component-code
---
prettier: true
ignore:
  - trailingIcon
cast:
  trailingIcon: 'RocketIcon'
props:
  trailingIcon: 'RocketIcon'
  text: '+1'
  size: lg
  hideZero: true
slots:
  default: |

    <B24Button color="air-secondary-no-accent" label="Button" />
---
:b24-button{color="air-secondary-no-accent" label="Button"}
::

### Position

Use the `position` prop to change the position of the Chip.

::component-code
---
prettier: true
props:
  position: 'bottom-left'
slots:
  default: |

    <B24Button color="air-secondary-no-accent" label="Button" />
---
:b24-button{color="air-secondary-no-accent" label="Button"}
::

### Inset

Use the `inset` prop to display the Chip inside the component. This is useful when dealing with rounded components.

::component-code
---
prettier: true
props:
  inset: true
slots:
  default: |

    <B24Avatar src="/b24ui/avatar/employee.png" />
---
:b24-avatar{src="/b24ui/avatar/employee.png"}
::

### Standalone

Use the `standalone` prop alongside the `inset` prop to display the Chip inline.

::component-code
---
props:
  standalone: true
  inset: true
---
::

::note
It's used this way in the [`InputMenu`](/docs/components/input-menu/), [`Select`](/docs/components/select/) or [`SelectMenu`](/docs/components/select-menu/) components for example.
::

## Examples

### Control visibility

You can control the visibility of the Chip using the `show` prop.

:component-example{name="chip-show-example"}

::note
In this example, the Chip has a color per status and is displayed when the status is not `offline`.
::

## API

### Props

:component-props

### Slots

:component-slots

### Emits

:component-emits

## Theme

:component-theme
