<script setup lang="ts">
const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const value = ref('My company details')

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
    class="w-[320px]"
    @create="onCreate"
  />
</template>
