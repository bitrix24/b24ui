<script setup lang="ts">
import UserMaskIcon from '@bitrix24/b24icons-vue/outline/UserMaskIcon'
import CreditDebitCardIcon from '@bitrix24/b24icons-vue/main/CreditDebitCardIcon'
import NotificationIcon from '@bitrix24/b24icons-vue/outline/NotificationIcon'
import LockLIcon from '@bitrix24/b24icons-vue/outline/LockLIcon'

const groups = [
  {
    id: 'settings',
    items: [
      {
        label: 'Profile',
        icon: UserMaskIcon,
        kbds: ['meta', 'P']
      },
      {
        label: 'Billing',
        icon: CreditDebitCardIcon,
        kbds: ['meta', 'B'],
        slot: 'billing' as const
      },
      {
        label: 'Notifications',
        icon: NotificationIcon
      },
      {
        label: 'Security',
        icon: LockLIcon
      }
    ]
  },
  {
    id: 'users',
    label: 'Users',
    slot: 'users' as const,
    items: [
      {
        label: 'Assistant Name',
        suffix: 'assistant',
        to: 'https://github.com/bitrix24',
        avatarSrc: '/b24ui/avatar/assistant.png',
        target: '_blank'
      },
      {
        label: 'Bitrix24',
        suffix: 'bitrix24',
        to: 'https://github.com/bitrix24',
        avatarSrc: 'https://github.com/bitrix24.png',
        target: '_blank'
      },
      {
        label: 'Employee Name',
        suffix: 'employee',
        to: 'https://github.com/bitrix24',
        avatarSrc: '/b24ui/avatar/employee.png',
        target: '_blank'
      }
    ]
  }
]
</script>

<template>
  <B24CommandPalette :groups="groups" class="flex-1 h-80">
    <template #users-leading="{ item }">
      <B24Avatar :src="item?.avatarSrc" size="2xs" />
    </template>

    <template #billing-label="{ item }">
      <span class="font-(--ui-font-weight-medium) text-(--ui-color-accent-main-primary)">{{ item.label }}</span>

      <B24Badge size="sm">
        50% off
      </B24Badge>
    </template>
  </B24CommandPalette>
</template>
