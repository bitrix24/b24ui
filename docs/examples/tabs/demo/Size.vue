<script setup lang="ts">
export interface ExampleProps {
  variant?: any
  size?: any
}

withDefaults(defineProps<ExampleProps>(), {
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
    :variant="variant"
    :size="size"
    :items="items"
    :content="false"
    class="w-full"
  />
</template>
