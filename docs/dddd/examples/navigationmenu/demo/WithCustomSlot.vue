<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import ConnectionIcon from '@bitrix24/b24icons-vue/actions/ConnectionIcon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'

const items = [
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
] satisfies NavigationMenuItem[]

/**
 * @memo The setTimeout construction is needed for normal initialization of the B24NavigationMenu component in demo mode
 * In a real project, you will not dynamically load it
 */
const isInit = ref(false)
onMounted(() => {
  setTimeout(() => {
    isInit.value = true
  }, 300)
})
</script>

<template>
  <div v-if="isInit" class="min-w-[600px]">
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
