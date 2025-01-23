<script setup lang="ts">
export interface ExampleProps {
  color?: any
  variant?: any
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default',
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
    :items="items"
    :content="false"
    class="w-full"
  />
</template>
