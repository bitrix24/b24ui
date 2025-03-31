---
title: StackedLayout
description: Classic version of application construction. Top menu and sidebar.
outline: deep
---
<script setup>
import StackedLayoutExample from '/examples/stackedlayout/StackedLayout.vue';
</script>
# StackedLayout

<Description
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/StackedLayout.vue"
  demo="/stacked-layout"
>
  Classic version of application construction. Top menu and sidebar.
</Description>

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

## Usage

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <StackedLayoutExample />
  </ClientOnly>
</div>

<<< @/examples/stackedlayout/demo/StackedLayout.vue{2 vue:line-numbers}


## API

### Props

<ComponentProps component="StackedLayout" />

### Slots

<ComponentSlots component="StackedLayout" />

### Emits

<ComponentEmits component="StackedLayout" />
