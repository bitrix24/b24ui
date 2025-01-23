<script setup lang="ts">
export interface ExampleProps {
  color?: any
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default'
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
    :items="items"
    :content="false"
    class="w-full"
  />
</template>
