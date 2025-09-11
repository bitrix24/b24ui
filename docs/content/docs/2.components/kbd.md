---
title: Kbd
description: A kbd element for indicating a keyboard input.
category: element
---
<script setup>
import KbdExample from '/examples/kbd/Kbd.vue';
import ValueExample from '/examples/kbd/Value.vue';
import UseKbdExample from '/examples/kbd/UseKbd.vue';
import SizeExample from '/examples/kbd/Size.vue';
import WithClassExample from '/examples/kbd/WithClass.vue';
</script>
# Keyboard Key

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/kbd"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Kbd.vue"
  demo="/components/kbd"
>
  A kbd element for indicating a keyboard input.
</Description>

## Usage

### Value

Use the default slot to set the value of the Kbd.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <KbdExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/kbd/demo/Kbd.vue{2 vue:line-numbers}
:::

You can achieve the same result by using the `value` prop.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ValueExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/kbd/demo/Value.vue{12 vue:line-numbers}
:::

You can pass special keys to the `value` prop that goes through the [`useKbd`](https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/useKbd.ts) composable. For example, the `meta` key displays as `⌘` on macOS and `Ctrl` on other platforms.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <UseKbdExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/kbd/demo/UseKbd.vue{12 vue:line-numbers}
:::

### Depth

`@remove`

### Size

Use the `size` prop to change the size of the Kbd.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/kbd/demo/Size.vue{12 vue:line-numbers}
:::

## Examples

### `class` prop

Use the `class` prop to override the base styles of the Badge.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <WithClassExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/kbd/demo/WithClass.vue{8,14 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Kbd" />

### Slots

<ComponentSlots component="Kbd" />
