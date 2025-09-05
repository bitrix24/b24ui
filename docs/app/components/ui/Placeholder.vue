<script setup lang="ts">
import { useId } from 'vue'

const patternId = `pattern-${useId()}`
</script>

<template>
  <div class="relative overflow-hidden rounded-md border border-dashed border-(--ui-color-divider-vibrant-accent-more) px-4 flex items-center justify-center">
    <svg class="absolute inset-0 h-full w-full stroke-(--ui-color-divider-vibrant-accent-more)">
      <defs>
        <pattern
          :id="patternId"
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
        </pattern>
      </defs>
      <rect stroke="none" :fill="`url(#${patternId})`" width="100%" height="100%" />
    </svg>

    <slot />
  </div>
</template>
