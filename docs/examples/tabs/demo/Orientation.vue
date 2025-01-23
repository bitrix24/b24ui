<script setup lang="ts">
export interface ExampleProps {
  color?: any
  variant?: any
  orientation?: any
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default',
  orientation: 'horizontal',
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
    :orientation="orientation"
    :items="items"
    :content="false"
    class="w-full"
  />
</template>
