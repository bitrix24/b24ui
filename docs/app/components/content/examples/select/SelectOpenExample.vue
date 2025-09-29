<script setup lang="ts">
const open = ref(false)
const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const value = ref('My company details')

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24Select v-model="value" v-model:open="open" :items="items" class="w-[192px]" />
</template>
