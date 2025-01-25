---
title: ComponentName
description: A box for centering and setting a maximum width for your content.
outline: deep
---
<script setup>
import ContainerExample from '/examples/container/Container.vue';
</script>
# Container

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/container"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Container.vue"
>
  A box for centering and setting a maximum width for your content.
</Description>

## Usage

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ContainerExample />
  </ClientOnly>
</div>

<<< @/examples/container/demo/Container.vue{2 vue:line-numbers}

## API

### Props

<ComponentProps component="Container" />

### Slots

<ComponentSlots component="Container" />
