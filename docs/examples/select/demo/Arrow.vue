<script setup lang="ts">
import { ref } from 'vue'

const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const value = ref('Access permissions')
</script>

<template>
  <B24Select
    v-model="value"
    arrow
    :items="items"
  />
</template>
