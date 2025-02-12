<script setup lang="ts">
import { ref } from 'vue'

const first = ref(false)
const second = ref(false)
</script>

<template>
  <B24Modal
    v-model:open="first"
    title="First modal"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #footer>
      <B24Button
        rounded
        label="Close"
        color="link"
        depth="dark"
        size="sm"
        @click="first = false"
      />
      <B24Modal
        v-model:open="second"
        title="Second modal"
      >
        <B24Button
          color="default"
          label="Open second"
          rounded
          size="sm"
        />

        <template #footer>
          <B24Button
            rounded
            label="Close"
            color="link"
            depth="dark"
            size="sm"
            @click="second = false"
          />
        </template>
      </B24Modal>
    </template>
  </B24Modal>
</template>
