<script setup lang="ts">
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'

const itemsIcons = [
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
    icon: SignIcon
  },
  {
    label: 'Line 1.3',
    description: 'Description 1.3',
    avatar: {
      icon: PersonIcon
    }
  },
  {
    description: 'Description 1.4',
    icon: SignIcon
  }
]
</script>

<template>
  <B24DescriptionList
    legend="Applicant Information"
    text="Personal details and application."
    :items="itemsIcons"
  />
</template>
