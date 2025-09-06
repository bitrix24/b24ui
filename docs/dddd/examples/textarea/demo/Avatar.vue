<script setup lang="ts">
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
</script>

<template>
  <B24Textarea
    :avatar="{ src: '/b24ui/avatar/employee.png' }"
    placeholder="Search..."
    :rows="1"
    autoresize
  />
  <B24Textarea
    :avatar="{ icon: Bitrix24Icon }"
    placeholder="Search..."
    :rows="1"
    autoresize
  />
</template>
