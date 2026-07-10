<script setup lang="ts">
import Location1Icon from '@bitrix24/b24icons-vue/main/Location1Icon'

const searchTerm = ref('F')
const items = ref([
  { label: 'France', icon: Location1Icon, value: 'FR' },
  { label: 'Germany', icon: Location1Icon, value: 'DE' },
  { label: 'Italy', icon: Location1Icon, value: 'IT' },
  { label: 'Spain', icon: Location1Icon, value: 'ES' },
  { label: 'Netherlands', icon: Location1Icon, value: 'NL' },
  { label: 'Poland', icon: Location1Icon, value: 'PL' }
])
const value = ref()
</script>

<template>
  <B24Listbox v-model="value" v-model:search-term="searchTerm" filter :items="items" class="w-full" />
</template>
