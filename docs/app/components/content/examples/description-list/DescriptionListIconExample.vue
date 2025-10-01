<script setup lang="ts">
import type { DescriptionListItem } from '@bitrix24/b24ui-nuxt'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'

const items = ref([
  {
    label: 'Line 1.1',
    description: 'Description 1.1',
    icon: SignIcon
  },
  {
    label: 'Line 1.2',
    description: 'Description 1.2',
    avatar: {
      icon: PersonIcon
    }
  },
  {
    description: 'Description 1.3',
    icon: SignIcon
  }
] satisfies DescriptionListItem[])
</script>

<template>
  <B24DescriptionList
    legend="Applicant Information"
    text="Personal details and application."
    :items="items"
  />
</template>
