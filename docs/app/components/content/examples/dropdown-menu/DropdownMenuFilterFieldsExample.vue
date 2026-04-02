<script setup lang="ts">
import type { DropdownMenuItem } from '@bitrix24/b24ui-nuxt'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'

const items: DropdownMenuItem[] = [
  {
    label: 'Leanne Graham',
    description: 'Sincere@april.biz'
  },
  {
    label: 'Ervin Howell',
    description: 'Shanna@melissa.tv'
  },
  {
    label: 'Clementine Bauch',
    description: 'Nathan@yesenia.net'
  },
  {
    label: 'Patricia Lebsack',
    description: 'Julianne.OConner@kory.org'
  },
  {
    label: 'Chelsey Dietrich',
    description: 'Lucio_Hettinger@annie.me'
  }
]
</script>

<template>
  <B24DropdownMenu
    :items="items"
    filter
    :filter-fields="['label', 'description']"
    :content="{ align: 'start' }"
    :b24ui="{ content: 'w-64', viewport: 'w-64' }"
  >
    <B24Button label="Open" :icon="HamburgerMenuIcon" />
  </B24DropdownMenu>
</template>
