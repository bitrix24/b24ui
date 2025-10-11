---
title: Tooltip
description: A small window that shows details when you move your mouse over an item.
category: overlay
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Tooltip.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/tooltip
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/tooltip
  - label: Tooltip
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/tooltip
---

## Usage

Use a [Button](/docs/components/button/) or any other component in the default slot of the Tooltip.

::component-code
---
prettier: true
ignore:
  - text
props:
  text: 'Open on GitHub'
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

::warning
Make sure to wrap your app with the [`App`](/docs/components/app/) component which uses the [`TooltipProvider`](https://reka-ui.com/docs/components/tooltip#provider) component from Reka UI.
::

::tip{to="/docs/components/app/#props"}
You can check the `App` component `tooltip` prop to see how to configure the Tooltip globally.
::

### Text

Use the `text` prop to set the content of the Tooltip.

::component-code
---
prettier: true
props:
  text: 'Open on GitHub'
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

### Kbds

Use the `kbds` prop to render [Kbd](/docs/components/kbd/) components in the Tooltip.

::component-code
---
prettier: true
ignore:
  - text
  - kbds
props:
  text: 'Open on GitHub'
  kbds:
    - meta
    - G
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

::tip
You can use special keys like `meta` that displays as `⌘` on macOS and `Ctrl` on other platforms.
::

### Delay

Use the `delay-duration` prop to change the delay before the Tooltip appears. For example, you can make it appear instantly by setting it to `0`.

::component-code
---
prettier: true
ignore:
  - text
props:
  delayDuration: 0
  text: 'Open on GitHub'
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

::tip
This can be configured globally through the `tooltip.delayDuration` option in the [`App`](/docs/components/app/) component.
::

### Content

Use the `content` prop to control how the Tooltip content is rendered, like its `align` or `side` for example.

::component-code
---
prettier: true
ignore:
  - text
items:
  content.align:
    - start
    - center
    - end
  content.side:
    - right
    - left
    - top
    - bottom
props:
  content:
    align: center
    side: bottom
    sideOffset: 8
  text: 'Open on GitHub'
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

### Arrow

Use the `arrow` prop to display an arrow on the Tooltip.

::component-code
---
prettier: true
ignore:
  - text
  - arrow
props:
  arrow: true
  text: 'Open on GitHub'
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

### Disabled

Use the `disabled` prop to disable the Tooltip.

::component-code
---
prettier: true
ignore:
  - text
props:
  disabled: true
  text: 'Open on GitHub'
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::component-example
---
name: 'tooltip-open-example'
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts/), you can toggle the Tooltip by pressing :kbd{value="O"}.
::

### With following cursor

You can make the Tooltip follow the cursor when hovering over an element using the [`reference`](https://reka-ui.com/docs/components/tooltip#trigger) prop:

::component-example
---
name: 'tooltip-cursor-example'
---
::

### Help Icon

You can use the [Icon](https://bitrix24.github.io/b24icons/guide/icons.html) and the Tooltip.

::component-example
---
name: 'tooltip-help-icon-example'
---
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
