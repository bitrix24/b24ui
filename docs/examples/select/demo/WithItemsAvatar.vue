<script setup lang="ts">
import { ref, computed } from 'vue'
import MyPlanIcon from '@bitrix24/b24icons-vue/main/MyPlanIcon'

const items = ref([
  {
    label: 'Assistant',
    value: 'assistant',
    avatar: {
      src: '/b24ui/avatar/assistant.png',
      alt: 'assistant'
    }
  },
  {
    label: 'Employee',
    value: 'employee',
    avatar: {
      src: '/b24ui/avatar/employee.png',
      alt: 'employee'
    }
  }
])
const value = ref('employee')

const avatar = computed(() => items.value.find(item => item.value === value.value)?.avatar)
</script>

<template>
  <B24Select
    v-model="value"
    :items="items"
    :avatar="avatar"
  />
</template>
