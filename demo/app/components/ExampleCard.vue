<script setup lang="ts">
const $props = withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Some example'
})
</script>

<template>
  <div class="py-sm2 px-sm2 bg-white dark:bg-white/10 rounded-md overflow-hidden border-2 border-base-master/10 dark:border-base-100/20">
    <div class="mb-2xs2 font-b24-secondary text-black dark:text-base-150 text-h5 font-semibold">
      <slot name="title">
        [{{ $props.title }}]
      </slot>
    </div>
    <slot />
  </div>
</template>
