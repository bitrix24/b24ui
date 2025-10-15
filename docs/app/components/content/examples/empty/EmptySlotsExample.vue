<script setup lang="ts">
import type { UserProps } from '@bitrix24/b24ui-nuxt'
import AddProductIcon from '@bitrix24/b24icons-vue/outline/AddProductIcon'

const members: UserProps[] = [
  {
    name: 'Employee Name',
    description: 'Team employee',
    to: 'https://github.com/bitrix24',
    target: '_blank',
    avatar: {
      src: '/b24ui/avatar/employee.png',
      alt: 'Employee Name'
    }
  },
  {
    name: 'Employee Name',
    description: 'Team assistant',
    to: 'https://github.com/bitrix24',
    target: '_blank',
    avatar: {
      src: '/b24ui/avatar/assistant.png',
      alt: 'Assistant Name'
    }
  }
]
</script>

<template>
  <B24Empty
    title="No team members"
    description="Invite your team to collaborate on this project."
    :actions="[{
      label: 'Invite members',
      icon: AddProductIcon
    }]"
  >
    <template #leading>
      <B24AvatarGroup size="xl">
        <B24Avatar src="/b24ui/avatar/employee.png" alt="Employee Name" />
        <B24Avatar src="https://github.com/bitrix24.png" alt="bitrix24" />
      </B24AvatarGroup>
    </template>

    <template #footer>
      <B24Separator class="my-4" />

      <div class="grid grid-cols-2 gap-4">
        <B24Card
          v-for="(member, index) in members"
          :key="index"
          :b24ui="{ body: 'p-4 sm:p-4' }"
        >
          <B24User
            :avatar="member.avatar"
            :name="member.name"
            :description="member.description"
            :b24ui="{ name: 'truncate' }"
          />
          <div class="mt-2 w-full flex flex-row justify-end">
            <B24Link
              class="text-xs"
              is-action
              :to="member.to"
              :target="member.target"
            >
              Invite
            </B24Link>
          </div>
        </B24Card>
      </div>
    </template>
  </B24Empty>
</template>
