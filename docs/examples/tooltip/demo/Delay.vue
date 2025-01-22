<script setup lang="ts">
import DealPlusIcon from '@bitrix24/b24icons-vue/crm/DealPlusIcon'

export interface ExampleProps {
  delayDuration?: number
}

const props = withDefaults(defineProps<ExampleProps>(), {
  delayDuration: 0
})
</script>

<template>
  <B24Tooltip
    text="Opens the deal creation form in the slider"
    :delay-duration="props.delayDuration"
  >
    <B24Button label="New deal" color="success" :icon="DealPlusIcon" />
  </B24Tooltip>
</template>
