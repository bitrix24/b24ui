<script setup lang="ts">
import { useMockMenu } from './../composables/useMockMenu'
import { useNavigation } from '../composables/useNavigation'

const { menuTop } = useMockMenu()
const { externalLinks } = useNavigation()

export interface MockSidebarLayoutMenuProps {
  collapsed?: boolean
  orientation?: 'vertical' | 'horizontal'
}

const props = withDefaults(defineProps<MockSidebarLayoutMenuProps>(), {
  orientation: 'horizontal' as const,
  collapsed: false
})
</script>

<template>
  <B24NavigationMenu
    :collapsed="props.collapsed"
    :items="menuTop"
    :orientation="props.orientation"
    popover
  />

  <B24NavigationMenu
    v-if="!props.collapsed && props.orientation === 'vertical'"
    :collapsed="collapsed"
    :items="externalLinks"
    :orientation="props.orientation"
    class="mt-auto"
  />
</template>
