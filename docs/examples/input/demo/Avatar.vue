<script setup lang="ts">
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
</script>

<template>
  <B24Input
    :avatar="{ src: '/b24ui/avatar/employee.png' }"
    placeholder="Search..."
  />
  <B24Input
    :avatar="{ icon: Bitrix24Icon }"
    placeholder="Search..."
  />
</template>
