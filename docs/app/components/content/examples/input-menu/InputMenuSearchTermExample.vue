<script setup lang="ts">
const searchTerm = ref('o')
const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const value = ref(undefined)
</script>

<template>
  <B24InputMenu v-model="value" v-model:search-term="searchTerm" :items="items" />
</template>
