<script setup lang="ts">
const $props = withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Some example'
})
</script>

<template>
  <div class="p-4 bg-white dark:bg-white/10 rounded-lg overflow-hidden">
    <div class="text-h5 font-semibold text-base-900 dark:text-base-200 mb-1 pb-2 border-b-1 border-base-200 dark:border-base-900">
      <slot name="title">
        [{{ $props.title }}]
      </slot>
    </div>
    <slot />
  </div>
</template>
