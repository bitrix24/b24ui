<script setup lang="ts">
const first = ref(false)
const second = ref(false)
</script>

<template>
  <B24Slideover v-model:open="first" title="First slideover" :b24ui="{ footer: 'justify-end' }">
    <B24Button variant="subtle" label="Open" />

    <template #body>
      <Placeholder class="h-full" />
    </template>

    <template #footer>
      <B24Button label="Close" variant="outline" @click="first = false" />

      <B24Slideover v-model:open="second" title="Second slideover" :b24ui="{ footer: 'justify-end' }">
        <B24Button label="Open second" color="air-primary" />

        <template #body>
          <Placeholder class="h-full" />
        </template>

        <template #footer>
          <B24Button label="Close" @click="second = false" />
        </template>
      </B24Slideover>
    </template>
  </B24Slideover>
</template>
