<script setup lang="ts">
import { ref } from 'vue'
import Expand1Icon from '@bitrix24/b24icons-vue/actions/Expand1Icon'

const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const value = ref('My company details')
</script>

<template>
  <B24Select
    v-model="value"
    :items="items"
    :trailing-icon="Expand1Icon"
  />
</template>
