<script setup lang="ts">
import type { AvatarProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  text?: string
  size?: AvatarProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  text: '+24',
  size: 'xl' as const
})
</script>

<template>
  <B24Avatar
    :text="text"
    :size="size"
  />
</template>
