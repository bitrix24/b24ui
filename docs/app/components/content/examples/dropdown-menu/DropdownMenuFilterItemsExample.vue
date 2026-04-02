<script setup lang="ts">
import type { DropdownMenuItem } from '@bitrix24/b24ui-nuxt'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import PaymentIcon from '@bitrix24/b24icons-vue/outline/PaymentIcon'
import Settings3Icon from '@bitrix24/b24icons-vue/actions/Settings3Icon'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'

const items: DropdownMenuItem[][] = [
  [
    {
      label: 'Profile',
      icon: UserIcon
    }, {
      label: 'Billing',
      icon: PaymentIcon
    }, {
      label: 'Settings',
      icon: Settings3Icon
    }
  ],
  [
    {
      label: 'Team',
      filter: {
        placeholder: 'Search members...'
      },
      children: [
        {
          label: 'Bitrix24',
          avatar: { src: 'https://github.com/bitrix24.png', loading: 'lazy' as const }
        },
        {
          label: 'Bitrix',
          avatar: { src: 'https://github.com/bitrix-tools.png', loading: 'lazy' as const }
        }
      ]
    },
    {
      label: 'Invite users',
      children: [
        {
          label: 'Invite by email'
        },
        {
          label: 'Invite by link'
        },
        {
          label: 'Invite by SMS'
        },
        {
          label: 'Invite by WhatsApp'
        }
      ]
    },
    {
      label: 'New team'
    }
  ]
]
</script>

<template>
  <B24DropdownMenu :items="items" :content="{ align: 'start' }" :b24ui="{ content: 'w-48', viewport: 'w-48' }">
    <B24Button label="Open" :icon="HamburgerMenuIcon" />
  </B24DropdownMenu>
</template>
