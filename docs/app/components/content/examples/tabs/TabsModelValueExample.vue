<script setup lang="ts">
import type { TabsItem } from '@bitrix24/b24ui-nuxt'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import Shield2ContourIcon from '@bitrix24/b24icons-vue/main/Shield2ContourIcon'

const items: TabsItem[] = [
  {
    label: 'Account',
    icon: UserIcon
  },
  {
    label: 'Password',
    icon: Shield2ContourIcon
  }
]

const active = ref('0')

// Note: This is for demonstration purposes only. Don't do this at home.
onMounted(() => {
  setInterval(() => {
    active.value = String((Number(active.value) + 1) % items.length)
  }, 2000)
})
</script>

<template>
  <B24Tabs v-model="active" :content="false" :items="items" class="w-full" />
</template>
