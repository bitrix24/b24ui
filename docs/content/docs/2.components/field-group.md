---
title: FieldGroup
description: Organize several button-like elements into a group.
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/FieldGroup.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/field-group
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/field-group
---

## Usage

Wrap multiple [Button](/docs/components/button/) within a FieldGroup to group them together.

::component-code
---
prettier: true
slots:
  default: |

    <B24Button color="air-primary-copilot" label="Button" />
    <B24Button color="air-primary-copilot" label="Button" />
---
:b24-button{color="air-primary-copilot" label="Button"}
:b24-button{color="air-primary-copilot" label="Button"}
::

### No split

If you use elements with different colors, use the `no-split` property to disable the display of the separator.

::component-code
---
prettier: true
ignore:
  - noSplit
props:
  noSplit: true
slots:
  default: |

    <B24Button color="air-primary-copilot" label="Button" />
    <B24Button color="air-primary-success" label="Button" />
    <B24Button color="air-primary-alert" label="Button" />
---
:b24-button{color="air-primary-copilot" label="Button"}
:b24-button{color="air-primary-success" label="Button"}
:b24-button{color="air-primary-alert" label="Button"}
::

### Size

Use the `size` prop to change the size of all the buttons.

::component-code
---
prettier: true
props:
  size: xl
slots:
  default: |

    <B24Button color="air-primary-copilot" label="Button" />
    <B24Button color="air-primary-copilot" label="Button" />
---
:b24-button{color="air-primary-copilot" label="Button"}
:b24-button{color="air-primary-copilot" label="Button"}
::

### Orientation

Use the `orientation` prop to change the orientation of the buttons. Defaults to `horizontal`.

::component-code
---
prettier: true
props:
  orientation: vertical
slots:
  default: |

    <B24Button color="air-primary-copilot" label="Button" />
    <B24Button color="air-primary-copilot" label="Button" />
---
:b24-button{color="air-primary-copilot" label="Button"}
:b24-button{color="air-primary-copilot" label="Button"}
::

## Examples

### With input

You can use components like [Input](/docs/components/input/), [InputMenu](/docs/components/input-menu/), [Select](/docs/components/select/) [SelectMenu](/docs/components/select-menu/), etc. within a field group.

::component-code
---
prettier: true
slots:
  default: |

    <B24Input placeholder="Enter token" />

    <B24Button label="Button" />
---
:b24-input{placeholder="Enter token"}
:b24-button{label="Button"}
::

### With tooltip

You can use a [Tooltip](/docs/components/tooltip/) within a field group.

:component-example{name="field-group-tooltip-example"}

### With dropdown menu

You can use a [DropdownMenu](/docs/components/dropdown-menu/) within a field group.

:component-example{name="field-group-dropdown-example"}

### With badge

You can use a [Badge](/docs/components/badge/) within a field group.

:component-example{name="field-group-badge-example"}

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
