<script setup lang="ts">
useHead({
  bodyAttrs: {
    // 'dark' | 'light' | 'edge-dark' | 'edge-light'
    class: `light`
  }
})
</script>

<template>
  <slot />
</template>
