---
title: Skeleton
description: A toggle control for switching between two states.
outline: deep
---
<script setup>
import SkeletonExample from '/examples/skeleton/Skeleton.vue';
import TaskAddExample from '/examples/skeleton/TaskAdd.vue';
</script>
# Skeleton

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/skeleton"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Skeleton.vue"
  demo="/components/skeleton"
>
  A loading indicator shown while content is being fetched.
</Description>

## Usage

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <SkeletonExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/skeleton/demo/Skeleton.vue{3,6,7 vue:line-numbers}
:::

## Examples

### Something more complex

Example of a loading indicator for a task creation form.

<div class="lg:min-h-[623px]">
  <ClientOnly>
    <TaskAddExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/skeleton/demo/TaskAdd.vue{vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Skeleton" />

### Slots

<ComponentSlots component="Skeleton" />
