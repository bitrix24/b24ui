<script setup lang="ts">
import { ref, computed } from 'vue'
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
const value = ref('my_company_details')

const icon = computed(() => items.value.find(item => item.value === value.value)?.icon)
</script>

<template>
  <B24Select
    v-model="value"
    :items="items"
    :icon="icon"
  />
</template>
