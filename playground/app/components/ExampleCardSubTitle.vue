<script setup lang="ts">
const $props = withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Some line'
})
</script>

<template>
  <div class="mb-sm2 font-b24-primary text-sm text-base-500">
    <slot>-- {{ $props.title }} --</slot>
  </div>
</template>
