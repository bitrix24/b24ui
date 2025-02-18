<script setup lang="ts">
import { ref } from 'vue'
import SettingsIcon from '@bitrix24/b24icons-vue/main/SettingsIcon'
import MyPlanIcon from '@bitrix24/b24icons-vue/main/MyPlanIcon'
import Shield2DefendedIcon from '@bitrix24/b24icons-vue/main/Shield2DefendedIcon'

const items = ref([
  {
    label: 'CRM settings',
    value: 'settings',
    icon: SettingsIcon
  },
  {
    label: 'My company details',
    value: 'my_company_details',
    icon: MyPlanIcon
  },
  {
    label: 'Access permissions',
    value: 'access_permissions',
    icon: Shield2DefendedIcon
  }
])
const value = ref(items.value[1])
</script>

<template>
  <B24SelectMenu
    v-model="value"
    :items="items"
    class="w-full"
    :icon="value?.icon"
  />
</template>
