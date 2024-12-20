<script setup lang="ts">
const $props = withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Some line'
})
</script>

<template>
  <div class="text-h6 text-base-200 dark:text-base-800 mb-1">
    <slot>-- {{ $props.title }} --</slot>
  </div>
</template>
