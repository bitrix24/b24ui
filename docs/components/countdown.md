---
title: Countdown
description: Countdown with options control.
outline: deep
---
<script setup>
import CountdownExample from '/examples/countdown/Countdown.vue';
</script>
# Countdown

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

<Description 
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Countdown.vue"
  demo="/components/countdown"
>
  Countdown with options control.
</Description>

## Usage

<div class="lg:min-h-[260px]">
  <ClientOnly>
    <CountdownExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/countdown/demo/Countdown.vue{vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Countdown" />

### Slots

<ComponentSlots component="Countdown" />

### Emits

```ts
/**
 * Emitted events for the CountdownEmits component
 */
interface CountdownEmits {
  start: () => void;
  end: () => void;
  abort: () => void;
  progress: (payload: [value: CountdownData]) => void;
}
```
