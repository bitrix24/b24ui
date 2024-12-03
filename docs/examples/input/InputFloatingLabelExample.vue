<script setup lang="ts">
const value = ref('')
</script>

<template>
  <B24Input v-model="value" placeholder="" :ui="{ base: 'peer' }">
    <label class="pointer-events-none absolute left-0 -top-2.5 text-base-900 text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-base-900 peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-base-400 peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
      <span class="inline-flex bg-white px-1">Email address</span>
    </label>
  </B24Input>
</template>
