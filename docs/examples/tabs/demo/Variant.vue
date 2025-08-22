<script setup lang="ts">
export interface ExampleProps {
  variant?: any
}

withDefaults(defineProps<ExampleProps>(), {
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
    :items="items"
    :content="false"
    class="w-full"
  />
</template>
