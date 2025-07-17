<script setup lang="ts">
const $props = withDefaults(defineProps<{
  title?: string
  useBg?: boolean
}>(), {
  title: 'Some example',
  useBg: true
})
</script>

<template>
  <div
    :class="[
      $props.useBg ? 'overflow-hidden p-5 rounded bg-(--ui-color-bg-content-secondary)' : ''
    ]"
  >
    <slot name="title">
      <ProseH5>
        [{{ $props.title }}]
      </ProseH5>
    </slot>
    <slot />
  </div>
</template>
