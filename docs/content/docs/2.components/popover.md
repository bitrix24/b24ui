---
title: Popover
description: A non-modal popup window for showing messages or gathering user input.
category: overlay
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Popover.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/popover
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/popover
  - label: Popover
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/popover
---

## Usage

Use a [Button](/docs/components/button/) or any other component in the default slot of the Popover.

Then, use the `#content` slot to add the content displayed when the Popover is open.

::component-code
---
prettier: true
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

### Mode

Use the `mode` prop to change the mode of the Popover. Defaults to `click`.

::component-code
---
prettier: true
items:
  mode:
    - click
    - hover
props:
  mode: 'hover'
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

::note
When using the `hover` mode, the Reka UI [`HoverCard`](https://reka-ui.com/docs/components/hover-card) component is used instead of the [`Popover`](https://reka-ui.com/docs/components/popover).
::

### Delay

When using the `hover` mode, you can use the `open-delay` and `close-delay` props to control the delay before the Popover is opened or closed.

::component-code
---
prettier: true
ignore:
  - mode
props:
  mode: 'hover'
  openDelay: 500
  closeDelay: 300
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

### Content

Use the `content` prop to control how the Popover content is rendered, like its `align` or `side` for example.

::component-code
---
prettier: true
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
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

### Arrow

Use the `arrow` prop to display an arrow on the Popover.

::component-code
---
prettier: true
ignore:
  - arrow
props:
  arrow: true
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

### Modal

Use the `modal` prop to control whether the Popover blocks interaction with outside content. Defaults to `false`.

::component-code
---
prettier: true
ignore:
  - title
props:
  modal: true
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

### Dismissible

Use the `dismissible` prop to control whether the Popover is dismissible when clicking outside of it or pressing escape. Defaults to `true`.

::note
A `close:prevent` event will be emitted when the user tries to close it.
::

::component-example
---
name: 'popover-dismissible-example'
---
::

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::component-example
---
name: 'popover-open-example'
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts/), you can toggle the Popover by pressing :kbd{value="O"}.
::

### With command palette

You can use a [CommandPalette](/docs/components/command-palette/) component inside the Popover's content.

::component-example
---
collapse: true
name: 'popover-command-palette-example'
---
::

### With following cursor

You can make the Popover follow the cursor when hovering over an element using the [`reference`](https://reka-ui.com/docs/components/tooltip#trigger) prop:

::component-example
---
name: 'popover-cursor-example'
---
::

### With anchor slot

You can use the `#anchor` slot to position the Popover against a custom element.

::warning
This slot only works when `mode` is `click`.
::

::component-example
---
collapse: true
name: 'popover-anchor-slot-example'
---
::

## API

### Props

:component-props

### Slots

:component-slots

::note
The `close` function is only available when `mode` is set to `click` because Reka UI exposes this for [`Popover`](https://reka-ui.com/docs/components/popover#close-using-slot-props) but not for [`HoverCard`](https://reka-ui.com/docs/components/hover-card).
::

### Emits

:component-emits

## Theme

:component-theme
