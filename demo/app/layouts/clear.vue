<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'text-base-master dark:text-base-150 bg-base-50 dark:bg-base-dark font-b24-system antialiased'
  }
})
</script>

<template>
  <div class="relative">
    <slot />
  </div>
</template>
