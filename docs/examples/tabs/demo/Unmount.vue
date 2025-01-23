<script setup lang="ts">
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import SmartProcessIcon from '@bitrix24/b24icons-vue/main/SmartProcessIcon'

export interface ExampleProps {
  isUnmountOnHide?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isUnmountOnHide: true
})

const items = [
  {
    label: 'My Bitrix24',
    icon: Bitrix24Icon,
    content: 'This is the Bitrix24 content.'
  },
  {
    label: 'Start page',
    icon: SmartProcessIcon,
    content: 'This is the Start page content.'
  }
]
</script>

<template>
  <B24Tabs
    :unmount-on-hide="isUnmountOnHide"
    :items="items"
    class="w-full"
  />
</template>
