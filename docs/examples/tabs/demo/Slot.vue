<script setup lang="ts">
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import SmartProcessIcon from '@bitrix24/b24icons-vue/main/SmartProcessIcon'

const items = [
  {
    label: 'My Bitrix24',
    icon: Bitrix24Icon,
    content: 'Content for My Bitrix24.'
  },
  {
    label: 'Start page',
    icon: SmartProcessIcon,
    content: 'Content for the home page.'
  }
]
</script>

<template>
  <B24Tabs :items="items" class="w-full">
    <template #content="{ item }">
      <p>This is the {{ item.label }} tab.</p>
    </template>
  </B24Tabs>
</template>
