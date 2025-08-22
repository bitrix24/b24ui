<script setup lang="ts">
export interface ExampleProps {
  variant?: any
  orientation?: any
}

withDefaults(defineProps<ExampleProps>(), {
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
    :variant="variant"
    :orientation="orientation"
    :items="items"
    :content="false"
    class="w-full"
  />
</template>
