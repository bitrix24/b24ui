<script setup lang="ts">
const $props = withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Some example'
})
</script>

<template>
  <div class="py-sm2 px-sm overflow-hidden">
    <div class="mb-2xs2 font-b24-secondary text-black dark:text-base-150 text-h5 font-semibold">
      <slot name="title">
        [{{ $props.title }}]
      </slot>
    </div>
    <slot />
  </div>
</template>
