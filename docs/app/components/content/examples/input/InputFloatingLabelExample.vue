<script setup lang="ts">
const value = ref('')
</script>

<template>
  <B24Input v-model="value" placeholder="" :b24ui="{ base: 'peer' }">
    <label class="pointer-events-none absolute left-0 -top-[10px] text-(--b24ui-typography-label-color) text-(length:--ui-font-size-xs)/(--ui-font-line-height-reset) font-(--ui-font-weight-medium) px-1.5 transition-all peer-focus:-top-[10px] peer-focus:text-(--b24ui-typography-label-color) peer-focus:text-(length:--ui-font-size-xs)/(--ui-font-line-height-reset) peer-focus:font-(--ui-font-weight-medium) peer-placeholder-shown:text-(length:--ui-font-size-sm)/(--ui-font-line-height-reset) peer-placeholder-shown:text-(--b24ui-typography-legend-color) peer-placeholder-shown:top-[10px] peer-placeholder-shown:font-(--ui-font-weight-normal)">
      <span class="inline-flex bg-(--ui-color-base-white-fixed) px-1">Email address</span>
    </label>
  </B24Input>
</template>
