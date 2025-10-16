---
title: useConfetti
description: Performant confetti animation in the browser
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/useConfetti.ts
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/confetti
  - label: canvas-confetti
    iconName: GitHubIcon
    to: https://github.com/catdad/canvas-confetti
---

## Usage

Use the auto-imported `useConfetti` composable to programmatically control `canvas-confetti`.

```vue
<script setup lang="ts">
const confetti = useConfetti()
</script>
```

- The `useConfetti` composable is created using `createSharedComposable`, ensuring that the same `canvas-confetti` is shared across your entire application.

::caution
Since canvas-confetti works with the DOM, make sure your code only runs on the client.
::

## API

`fire(options?: confetti.Options) => Promise<undefined> | null`{lang="ts-type"}

Fire some confetti.

```vue
<script setup lang="ts">
const confetti = useConfetti()

function fireConfetti(): void {
  confetti.fire()
}
</script>
```

`create(canvas?: HTMLCanvasElement, options?: GlobalOptions) => CreateTypes`{lang="ts-type"}

This method creates an instance of the confetti function that uses a custom canvas.

Use if you need to specify your own parameters for confetti.

```vue
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

```vue {4,8,17}
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

::component-example
---
collapse: true
name: 'use-confetti--example'
---
::

### With some options

::component-example
---
collapse: true
name: 'use-confetti-some-options-example'
---
::

### At custom place

::component-example
---
collapse: true
name: 'use-confetti-custom-place-example'
---
::
