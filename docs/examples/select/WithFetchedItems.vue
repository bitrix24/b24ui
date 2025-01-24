<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/WithFetchedItems.vue'
</script>

<template>
  <ComponentShowExample>
    <div class="w-1/3">
      <Suspense>
        <Demo />
      </Suspense>
    </div>
  </ComponentShowExample>
</template>
