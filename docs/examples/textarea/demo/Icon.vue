<script setup lang="ts">
import CrmSearchIcon from '@bitrix24/b24icons-vue/crm/CrmSearchIcon'
</script>

<template>
  <B24Textarea
    :icon="CrmSearchIcon"
    placeholder="Search..."
    :rows="1"
    autoresize
  />
</template>
