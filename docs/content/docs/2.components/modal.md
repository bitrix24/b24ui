---
title: Modal
description: A popup window for showing messages or gathering user input.
category: overlay
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Modal.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/modal
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/modal
  - label: Dialog
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/dialog
---

## Usage

Use a [Button](/docs/components/button/) or any other component in the default slot of the Modal.

Then, use the `#content` slot to add the content displayed when the Modal is open.

::component-code
---
prettier: true
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="h-48 m-4" />
---

:b24-button{label="Open"}

#content
:placeholder{class="h-48 m-4"}
::

You can also use the `#header`{lang="ts-type"}, `#body`{lang="ts-type"} and `#footer`{lang="ts-type"} slots to customize the Modal's content.

### Title

Use the `title` prop to set the title of the Modal's header.

::component-code
---
prettier: true
props:
  title: 'Modal with title'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

### Description

Use the `description` prop to set the description of the Modal's header.

::component-code
---
prettier: true
ignore:
  - title
props:
  title: 'Modal with description'
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

### Close

Use the `close` prop to customize or hide the close button (with `false` value) displayed in the Modal's header.

You can pass any property from the [Button](/docs/components/button/) component to customize it.

::component-code
---
prettier: true
ignore:
  - title
  - close.color
props:
  title: 'Modal with close button'
  close:
    color: air-secondary-accent-2
    class: 'rounded-full'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

::tip
The close button is not displayed if the `#content` slot is used as it's a part of the header.
::

### Close Icon

Use the `close-icon` prop to customize the close button [Icon](https://bitrix24.github.io/b24icons/guide/icons.html).

::component-code
---
prettier: true
ignore:
  - title
  - closeIcon
cast:
  closeIcon: 'RocketIcon'
props:
  title: 'Modal with close button'
  closeIcon: 'RocketIcon'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

### Overlay

Use the `overlay` prop to control whether the Modal has an overlay or not. Defaults to `true`.

::component-code
---
prettier: true
ignore:
  - title
props:
  overlay: false
  title: 'Modal without overlay'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

### Overlay blur

If you want to disable background blur, you should use the `overlayBlur` prop.

The `overlayBlur` prop has 3 options:

- `auto`: (default) when the user has **not requested** [reduced motion](https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion)
- `on`: always use blur
- `off`: do not use blur

::component-code
---
prettier: true
ignore:
  - title
  - overlay
items:
  overlayBlur:
    - auto
    - on
    - off
props:
  overlay: true
  overlayBlur: 'auto'
  title: 'Overlay blur'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

### Transition

Use the `transition` prop to control whether the Modal is animated or not. Defaults to `true`.

::component-code
---
prettier: true
ignore:
  - title
props:
  transition: false
  title: 'Modal without transition'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

### Fullscreen

Use the `fullscreen` prop to make the Modal fullscreen.

::component-code
---
prettier: true
ignore:
  - title
  - fullscreen
props:
  fullscreen: true
  title: 'Modal fullscreen'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-full" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-full"}
::

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::component-example
---
name: 'modal-open-example'
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts/), you can toggle the Modal by pressing :kbd{value="O"}.
::

::tip
This allows you to move the trigger outside of the Modal or remove it entirely.
::

### Disable dismissal

Set the `dismissible` prop to `false` to prevent the Modal from being closed when clicking outside of it or pressing escape. A `close:prevent` event will be emitted when the user tries to close it.

::component-code
---
prettier: true
ignore:
  - title
  - dismissible
props:
  dismissible: false
  title: 'Modal non-dismissible'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

### Programmatic usage

You can use the [`useOverlay`](/docs/composables/use-overlay/) composable to open a Modal programmatically.

::warning
Make sure to wrap your app with the [`App`](/docs/components/app/) component which uses the [`OverlayProvider`](https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/OverlayProvider.vue) component.
::

First, create a modal component that will be opened programmatically:

::component-example
---
prettier: true
name: 'modal-example'
preview: false
---
::

::note
We are emitting a `close` event when the modal is closed or dismissed here. You can emit any data through the `close` event, however, the event must be emitted in order to capture the return value.
::

Then, use it in your app:

::component-example
---
name: 'modal-programmatic-example'
---
::

::tip
You can close the modal within the modal component by emitting `emit('close')`.
::

### Nested modals

You can nest modals within each other.

::component-example
---
name: 'modal-nested-example'
---
::

### With footer slot

Use the `#footer` slot to add content after the Modal's body.

::component-example
---
name: 'modal-footer-slot-example'
---
::

### With command palette

You can use a [CommandPalette](/docs/components/command-palette/) component inside the Modal's content.

::component-example
---
collapse: true
name: 'modal-command-palette-example'
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
