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
  <B24Button label="custom canvas" color="collab" @click.stop="fireAtPlace" />

  <div class="relative mt-sm2 mb-4 w-full">
    <canvas
      ref="myCanvas"
      class="m-auto h-64 w-1/2 rounded border border-base-300 bg-base-100 dark:border-base-600 dark:bg-base-900"
    />
  </div>
</template>
