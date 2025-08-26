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
    :b24ui="{ content: 'p-[10px]' }"
  >
    <B24Button label="Hover" />

    <template #content>
      <Placeholder class="size-[192px]" />
    </template>
  </B24Popover>
</template>
