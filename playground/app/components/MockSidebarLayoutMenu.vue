<script setup lang="ts">
import { menuTop } from './../composables/useMockMenu'

export interface MockSidebarLayoutMenuProps {
  orientation?: 'vertical' | 'horizontal'
}

const $props = withDefaults(defineProps<MockSidebarLayoutMenuProps>(), {
  orientation: 'horizontal' as const
})
</script>

<template>
  <B24NavigationMenu
    :items="menuTop"
    :orientation="$props.orientation"
  />
</template>
