<script setup lang="ts">
import DealPlusIcon from '@bitrix24/b24icons-vue/crm/DealPlusIcon'

export interface ExampleProps {
  isDisabled?: boolean
}

const props = withDefaults(defineProps<ExampleProps>(), {
  isDisabled: true
})
</script>

<template>
  <B24Tooltip
    text="Opens the deal creation form in the slider"
    :disabled="props.isDisabled"
  >
    <B24Button label="New deal" color="success" :icon="DealPlusIcon" />
  </B24Tooltip>
</template>
