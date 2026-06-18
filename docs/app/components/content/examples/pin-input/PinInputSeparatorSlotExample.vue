<script setup lang="ts">
import Minus40Icon from '@bitrix24/b24icons-vue/actions/Minus40Icon'
</script>

<template>
  <B24PinInput :length="6" :separator="3" placeholder="○">
    <template #separator>
      <Minus40Icon class="size-4" />
    </template>
  </B24PinInput>
</template>
