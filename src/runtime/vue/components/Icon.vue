<script lang="ts">
export interface IconProps {
  name: string
}
</script>

<script setup lang="ts">
import { B24Icon } from '@bitrix24/b24icons-vue'

defineProps<IconProps>()
</script>

<template>
  <B24Icon :name="name.replace(/^i-/, '')" />
</template>
