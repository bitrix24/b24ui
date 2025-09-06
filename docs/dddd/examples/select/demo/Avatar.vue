<script setup lang="ts">
import { ref } from 'vue'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'

const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const value = ref('My company details')
</script>

<template>
  <B24Select
    v-model="value"
    :items="items"
    :avatar="{ src: '/b24ui/avatar/employee.png' }"
  />
  <B24Select
    v-model="value"
    :items="items"
    :avatar="{ icon: Bitrix24Icon }"
    class="w-full"
  />
</template>
