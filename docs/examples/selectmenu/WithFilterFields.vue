<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/WithFilterFields.vue'
</script>

<template>
  <ComponentShowExample>
    <div class="w-full sm:w-2/3">
      <Suspense>
        <Demo />
      </Suspense>
    </div>
  </ComponentShowExample>
</template>
