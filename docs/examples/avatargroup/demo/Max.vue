<script setup lang="ts">

export interface ExampleProps {
  max?: number
}

withDefaults(defineProps<ExampleProps>(), {
  max: 2
})
</script>

<template>
  <B24AvatarGroup :max="max">
    <B24Avatar src="/b24ui/avatar/employee.png" alt="Employee Name" />
    <B24Avatar src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
    <B24Avatar src="/b24ui/avatar/employee.png" alt="Employee Name" class="rotate-y-180" />
  </B24AvatarGroup>
</template>
