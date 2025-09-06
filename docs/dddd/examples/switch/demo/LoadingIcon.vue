<script setup lang="ts">
import SettingIcon from '@bitrix24/b24icons-vue/button/SettingIcon'

export interface ExampleProps {
  isLoading?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isLoading: true
})
</script>

<template>
  <B24Switch
    :loading="isLoading"
    :loading-icon="SettingIcon"
    label="Enable rich link previews"
    default-value
    size="lg"
  />
</template>
