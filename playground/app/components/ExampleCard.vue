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
    class="overflow-hidden p-5"
    :class="[
      $props.useBg ? 'rounded-[10px] backdrop-blur-md bg-(--ui-color-design-outline-na-bg) border-1 border-(--ui-color-design-outline-na-stroke)' : ''
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
