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
  <B24Button label="custom canvas" color="air-primary-success" @click.stop="fireAtPlace" />

  <div class="relative mt-sm2 mb-4 w-full">
    <canvas
      ref="myCanvas"
      class="m-auto h-64 w-1/2 rounded backdrop-blur-md bg-(--ui-color-design-outline-na-bg) border-1 border-(--ui-color-design-outline-na-stroke)"
    />
  </div>
</template>
