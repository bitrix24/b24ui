<script setup lang="ts">
const { screen } = useDevice()
</script>

<template>
  <div class="flex flex-col gap-2">
    <B24Button :color="screen.isMobile ? 'air-primary' : 'air-secondary'">
      Adaptive button
    </B24Button>
  </div>
</template>
