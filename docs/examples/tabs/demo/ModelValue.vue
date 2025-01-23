<script setup lang="ts">
import { ref, onMounted } from 'vue'

const items = [
  {
    label: 'My Bitrix24'
  },
  {
    label: 'Start page'
  }
]

const active = ref('0')

// Note: This is for demonstration purposes only. Don't do this at home.
onMounted(() => {
  setInterval(() => {
    active.value = String((Number(active.value) + 1) % items.length)
  }, 2000)
})
</script>

<template>
  <B24Tabs
    v-model="active"
    :content="false"
    :items="items"
    class="w-full"
  />
</template>
