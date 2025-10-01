<script setup lang="ts">
import type { DescriptionListItem } from '@bitrix24/b24ui-nuxt'

const items = ref([
  {
    label: 'Line 1.1',
    description: 'Description 1.1',
    avatar: {
      src: '/b24ui/avatar/employee.png'
    }
  },
  {
    label: 'Line 1.2',
    description: 'Description 1.2',
    avatar: {
      src: '/b24ui/avatar/assistant.png'
    }
  },
  {
    description: 'Description 1.3',
    avatar: {
      src: 'https://github.com/bitrix24.png'
    }
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
