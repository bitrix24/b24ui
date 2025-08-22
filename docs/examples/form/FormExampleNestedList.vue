<script setup lang="ts">
/**
 * @memo You should use `state` to get all the form input values.
 */
import { reactive, ref } from 'vue'
import * as z from 'zod'
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'
import SuccessIcon from '@bitrix24/b24icons-vue/button/SuccessIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'
import Shining2Icon from '@bitrix24/b24icons-vue/main/Shining2Icon'

const schema = z.object({
  customer: z.string().min(2)
})

type Schema = z.output<typeof schema>

const itemSchema = z.object({
  description: z.string().min(1),
  price: z.number().min(0.01)
})

type ItemSchema = z.output<typeof itemSchema>

const isShowResult = ref(false)
const autoResultSeconds = ref(20)

const state = reactive<Partial<Schema & { items: Partial<ItemSchema>[] }>>({
  items: [{
    description: '',
    price: 0.01
  }]
})

function addItem() {
  if (!state.items) {
    state.items = []
  }
  state.items.push({
    description: '',
    price: 0.01
  })
}

function removeItem() {
  if (state.items) {
    state.items.pop()
  }
}

function resetState() {
  state.customer = undefined
  state.items = [{
    description: '',
    price: 0.01
  }]

  isShowResult.value = false
}

function fillState() {
  state.customer = 'john'
  state.items = []
  state.items.push({
    description: 'product 1',
    price: 10.00
  })
  state.items.push({
    description: 'product 2',
    price: 20.31
  })
}
const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'air-primary-success' })
  console.log(event.data, state)
  isShowResult.value = true
}
</script>

<template>
  <B24Alert
    v-if="isShowResult"
    :icon="SuccessIcon"
    description="The form has been submitted."
    size="sm"
    color="air-primary-success"
  >
    <template #description>
      <div class="flex flex-row items-center justify-between gap-2">
        <div>The form has been submitted.</div>
        <div class="shrink-0 relative size-6 group">
          <B24Countdown
            as="div"
            class="size-full absolute inset-x-0 inset-y-0 z-30 group-hover:z-10 group-hover:opacity-40"
            :seconds="autoResultSeconds"
            use-circle
            size="sm"
            @end="resetState"
            @click="resetState"
          />
          <Cross30Icon
            class="cursor-pointer size-full opacity-0 group-hover:opacity-100 text-(--b24ui-typography-legend-color) group-hover:text-(--b24ui-typography-legend-color) absolute inset-x-0 inset-y-0 z-20"
            @click="resetState"
          />
        </div>
      </div>
    </template>
  </B24Alert>
  <B24Form
    v-else
    :state="state"
    :schema="schema"
    class="space-y-4"
    @submit="onSubmit"
  >
    <B24FormField label="Customer" name="customer">
      <B24Input v-model="state.customer" placeholder="Wonka Industries" />
    </B24FormField>
    <div>
      <B24Form
        v-for="(item, count) in state.items"
        :key="count"
        :state="item"
        :schema="itemSchema"
        attach
        class="flex gap-1.5"
      >
        <B24FormField :label="!count ? 'Description' : undefined" name="description" class="w-34">
          <B24Input v-model="item.description" />
        </B24FormField>
        <B24FormField :label="!count ? 'Price' : undefined" name="price" class="w-30">
          <B24InputNumber v-model.number="item.price" :min="0.01" :max="999" :step="0.01" />
        </B24FormField>
      </B24Form>
    </div>
    <div class="flex flex-col sm:flex-row items-center justify-start gap-2">
      <B24Button label="Add Item" color="air-secondary" size="xs" @click="addItem()" />
      <B24Button label="Remove Item" color="air-secondary-alert" size="xs" @click="removeItem()" />
    </div>

    <B24Separator class="mt-6 mb-3" />

    <div class="flex flex-row gap-4 items-center justify-between">
      <B24Button type="submit" label="Submit" color="air-primary-success" />
      <B24Button
        type="button"
        color="air-tertiary-no-accent"
        :icon="Shining2Icon"
        @click="fillState"
      />
    </div>
  </B24Form>
</template>
