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
  <B24Slideover
    v-model:open="first"
    :title="title"
    :description="description"
  >
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="size-full" />
    </template>

    <template #footer>
      <div class="flex flex-row gap-[10px]">
        <B24Slideover
          v-model:open="second"
          title="Second Slideover"
          :b24ui="{ content: 'sm:top-[300px] sm:max-h-[calc(100%-300px)]' }"
        >
          <B24Button
            color="air-primary"
            label="Open second"
          />

          <template #body>
            <Placeholder class="size-full" />
          </template>

          <template #footer>
            <B24Button
              color="air-tertiary"
              label="Close"
              @click="second = false"
            />
          </template>
        </B24Slideover>
        <B24Button
          label="Close"
          color="air-tertiary"
          @click="first = false"
        />
      </div>
    </template>
  </B24Slideover>
</template>
