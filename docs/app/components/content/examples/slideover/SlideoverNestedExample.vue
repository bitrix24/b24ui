<script setup lang="ts">
const first = ref(false)
const second = ref(false)
</script>

<template>
  <B24Slideover v-model:open="first" title="First slideover">
    <B24Button variant="subtle" label="Open" />

    <template #body>
      <Placeholder class="h-full" />
    </template>

    <template #footer>
      <B24Slideover v-model:open="second" title="Second slideover">
        <B24Button size="lg" label="Open second" color="air-primary" />

        <template #body>
          <Placeholder class="h-full" />
        </template>

        <template #footer>
          <B24Button size="sm" color="air-tertiary" label="Cancel" :normal-case="false" @click="second = false" />
        </template>
      </B24Slideover>

      <B24Button size="sm" color="air-tertiary" label="Cancel" :normal-case="false" @click="first = false" />
    </template>
  </B24Slideover>
</template>
