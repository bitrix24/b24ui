---
title: Collapsible
description: A collapsible component for showing or hiding its content.
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Collapsible.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/collapsible
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui4.nuxt.com/docs/components/collapsible
  - label: Collapsible
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/collapsible
---

## Usage

Use a [Button](/docs/components/button/) or any other component in the default slot of the Collapsible.

Then, use the `#content` slot to add the content displayed when the Collapsible is open.

::component-code
---
prettier: true
ignore:
  - class
props:
  class: 'flex flex-col gap-2 w-48'
slots:
  default: |

    <B24Button label="Open" block use-dropdown />

  content: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open" block use-dropdown}

#content
:placeholder{class="h-48"}
::

### Unmount

Use the `unmount-on-hide` prop to prevent the content from being unmounted when the Collapsible is collapsed. Defaults to `true`.

::component-code
---
prettier: true
ignore:
  - class
props:
  unmountOnHide: false
  class: 'flex flex-col gap-2 w-48'
slots:
  default: |

    <B24Button label="Open" block use-dropdown />

  content: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open" block use-dropdown}

#content
:placeholder{class="h-48"}
::

::note
You can inspect the DOM to see the content being rendered.
::

### Disabled

Use the `disabled` prop to disable the Collapsible.

::component-code
---
prettier: true
ignore:
  - class
props:
  class: 'flex flex-col gap-2 w-48'
  disabled: true
slots:
  default: |

    <B24Button label="Open" block use-dropdown />

  content: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open" block use-dropdown}

#content
:placeholder{class="h-48"}
::

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::component-example
---
name: 'collapsible-open-example'
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts/), you can toggle the Collapsible by pressing :kbd{value="O"}.
::

::tip
This allows you to move the trigger outside of the Collapsible or remove it entirely.
::

### With rotating icon

Here is an example with a rotating icon in the Button that indicates the open state of the Collapsible.

::component-example
---
name: 'collapsible-icon-example'
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
