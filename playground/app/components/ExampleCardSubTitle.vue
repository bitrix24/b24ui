<script setup lang="ts">
const $props = withDefaults(defineProps<{
  title: string
}>(), {
  title: 'Some line'
})
</script>

<template>
  <div class="text-h6 text-base-200 mb-1">
    -- {{ $props.title }} --
  </div>
</template>
