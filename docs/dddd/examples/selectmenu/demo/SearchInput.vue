<script setup lang="ts">
import { ref } from 'vue'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'

export interface ExampleProps {
  searchInputPlaceholder?: string
}

withDefaults(defineProps<ExampleProps>(), {
  searchInputPlaceholder: 'Filter...'
})

const items = ref([
  {
    label: 'CRM settings',
    value: 'settings'
  },
  {
    label: 'My company details',
    value: 'my_company_details'
  },
  {
    label: 'Access permissions',
    value: 'access_permissions'
  }
])
const value = ref({
  label: 'My company details',
  value: 'my_company_details'
})
</script>

<template>
  <B24SelectMenu
    v-model="value"
    :items="items"
    :search-input="{
      placeholder: searchInputPlaceholder,
      icon: Search2Icon
    }"
    class="w-full"
  />
  <B24Separator class="my-3 w-full" label="hide the search input" type="dotted" />
  <B24SelectMenu
    v-model="value"
    :items="items"
    :search-input="false"
    class="w-full"
  />
</template>
