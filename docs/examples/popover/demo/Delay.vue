<script setup lang="ts">
export interface ExampleProps {
  openDelay?: number
  closeDelay?: number
}

withDefaults(defineProps<ExampleProps>(), {
  openDelay: 500,
  closeDelay: 300
})
</script>

<template>
  <B24Popover
    mode="hover"
    :open-delay="openDelay"
    :close-delay="closeDelay"
  >
    <B24Button label="Hover" color="link" depth="dark" />

    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" />
    </template>
  </B24Popover>
</template>
