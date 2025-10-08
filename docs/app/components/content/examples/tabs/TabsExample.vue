<script setup lang="ts">
import type { TabsItem } from '@bitrix24/b24ui-nuxt'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import Shield2ContourIcon from '@bitrix24/b24icons-vue/main/Shield2ContourIcon'

const items = [
  {
    label: 'Account',
    icon: UserIcon,
    slot: 'account'
  },
  {
    label: 'Password',
    icon: Shield2ContourIcon,
    slot: 'password'
  }
] satisfies TabsItem[]

const state = reactive({
  name: 'System User',
  username: 'system-user',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
</script>

<template>
  <B24Tabs :items="items">
    <template #account>
      <B24Form :state="state" class="flex flex-col gap-4">
        <B24FormField label="Name" name="name">
          <B24Input v-model="state.name" class="w-full" />
        </B24FormField>
        <B24FormField label="Username" name="username">
          <B24Input v-model="state.username" class="w-full" />
        </B24FormField>
      </B24Form>
    </template>

    <template #password>
      <B24Form :state="state" class="flex flex-col gap-4">
        <B24FormField label="Current Password" name="current" required>
          <B24Input v-model="state.currentPassword" type="password" required class="w-full" />
        </B24FormField>
        <B24FormField label="New Password" name="new" required>
          <B24Input v-model="state.newPassword" type="password" required class="w-full" />
        </B24FormField>
        <B24FormField label="Confirm Password" name="confirm" required>
          <B24Input v-model="state.confirmPassword" type="password" required class="w-full" />
        </B24FormField>
      </B24Form>
    </template>
  </B24Tabs>
</template>
