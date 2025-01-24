<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const value = ref('My company details')
</script>

<template>
  <B24Select
    v-model="value"
    v-model:open="open"
    :items="items"
    :b24ui="{
      trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
    }"
  />
</template>
