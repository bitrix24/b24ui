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

const items = ref([
  {
    label: 'CRM settings',
    value: 'settings'
  },
  {
    label: 'My company details',
    value: 'my_company_details'
  },
  {
    label: 'Access permissions',
    value: 'access_permissions'
  }
])
const value = ref({
  label: 'My company details',
  value: 'my_company_details'
})

const content = computed(() => {
  return {
    align: props.contentAlign,
    side: props.contentSide,
    sideOffset: props.contentSideOffset
  }
})
</script>

<template>
  <B24SelectMenu
    v-model="value"
    :items="items"
    :content="content"
    class="w-full"
  />
</template>
