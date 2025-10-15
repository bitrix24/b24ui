<script setup lang="ts">
import ProductIcon from '@bitrix24/b24icons-vue/outline/ProductIcon'
import AddProductIcon from '@bitrix24/b24icons-vue/outline/AddProductIcon'
import RefreshIcon from '@bitrix24/b24icons-vue/outline/RefreshIcon'
</script>

<template>
  <B24Empty
    :icon="ProductIcon"
    title="No projects found"
    description="It looks like you haven't added any projects. Create one to get started."
    :actions="[
      {
        label: 'Create new',
        icon: AddProductIcon,
        color: 'air-primary'
      },
      {
        label: 'Refresh',
        icon: RefreshIcon
      }
    ]"
  />
</template>
