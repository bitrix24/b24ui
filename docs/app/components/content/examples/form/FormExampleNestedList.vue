<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'

const schema = z.object({
  customer: z.string().min(2)
})

type Schema = z.output<typeof schema>

const itemSchema = z.object({
  description: z.string().min(1),
  price: z.number().min(0)
})

type ItemSchema = z.output<typeof itemSchema>

const state = reactive<Partial<Schema & { items: Partial<ItemSchema>[] }>>({ })

function addItem() {
  if (!state.items) {
    state.items = []
  }
  state.items.push({})
}

function removeItem() {
  if (state.items) {
    state.items.pop()
  }
}

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'air-primary-success' })
  console.log(event.data)
}
</script>

<template>
  <B24Form
    :state="state"
    :schema="schema"
    class="gap-4 flex flex-col w-60"
    @submit="onSubmit"
  >
    <B24FormField label="Customer" name="customer">
      <B24Input v-model="state.customer" placeholder="Wonka Industries" />
    </B24FormField>

    <B24Form
      v-for="(item, count) in state.items"
      :key="count"
      :name="`items.${count}`"
      :schema="itemSchema"
      class="flex gap-2"
      nested
    >
      <B24FormField :label="!count ? 'Description' : undefined" name="description">
        <B24Input v-model="item.description" />
      </B24FormField>
      <B24FormField :label="!count ? 'Price' : undefined" name="price" class="w-20">
        <B24Input v-model="item.price" type="number" />
      </B24FormField>
    </B24Form>

    <div class="flex gap-2">
      <B24Button size="sm" @click="addItem()">
        Add Item
      </B24Button>

      <B24Button size="sm" @click="removeItem()">
        Remove Item
      </B24Button>
    </div>
    <div>
      <B24Button color="air-primary" type="submit">
        Submit
      </B24Button>
    </div>
  </B24Form>
</template>
