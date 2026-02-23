---
title: Drawer
description: A toggleable drawer with fluid enter/exit transitions.
category: overlay
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Drawer.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/drawer
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/drawer
  - label: Drawer
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://github.com/unovue/vaul-vue
navigation.badge: Soon
---

## Usage

Use a [Button](/docs/components/button/) or any other component in the default slot of the Drawer.

Then, use the `#content` slot to add the content displayed when the Drawer is open.

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

You can also use the `#header`{lang="ts-type"}, `#body`{lang="ts-type"} and `#footer`{lang="ts-type"} slots to customize the Drawer's content.

### Title

Use the `title` prop to set the title of the Drawer's header.

::component-code
---
prettier: true
props:
  title: 'Drawer with title'
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

Use the `description` prop to set the description of the Drawer's header.

::component-code
---
prettier: true
ignore:
  - title
props:
  title: 'Drawer with description'
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

### Direction

Use the `direction` prop to control the direction of the Drawer. Defaults to `bottom`.

::component-code
---
prettier: true
props:
  direction: 'right'
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="min-w-96 min-h-96 size-full m-4" />
---

:B24-button{label="Open"}

#content
:placeholder{class="min-w-96 min-h-96 size-full m-4"}
::

### Inset

Use the `inset` prop to inset the Drawer from the edges.

::component-code
---
prettier: true
props:
  direction: 'right'
  inset: true
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="min-w-96 min-h-96 size-full m-4" />
---

:b24-button{label="Open"}

#content
:placeholder{class="min-w-96 min-h-96 size-full m-4"}
::

### Handle

Use the `handle` prop to control whether the Drawer has a handle or not. Defaults to `true`.

::component-code
---
prettier: true
props:
  handle: false
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

### Handle Only

Use the `handle-only` prop to only allow the Drawer to be dragged by the handle.

::component-code
---
prettier: true
props:
  handleOnly: true
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

### Overlay

Use the `overlay` prop to control whether the Drawer has an overlay or not. Defaults to `true`.

::component-code
---
prettier: true
props:
  overlay: false
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

@todo add overlayBlur

### Modal

Use the `modal` prop to control whether the Drawer blocks interaction with outside content. Defaults to `true`.

::note
When `modal` is set to `false`, the overlay is automatically disabled and outside content becomes interactive.
::

::component-code
---
prettier: true
props:
  modal: false
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

### Dismissible

Use the `dismissible` prop to control whether the Drawer is dismissible when clicking outside of it or pressing escape. Defaults to `true`.

::note
A `close:prevent` event will be emitted when the user tries to close it.
::

::tip
You can combine `modal: false` with `dismissible: false` to make the Drawer's background interactive without closing it.
::

::component-example
---
prettier: true
name: 'drawer-dismissible-example'
---
::

### Scale Background

Use the `should-scale-background` prop to scale the background when the Drawer is open, creating a visual depth effect. You can set the `set-background-color-on-scale` prop to `false` to prevent changing the background color.

::component-code
---
prettier: true
props:
  shouldScaleBackground: true
  setBackgroundColorOnScale: true
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="h-48 m-4" />
---

:b24-button{label="Open"}

#content
:placeholder{class="h-screen m-4"}
::

::warning
Make sure to add the `data-vaul-drawer-wrapper` directive to a parent element of your app to make this work.

@todo fix this bg-default

```vue [app.vue]
<template>
  <B24App>
    <div class="bg-default" data-vaul-drawer-wrapper>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </B24App>
</template>
```

@todo fix this bg-default

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  app: {
    rootAttrs: {
      'data-vaul-drawer-wrapper': '',
      'class': 'bg-default'
    }
  }
})
```

::

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::component-example
---
prettier: true
name: 'drawer-open-example'
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts/), you can toggle the Drawer by pressing :kbd{value="O"}.
::

::tip
This allows you to move the trigger outside of the Drawer or remove it entirely.
::

### Responsive drawer

You can render a [Modal](/docs/components/modal/) component on desktop and a Drawer on mobile for example.

::component-example
---
prettier: true
name: 'drawer-responsive-example'
---
::

### Nested drawers

You can nest drawers within each other by using the `nested` prop.

::component-example
---
prettier: true
name: 'drawer-nested-example'
---
::

### With footer slot

Use the `#footer` slot to add content after the Drawer's body.

::component-example
---
prettier: true
collapse: true
name: 'drawer-footer-slot-example'
---
::

### With command palette

You can use a [CommandPalette](/docs/components/command-palette/) component inside the Drawer's content.

::component-example
---
collapse: true
name: 'drawer-command-palette-example'
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
