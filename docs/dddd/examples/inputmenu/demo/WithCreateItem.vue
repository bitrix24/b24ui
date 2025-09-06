<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  'CRM settings',
  'My company details',
  'Access permissions'
])
const value = ref(items.value[1])

function onCreate(item: string) {
  items.value.push(item)

  value.value = item
}
</script>

<template>
  <B24InputMenu
    v-model="value"
    create-item
    :items="items"
    class="w-full"
    @create="onCreate"
  />
</template>
