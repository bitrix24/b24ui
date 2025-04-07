<script setup lang="ts">
import type { AvatarGroup } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  size?: AvatarGroup['size']
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md' as const
})
</script>

<template>
  <B24AvatarGroup :size="size">
    <B24Avatar src="/b24ui/avatar/employee.png" alt="Employee Name" />
    <B24Avatar src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
    <B24Avatar src="/b24ui/avatar/employee.png" alt="Employee Name" class="rotate-y-180" />
  </B24AvatarGroup>
</template>
