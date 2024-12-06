<script setup lang="ts">
const $props = withDefaults(defineProps<{
  title: string
}>(), {
  title: 'Some example'
})
</script>

<template>
  <div class="p-4 bg-white rounded-lg">
    <div class="text-h5 font-semibold text-base-900 mb-1 pb-2 border-b-1 border-base-200">
      [{{ $props.title }}]
    </div>
    <slot />
  </div>
</template>
