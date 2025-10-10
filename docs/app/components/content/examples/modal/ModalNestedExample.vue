<script setup lang="ts">
const first = ref(false)
const second = ref(false)
</script>

<template>
  <B24Modal v-model:open="first" title="First modal" :ui="{ footer: 'justify-end' }">
    <B24Button label="Open" />

    <template #footer>
      <B24Button label="Close" @click="first = false" />

      <B24Modal v-model:open="second" title="Second modal" :ui="{ footer: 'justify-end' }">
        <B24Button label="Open second" color="air-primary" />

        <template #footer>
          <B24Button label="Close" @click="second = false" />
        </template>
      </B24Modal>
    </template>
  </B24Modal>
</template>
