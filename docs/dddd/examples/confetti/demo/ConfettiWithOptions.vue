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

<template>
  <B24Button label="with options" color="air-secondary" @click.stop="fireConfettiWithOptions" />
</template>
