<script setup lang="ts">
import Location1Icon from '@bitrix24/b24icons-vue/main/Location1Icon'
import FireIcon from '@bitrix24/b24icons-vue/outline/FireIcon'

const items = ref([
  { label: 'France', icon: Location1Icon, value: 'FR' },
  { label: 'Germany', icon: Location1Icon, value: 'DE' },
  { label: 'Italy', icon: Location1Icon, value: 'IT' },
  { label: 'Spain', icon: Location1Icon, value: 'ES' }
])
const value = ref('FR')
</script>

<template>
  <B24Listbox
    v-model="value"
    :selected-icon="FireIcon"
    value-key="value"
    :items="items"
    class="w-full"
  />
</template>
