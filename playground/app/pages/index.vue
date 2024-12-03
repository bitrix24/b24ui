<script setup lang="ts">
import usePageMeta from './../composables/usePageMeta'

usePageMeta.setPageTitle('Playground')
</script>

<template>
  <div class="text-center">
    <div class="flex items-center justify-center gap-1">
      <B24Kbd value="meta" /> <B24Kbd value="K" />
    </div>
  </div>
</template>
