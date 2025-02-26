<script setup lang="ts">
const confetti = useConfetti()

function fireConfetti(): void {
  confetti.fire()
}
</script>

<template>
  <B24Button label="simple" color="primary" @click.stop="fireConfetti" />
</template>
