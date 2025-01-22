<script setup lang="ts">
import DealPlusIcon from '@bitrix24/b24icons-vue/crm/DealPlusIcon'

export interface ExampleProps {
  text?: string
}

const props = withDefaults(defineProps<ExampleProps>(), {
  text: 'Opens the deal creation form in the slider'
})
</script>

<template>
  <B24Tooltip
    :text="props.text"
  >
    <B24Button label="New deal" color="success" :icon="DealPlusIcon" />
  </B24Tooltip>
</template>
