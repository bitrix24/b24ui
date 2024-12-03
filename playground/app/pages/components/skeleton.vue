<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'

usePageMeta.setPageTitle('Skeleton')
</script>

<template>
  <div class="flex items-center gap-4">
    <B24Skeleton class="h-12 w-12 rounded-full bg-base-200" />
    <div class="space-y-2">
      <B24Skeleton class="h-4 w-[250px]" />
      <B24Skeleton class="h-4 w-[200px]" />
    </div>
  </div>
  <div class="flex items-center gap-4">
    <div class="space-y-2 flex flex-col items-end">
      <B24Skeleton class="h-4 w-[250px]" />
      <B24Skeleton class="h-4 w-[200px]" />
    </div>
    <B24Skeleton class="h-12 w-12 rounded-full bg-base-200" />
  </div>
</template>
