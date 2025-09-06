<script setup lang="ts">
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'
import CheckIcon from '@bitrix24/b24icons-vue/main/CheckIcon'
</script>

<template>
  <B24Switch
    :unchecked-icon="Cross30Icon"
    :checked-icon="CheckIcon"
    default-value
    label="Post administrator change notification to the General chat"
  />
</template>
