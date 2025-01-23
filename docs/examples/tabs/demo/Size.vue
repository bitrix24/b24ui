<script setup lang="ts">
export interface ExampleProps {
  color?: any
  variant?: any
  size?: any
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default',
  size: 'md',
  variant: 'link'
})

const items = [
  {
    label: 'My Bitrix24'
  },
  {
    label: 'Start page'
  }
]
</script>

<template>
  <B24Tabs
    :color="color"
    :variant="variant"
    :size="size"
    :items="items"
    :content="false"
    class="w-full"
  />
</template>
