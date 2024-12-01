<script setup lang="ts">
</script>

<template>
  <div class="relative rounded-lg overflow-hidden bg-tertiary dark:bg-tertiary/25">
    <div
      style="background-position: 10px 10px"
      class="
        absolute inset-0
        bg-grid-example
        dark:bg-grid-example
        [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]
        dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]
      "
    />
    <div
      class="
        relative rounded-lg overflow-hidden
        p-8 min-h-40
        flex flex-col flex-nowrap
        justify-center items-center
      "
    >
      <slot />
    </div>
    <div
      class="
        pointer-events-none
        absolute rounded-lg inset-0
        border
        border-black/5 dark:border-white/5
      "
    />
  </div>
</template>
