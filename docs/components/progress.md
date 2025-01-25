---
title: Progress
description: A progress bar displaying task completion status.
outline: deep
---
<script setup>
import ProgressExample from '/examples/progress/Progress.vue';
import MaxExample from '/examples/progress/Max.vue';
import MaxArrayExample from '/examples/progress/MaxArray.vue';
import StatusExample from '/examples/progress/Status.vue';
import IndeterminateExample from '/examples/progress/Indeterminate.vue';
import AnimationExample from '/examples/progress/Animation.vue';
import OrientationExample from '/examples/progress/Orientation.vue';
import ColorExample from '/examples/progress/Color.vue';
import SizeExample from '/examples/progress/Size.vue';
import InvertedExample from '/examples/progress/Inverted.vue';
</script>
# Progress

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/progress"
  reka-ui="https://reka-ui.com/docs/components/progress"
  reka-ui-title="Progress"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Progress.vue"
>
  A progress bar displaying task completion status.
</Description>

## Usage

Use the `v-model` directive to control the value of the Progress.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ProgressExample />
  </ClientOnly>
</div>

<<< @/examples/progress/demo/Progress.vue{8 vue:line-numbers}

### Max

Use the `max` prop to set the maximum value of the Progress.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <MaxExample />
  </ClientOnly>
</div>

<<< @/examples/progress/demo/Max.vue{18 vue:line-numbers}

Use the `max` prop with an array of strings to display the active step under the bar, the maximum value of the Progress is the length of the array.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <MaxArrayExample />
  </ClientOnly>
</div>

<<< @/examples/progress/demo/MaxArray.vue{4,10 vue:line-numbers}

### Status

Use the `status` prop to display the current Progress value above the bar.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <StatusExample />
  </ClientOnly>
</div>

<<< @/examples/progress/demo/Status.vue{18 vue:line-numbers}

### Indeterminate

When no `v-model` is set or the value is `null`, the Progress becomes _indeterminate_. The progress bar is animated as a `carousel`, but you can change it using the [`animation`](#animation) prop.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <IndeterminateExample />
  </ClientOnly>
</div>

<<< @/examples/progress/demo/Indeterminate.vue{4,8 vue:line-numbers}

### Animation

Use the `animation` prop to change the animation of the Progress to an inverse carousel, a swinging bar or an elastic bar. Defaults to `carousel`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <AnimationExample />
  </ClientOnly>
</div>

<<< @/examples/progress/demo/Animation.vue{13 vue:line-numbers}

### Orientation

Use the `orientation` prop to change the orientation of the Progress. Defaults to `horizontal`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <OrientationExample />
  </ClientOnly>
</div>

<<< @/examples/progress/demo/Orientation.vue{13 vue:line-numbers}

### Color

Use the `color` prop to change the color of the Slider.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

<<< @/examples/progress/demo/Color.vue{13 vue:line-numbers}

### Size

Use the `size` prop to change the size of the Slider.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

<<< @/examples/progress/demo/Size.vue{13 vue:line-numbers}

### Inverted

Use the `inverted` prop to visually invert the Progress.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <InvertedExample />
  </ClientOnly>
</div>

<<< @/examples/progress/demo/Inverted.vue{18 vue:line-numbers}

## API

### Props

<ComponentProps component="Progress" />

### Slots

<ComponentSlots component="Progress" />

### Emits

<ComponentEmits component="Progress" />

