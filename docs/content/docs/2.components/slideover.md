---
title: Slideover
description: A dialog that slides in from any side of the screen.
category: overlay
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Slideover.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/slideover
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/slideover
  - label: Dialog
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/dialog
---

## Usage

Use a [Button](/docs/components/button/) or any other component in the default slot of the Slideover.

Then, use the `#content` slot to add the content displayed when the Slideover is open.

::component-code
---
prettier: true
collapse: true
ignore:
  - b24ui.content
props:
  b24ui.content: 'light bg-(--ui-color-base-7) sm:top-[300px] sm:max-h-[calc(100%-300px)]'
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="edge-light h-full m-4" />
---

:b24-button{label="Open"}

#content
:placeholder{class="edge-light h-full m-4"}
::

You can also use the `#header`{lang="ts-type"}, `#body`{lang="ts-type"} and `#footer`{lang="ts-type"} slots to customize the Slideover's content.

### Title

Use the `title` prop to set the title of the Slideover's header.

::component-code
---
prettier: true
collapse: true
props:
  title: 'Slideover with title'
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

### Description

Use the `description` prop to set the description of the Slideover's header.

::component-code
---
prettier: true
collapse: true
ignore:
  - title
props:
  title: 'Slideover with description'
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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

### Close

Use the `close` prop to customize or hide the close button (with `false` value) displayed in the Slideover's header.

You can pass any property from the [Button](/docs/components/button/) component to customize it.

::component-code
---
prettier: true
collapse: true
ignore:
  - title
  - close.color
props:
  title: 'Slideover with close button'
  close:
    color: air-secondary-accent-2
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

::note
The close button is not displayed if the `#content` slot is used as it's a part of the header.
::

### Close Icon

Use the `close-icon` prop to customize the close button [Icon](https://bitrix24.github.io/b24icons/icons/).

::component-code
---
prettier: true
collapse: true
ignore:
  - title
  - closeIcon
cast:
  closeIcon: 'RocketIcon'
props:
  title: 'Slideover with close button'
  closeIcon: 'RocketIcon'
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

### Side

Use the `side` prop to set the side of the screen where the Slideover will slide in from. Defaults to `bottom`.

::component-code
---
prettier: true
collapse: true
ignore:
  - title
props:
  side: 'bottom'
  title: 'Slideover with side'
slots:
  default: |

    <B24Button label="Open" />

body: |

    <Placeholder class="h-full min-h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-full min-h-48"}
::

### Inset :badge{label="Soon" class="align-text-top"}

Use the `inset` prop to inset the Slideover from the edges.

::component-code
---
prettier: true
ignore:
  - title
props:
  side: 'right'
  inset: true
  title: 'Slideover with inset'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="min-w-96 min-h-96 size-full" />
---

:b24-button{label="Open"}

#body
:placeholder{class="min-w-96 min-h-96 size-full"}
::


### Transition

Use the `transition` prop to control whether the Slideover is animated or not. Defaults to `true`.

::component-code
---
prettier: true
collapse: true
ignore:
  - title
props:
  transition: false
  title: 'Slideover without transition'
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

### Overlay

Use the `overlay` prop to control whether the Slideover has an overlay or not. Defaults to `true`.

::component-code
---
prettier: true
collapse: true
ignore:
  - title
props:
  overlay: false
  title: 'Slideover without overlay'
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

### Overlay blur

If you want to disable background blur, you should use the `overlayBlur` prop.

The `overlayBlur` prop has 3 options:

- `auto`: when the user has **not requested** [reduced motion](https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion)
- `on`: always use blur
- `off`: (default) do not use blur

::component-code
---
prettier: true
collapse: true
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

    <Placeholder class="h-full" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-full"}
::

### Modal

Use the `modal` prop to control whether the Slideover blocks interaction with outside content. Defaults to `true`.

::note
When `modal` is set to `false`, the overlay is automatically disabled and outside content becomes interactive.
::

::component-code
---
prettier: true
ignore:
  - title
props:
  modal: false
  title: 'Slideover interactive'
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

### Dismissible

Use the `dismissible` prop to control whether the Slideover is dismissible when clicking outside of it or pressing escape. Defaults to `true`.

::note
A `close:prevent` event will be emitted when the user tries to close it.
::

::tip
You can combine `modal: false` with `dismissible: false` to make the Slideover's background interactive without closing it.
::

::component-code
---
collapse: true
prettier: true
ignore:
  - title
  - dismissible
props:
  dismissible: false
  modal: true
  title: 'Slideover non-dismissible'
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
name: 'slideover-open-example'
collapse: true
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts/), you can toggle the Slideover by pressing :kbd{value="O"}.
::

::tip
This allows you to move the trigger outside of the Slideover or remove it entirely.
::

### Programmatic usage

You can use the [`useOverlay`](/docs/composables/use-overlay/) composable to open a Slideover programmatically.

::warning
Make sure to wrap your app with the [`App`](/docs/components/app/) component which uses the [`OverlayProvider`](https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/OverlayProvider.vue) component.
::

First, create a slideover component that will be opened programmatically:

::component-example
---
prettier: true
name: 'slideover-example'
preview: false
---
::

::note
We are emitting a `close` event when the slideover is closed or dismissed here. You can emit any data through the `close` event, however, the event must be emitted in order to capture the return value.
::

Then, use it in your app:

::component-example
---
name: 'slideover-programmatic-example'
collapse: true
---
::

::tip
You can close the slideover within the slideover component by emitting `emit('close')`.
::

### Nested slideovers

You can nest slideovers within each other.

::component-example
---
name: 'slideover-nested-example'
collapse: true
---
::

### With footer slot

Use the `#footer` slot to add content after the Slideover's body.

::component-example
---
name: 'slideover-footer-slot-example'
collapse: true
---
::

### Simple list of elements

::component-example
---
name: 'slideover-simple-list-elements-example'
collapse: true
---
::

::tip
Many examples can be found on the [`playground`](https://bitrix24.github.io/b24ui/demo/components/slideover) and also seen in the [`demo`](https://github.com/bitrix24/b24ui/blob/main/playgrounds/demo/app/pages/components/slideover.vue) version.
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
