<script setup lang="ts">
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import MailIcon from '@bitrix24/b24icons-vue/main/MailIcon'

export interface ExampleProps {
  isInset?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isInset: true
})
</script>

<template>
  <B24Chip
    :inset="isInset"
    text="+5"
  >
    <B24Avatar src="/b24ui/avatar/employee.png" />
  </B24Chip>
  <B24Chip
    :inset="isInset"
  >
    <B24Avatar :icon="Bitrix24Icon" />
  </B24Chip>
  <B24Chip
    :inset="isInset"
  >
    <B24Button :icon="MailIcon" depth="light" />
  </B24Chip>
</template>
