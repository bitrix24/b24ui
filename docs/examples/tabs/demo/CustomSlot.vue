<script setup lang="ts">
import { reactive } from 'vue'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import Shield2ContourIcon from '@bitrix24/b24icons-vue/main/Shield2ContourIcon'

const items = [
  {
    label: 'Account',
    description: 'Make changes to your account here. Click save when you\'re done.',
    icon: UserIcon,
    slot: 'account'
  },
  {
    label: 'Password',
    description: 'Change your password here. After saving, you\'ll be logged out.',
    icon: Shield2ContourIcon,
    slot: 'password'
  }
]

const state = reactive({
  name: 'System User',
  username: 'systemuser',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
</script>

<template>
  <B24Tabs :items="items" variant="link" class="gap-4 w-full" :ui="{ trigger: 'flex-1' }">
    <template #account="{ item }">
      <p class="text-base-500 dark:text-base-400 mb-4 text-md">
        {{ item.description }}
      </p>

      <B24Form :state="state" class="flex flex-col gap-4">
        <B24FormField label="Name" name="name">
          <B24Input v-model="state.name" class="w-full" />
        </B24FormField>
        <B24FormField label="Username" name="username">
          <B24Input v-model="state.username" class="w-full" />
        </B24FormField>

        <B24Button label="Save changes" type="submit" color="success" class="self-end" />
      </B24Form>
    </template>

    <template #password="{ item }">
      <p class="text-base-500 dark:text-base-400 mb-4 text-md">
        {{ item.description }}
      </p>

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

        <B24Button label="Change password" type="submit" color="success" class="self-end" />
      </B24Form>
    </template>
  </B24Tabs>
</template>
