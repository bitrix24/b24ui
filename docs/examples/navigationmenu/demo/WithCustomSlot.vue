<script setup lang="ts">
import { ref } from 'vue'
import ConnectionIcon from '@bitrix24/b24icons-vue/actions/ConnectionIcon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'

const items = ref([
  {
    label: 'Sales Pipeline',
    icon: ConnectionIcon
  },
  {
    label: 'Sales Analytics',
    badge: '+3'
  },
  {
    label: 'Resources'
  },
  {
    label: 'Support',
    icon: Info1Icon,
    slot: 'support'
  }
])
</script>

<template>
  <div class="min-w-[600px]">
    <div class="relative z-[1] border-base-master/10 dark:border-base-100/20 border-y">
      <B24NavigationMenu
        :items="items"
        class="w-full justify-start"
      >
        <template #support-trailing>
          <B24Badge label="44" depth="dark" size="sm" />
        </template>
      </B24NavigationMenu>
    </div>

    <Placeholder class="h-52 w-full mt-2" />
  </div>
</template>
