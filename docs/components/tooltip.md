---
title: Tooltip
description: A popup that reveals information when hovering over an element.
outline: deep
---
<script setup>
import TooltipExample from '/examples/tooltip/TooltipExample.vue';
import TooltipKbdsExample from '/examples/tooltip/TooltipKbdsExample.vue';
import TooltipDelayExample from '/examples/tooltip/TooltipDelayExample.vue';
import TooltipContentExample from '/examples/tooltip/TooltipContentExample.vue';
</script>
# Tooltip

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/tooltip"
  reka-ui="https://reka-ui.com/docs/components/tooltip"
  reka-ui-title="Tooltip"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Tooltip.vue"
>
  A popup that reveals information when hovering over an element.
</Description>

## Usage

Use a [Button](/components/button) or any other component in the default slot of the Tooltip.

::: warning
Make sure to wrap your app with the [`App`](/components/app) component which uses the [`TooltipProvider`](https://reka-ui.com/docs/components/tooltip#provider) component from Reka UI.
:::

::: tip
You can [check](/components/app#props}) the `App` component `tooltip` prop to see how to configure the Tooltip globally.
:::

### Text

Use the `text` prop to set the content of the Tooltip.

<ComponentShowExample >
  <iframe data-why class="min-h-[100px] sm:min-h-[100px]" allowtransparency="true">
    <B24App>
      <TooltipExample />
    </B24App>
  </iframe>
</ComponentShowExample>

<<< @/examples/tooltip/TooltipExample.vue

### Kbds

Use the `kbds` prop to render [Kbd](/components/kbd) components in the Tooltip.

::: warning
`Kbds` are displayed starting from breakpoint `lg`
:::

<ComponentShowExample >
  <iframe data-why class="w-[1200px] min-h-[100px] sm:min-h-[100px]" allowtransparency="true">
    <B24App>
      <TooltipKbdsExample />
    </B24App>
  </iframe>
</ComponentShowExample>

<<< @/examples/tooltip/TooltipKbdsExample.vue

:::tip
You can use special keys like `meta` that displays as `⌘` on macOS and `Ctrl` on other platforms.
:::

### Delay

Use the `delay-duration` prop to change the delay before the Tooltip appears. For example, you can make it appear instantly by setting it to `0`.

<ComponentShowExample >
  <iframe data-why class="min-h-[100px] sm:min-h-[100px]" allowtransparency="true">
    <B24App>
      <TooltipDelayExample />
    </B24App>
  </iframe>
</ComponentShowExample>

<<< @/examples/tooltip/TooltipDelayExample.vue

### Content

Use the `content` prop to control how the Tooltip content is rendered, like its `align` or `side` for example.

<ComponentShowExample >
  <iframe data-why class="min-h-[100px] sm:min-h-[100px]" allowtransparency="true">
    <B24App>
      <TooltipContentExample />
    </B24App>
  </iframe>
</ComponentShowExample>

<<< @/examples/tooltip/TooltipContentExample.vue

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

    <UButton label="Open" color="neutral" variant="subtle" />
---

:u-button{label="Open" color="neutral" variant="subtle"}
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

    <UButton label="Open" color="neutral" variant="subtle" />
---

:u-button{label="Open" color="neutral" variant="subtle"}
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
In this example, leveraging [`defineShortcuts`](composables/define-shortcuts), you can toggle the Tooltip by pressing :kbd{value="O"}.
::

## API

### Props

<ComponentProps component="Tooltip" />

### Slots

<ComponentSlots component="Tooltip" />

### Emits

<ComponentEmits component="Tooltip" />
