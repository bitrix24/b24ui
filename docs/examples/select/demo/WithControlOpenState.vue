<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const value = ref('My company details')

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24Tooltip text="You can toggle the Select by pressing" :kbds="['O']" :content="{ side: 'top' }">
    <B24Select
      v-model="value"
      v-model:open="open"
      :items="items"
    />
  </B24Tooltip>
</template>
