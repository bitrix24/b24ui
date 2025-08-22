<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  title?: string
  description?: string
}

withDefaults(defineProps<ExampleProps>(), {
  title: 'Heads up!',
  description: 'Let\'s signal the manager that the deal is not moving.'
})

const first = ref(false)
const second = ref(false)
</script>

<template>
  <B24Modal
    v-model:open="first"
    :title="title"
    :description="description"
  >
    <B24Button label="Open" />

    <template #footer>
      <div class="flex flex-row gap-[10px]">
        <B24Modal
          v-model:open="second"
          title="Second modal"
        >
          <B24Button
            color="air-primary"
            label="Open second"
          />

          <template #footer>
            <B24Button
              color="air-tertiary"
              label="Close"
              @click="second = false"
            />
          </template>
        </B24Modal>
        <B24Button
          color="air-tertiary"
          label="Close"
          @click="first = false"
        />
      </div>
    </template>
  </B24Modal>
</template>
