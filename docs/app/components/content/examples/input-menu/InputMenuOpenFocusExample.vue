<script setup lang="ts">
const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const selected = ref('My company details')
</script>

<template>
  <B24InputMenu
    v-model="selected"
    :items="items"
    open-on-focus
  />
</template>
