<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  tagColor: any
  tag?: string
}

withDefaults(defineProps<ExampleProps>(), {
  tagColor: 'default',
  tag: 'info'
})

const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const value = ref('Access permissions')
</script>

<template>
  <B24Select
    v-model="value"
    :tag-color="tagColor"
    :tag="tag"
    :items="items"
    class="w-full"
  />
</template>
