<script setup lang="ts">
import type { DescriptionListItem, ButtonProps } from '@bitrix24/b24ui-nuxt'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import DotsIcon from '@bitrix24/b24icons-vue/button/DotsIcon'

const action = (color: string): ButtonProps[] => [
  {
    icon: DotsIcon,
    color: color as any,
    onClick() {
      console.log('Action clicked')
    }
  }
]

const multipleActions = (color: string): ButtonProps[] => [
  {
    label: 'Action',
    color: color as any,
    onClick() {
      console.log('Action clicked')
    }
  },
  {
    label: 'Another action',
    color: color as any,
    onClick() {
      console.log('Another action clicked')
    }
  },
  {
    label: 'One more action',
    color: color as any,
    onClick() {
      console.log('One more action clicked')
    }
  },
  {
    label: 'And one more',
    color: color as any,
    icon: SignIcon,
    onClick() {
      console.log('And one more clicked')
    }
  },
  {
    label: 'Last one',
    color: color as any,
    icon: DotsIcon,
    onClick() {
      console.log('Last one clicked')
    }
  }
]

const items = ref([
  {
    label: 'Line 1.1',
    description: 'Description 1.1',
    actions: action('air-secondary-no-accent'),
    orientation: 'horizontal' as DescriptionListItem['orientation']
  },
  {
    label: 'Line 1.2',
    description: 'Description 1.2',
    actions: action('air-primary'),
    orientation: 'horizontal' as DescriptionListItem['orientation']
  },
  {
    label: 'Line 1.3',
    description: 'Description 1.3',
    actions: action('air-tertiary-no-accent'),
    orientation: 'horizontal' as DescriptionListItem['orientation']
  },
  {
    description: 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.',
    actions: multipleActions('default'),
    orientation: 'vertical' as DescriptionListItem['orientation']
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
