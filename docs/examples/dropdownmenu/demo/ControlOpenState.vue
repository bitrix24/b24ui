<script setup lang="ts">
import { ref, computed } from 'vue'
import { dropdownMenuSimpleItems } from './../dictionary'
import type { ContentAlignVariants, ContentSideVariants } from './../../dictionary'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'

export interface ExampleProps {
  contentAlign?: ContentAlignVariants
  contentSide?: ContentSideVariants
  contentSideOffset?: number
}

const props = withDefaults(defineProps<ExampleProps>(), {
  contentAlign: 'start' as ContentAlignVariants,
  contentSide: 'top' as ContentSideVariants,
  contentSideOffset: 8
})

const content = computed(() => {
  return {
    align: props.contentAlign,
    side: props.contentSide,
    sideOffset: props.contentSideOffset
  }
})

const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24DropdownMenu
    v-model:open="open"
    :items="dropdownMenuSimpleItems"
    :b24ui="{ viewport: 'w-[350px]' }"
    :content="content"
  >
    <B24Button label="Open" color="air-secondary-accent" :icon="HamburgerMenuIcon" />
  </B24DropdownMenu>
</template>
