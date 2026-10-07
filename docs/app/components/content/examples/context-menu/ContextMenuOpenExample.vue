<script setup lang="ts">
import type { ContextMenuItem } from '@bitrix24/b24ui-nuxt'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import PaymentIcon from '@bitrix24/b24icons-vue/outline/PaymentIcon'
import Settings3Icon from '@bitrix24/b24icons-vue/actions/Settings3Icon'

const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})

const items: ContextMenuItem[] = [
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
]
</script>

<template>
  <B24ContextMenu v-model:open="open" :items="items" :b24ui="{ content: 'w-50' }">
    <div class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) text-legend text-(length:--ui-font-size-sm) bg-default aspect-video w-72">
      Right click here
    </div>
  </B24ContextMenu>
</template>
