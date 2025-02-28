<script setup lang="ts">
import { ref } from 'vue'

const first = ref(false)
const second = ref(false)
</script>

<template>
  <B24Slideover
    v-model:open="first"
    title="First Slideover"
    :b24ui="{ content: 'sm:max-w-1/2' }"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #body>
      <B24Container class="h-full w-full pb-4">
        <Placeholder class="h-full w-full" />
      </B24Container>
    </template>

    <template #footer>
      <B24Button
        rounded
        label="Close"
        color="link"
        depth="dark"
        size="sm"
        @click="first = false"
      />
      <B24Slideover
        v-model:open="second"
        title="Second Slideover"
      >
        <B24Button
          color="default"
          label="Open second"
          rounded
          size="sm"
        />

        <template #body>
          <B24Container class="h-full w-full pb-4">
            <Placeholder class="h-full w-full" />
          </B24Container>
        </template>

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
      </B24Slideover>
    </template>
  </B24Slideover>
</template>
