<script setup lang="ts">
const color = ref('#00C16A')

const chip = computed(() => ({ backgroundColor: color.value }))
</script>

<template>
  <B24Popover>
    <B24Button label="Choose color">
      <template #leading>
        <span :style="chip" class="size-3 rounded-full" />
      </template>
    </B24Button>

    <template #content>
      <B24ColorPicker v-model="color" class="p-2" />
    </template>
  </B24Popover>
</template>
