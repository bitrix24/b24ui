<script setup lang="ts">
const $props = withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Some line'
})
</script>

<template>
  <div class="mb-sm2 font-b24-primary text-sm text-base-500 dark:text-base-600">
    <B24Separator decorative type="dashed" class="mb-2">
      <slot>{{ $props.title }}</slot>
    </B24Separator>
  </div>
</template>
