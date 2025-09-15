---
title: useConfetti
description: Performant confetti animation in the browser
---
<script setup>
import ConfettiExample from '/examples/confetti/Confetti.vue';
import ConfettiWithOptionsExample from '/examples/confetti/ConfettiWithOptions.vue';
import ConfettiAtPlaceExample from '/examples/confetti/ConfettiAtPlace.vue';
</script>
# useConfetti

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

<Description 
  git-custom="https://github.com/catdad/canvas-confetti"
  git-custom-title="canvas-confetti"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/useConfetti.ts"
  demo="/components/confetti"
>
  Performant confetti animation in the browser
</Description>

## Usage

Use the auto-imported `useConfetti` composable to programmatically control `canvas-confetti`.

```vue
<script setup lang="ts">
const confetti = useConfetti()
</script>
```

- The `useConfetti` composable is created using `createSharedComposable`, ensuring that the same `canvas-confetti` is shared across your entire application.

::: danger
Since canvas-confetti works with the DOM, make sure your code only runs on the client.
:::

## API

### `fire(options?: confetti.Options) => Promise<undefined> | null`

Fire some confetti.

```vue:line-numbers
<script setup lang="ts">
const confetti = useConfetti()

function fireConfetti(): void {
  confetti.fire()
}
</script>
```

### `create(canvas?: HTMLCanvasElement, options?: GlobalOptions) => CreateTypes`

This method creates an instance of the confetti function that uses a custom canvas.

Use if you need to specify your own parameters for confetti.

```vue:line-numbers
<script setup lang="ts">
const confetti = useConfetti()

function fireConfettiWithOptions(): void {
  confetti.create()
  confetti.fire({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  })
}
</script>
```

Or like this. Specify your own Canvas.

```vue:line-numbers {4,8,17}
<script setup lang="ts">
import { ref } from 'vue'
  
const myCanvas = ref<HTMLCanvasElement | undefined>()
const confetti = useConfetti()

function fireAtPlace(): void {
  const confettiInstance = confetti.create(myCanvas.value, { resize: true })
  confettiInstance({
    spread: 70
  })
}
</script>
<template>
  <B24Button label="custom canvas" color="link" depth="dark" @click.stop="fireAtPlace" />
  <div>
    <canvas ref="myCanvas" class="h-64 w-1/2" />
  </div>
</template>
```

## Example

Here's a complete example of how to use the `useConfetti` composable:

### Simple use

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ConfettiExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/confetti/demo/Confetti.vue{2,5 vue:line-numbers}
:::

### With some options
<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ConfettiWithOptionsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/confetti/demo/ConfettiWithOptions.vue{2,5-10 vue:line-numbers}
:::

### At custom place
<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ConfettiAtPlaceExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/confetti/demo/ConfettiAtPlace.vue{4,5,8,9-11,19-22 vue:line-numbers}
:::
