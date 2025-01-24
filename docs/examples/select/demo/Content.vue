<script setup lang="ts">
import { ref, computed } from 'vue'

export interface ExampleProps {
  contentAlign?: 'start' | 'center' | 'end'
  contentSide?: 'top' | 'right' | 'bottom' | 'left'
  contentSideOffset?: number
}

const props = withDefaults(defineProps<ExampleProps>(), {
  contentAlign: 'start',
  contentSide: 'left',
  contentSideOffset: 8
})

const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const value = ref('My company details')

const content = computed(() => {
  return {
    align: props.contentAlign,
    side: props.contentSide,
    sideOffset: props.contentSideOffset
  }
})
</script>

<template>
  <B24Select
    v-model="value"
    :items="items"
    :content="content"
  />
</template>
