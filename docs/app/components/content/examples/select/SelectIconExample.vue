<script setup lang="ts">
const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const value = ref('My company details')
</script>

<template>
  <B24Select
    v-model="value"
    :items="items"
    :b24ui="{
      trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
    }"
    class="w-[192px]"
  />
</template>
