<script setup lang="ts">
const $props = withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Some example'
})
</script>

<template>
  <div class="overflow-hidden p-5 rounded bg-(--ui-color-bg-content-secondary)">
    <slot name="title">
      <ProseH5>
        [{{ $props.title }}]
      </ProseH5>
    </slot>
    <slot />
  </div>
</template>
