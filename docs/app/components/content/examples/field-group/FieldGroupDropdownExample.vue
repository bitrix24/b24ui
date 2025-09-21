<script setup lang="ts">
import type { DropdownMenuItem } from '@bitrix24/b24ui-nuxt'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import CreditDebitCardIcon from '@bitrix24/b24icons-vue/main/CreditDebitCardIcon'
import Settings2Icon from '@bitrix24/b24icons-vue/actions/Settings2Icon'
import CirclePlusIcon from '@bitrix24/b24icons-vue/main/CirclePlusIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'

const items: DropdownMenuItem[] = [
  {
    label: 'My account',
    avatar: { src: '/b24ui/avatar/employee.png' },
    type: 'label' as DropdownMenuItem['type']
  },
  {
    label: 'Profile',
    icon: PersonIcon,
    children: [
      {
        label: 'Billing',
        icon: CreditDebitCardIcon
      },
      {
        label: 'Settings',
        icon: Settings2Icon
      }
    ]
  },
  {
    label: 'New team',
    icon: CirclePlusIcon
  }
]
</script>

<template>
  <B24FieldGroup>
    <B24Button label="Settings" />

    <B24DropdownMenu :items="items" :content="{ align: 'end' }">
      <B24Button
        :icon="MoreMIcon"
      />
    </B24DropdownMenu>
  </B24FieldGroup>
</template>
