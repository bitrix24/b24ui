<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt/runtime/types/index.ts'
import type { DescriptionListItem } from '@bitrix24/b24ui-nuxt/runtime/components/content/DescriptionList.vue'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import DotsIcon from '@bitrix24/b24icons-vue/button/DotsIcon'

const action = (color: string): ButtonProps[] => [
  {
    icon: DotsIcon,
    color: color as any,
    depth: 'light',
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

const itemsActions: DescriptionListItem[] = [
  {
    label: 'Line 2.1',
    description: 'Description 2.1',
    actions: action('link')
  },
  {
    label: 'Line 2.2',
    description: 'Description 2.2',
    actions: action('primary')
  },
  {
    label: 'Line 2.3',
    description: 'Description 2.3',
    actions: action('link')
  },
  {
    label: 'Line 2.4',
    description: 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.',
    actions: multipleActions('default')
  }
]
</script>

<template>
  <B24DescriptionList
    legend="Applicant Information"
    text="Personal details and application."
    :items="itemsActions"
  />
</template>
