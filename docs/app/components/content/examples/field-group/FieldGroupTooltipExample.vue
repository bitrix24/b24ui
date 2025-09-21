<script setup lang="ts">
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'
</script>

<template>
  <B24FieldGroup>
    <B24Input placeholder="Enter token" />

    <B24Tooltip text="Copy to clipboard">
      <B24Button
        :icon="MoreMIcon"
      />
    </B24Tooltip>
  </B24FieldGroup>
</template>
