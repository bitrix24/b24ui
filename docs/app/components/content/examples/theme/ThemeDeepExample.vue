<script setup lang="ts">
import MyButton from './MyButton.vue'
</script>

<template>
  <B24Theme
    :b24ui="{
      button: {
        base: 'rounded-full'
      }
    }"
  >
    <B24Card :ui="{ body: 'flex items-center gap-2 sm:flex-row flex-col' }">
      <B24Button label="Direct child" />
      <MyButton />
    </B24Card>
  </B24Theme>
</template>
