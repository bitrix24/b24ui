<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'

const schema = z.object({
  name: z.string().min(2),
  news: z.boolean().default(false)
})

type Schema = z.output<typeof schema>

const nestedSchema = z.object({
  email: z.string().email()
})

type NestedSchema = z.output<typeof nestedSchema>

const state = reactive<Partial<Schema & NestedSchema>>({ })

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'air-primary-success' })
  console.log(event.data)
}
</script>

<template>
  <B24Form
    ref="form"
    :state="state"
    :schema="schema"
    class="gap-4 flex flex-col w-60"
    @submit="onSubmit"
  >
    <B24FormField label="Name" name="name">
      <B24Input v-model="state.name" placeholder="John Lennon" />
    </B24FormField>

    <div>
      <B24Checkbox v-model="state.news" name="news" label="Register to our newsletter" @update:model-value="state.email = undefined" />
    </div>

    <B24Form v-if="state.news" :schema="nestedSchema" nested>
      <B24FormField label="Email" name="email">
        <B24Input v-model="state.email" placeholder="john@lennon.com" />
      </B24FormField>
    </B24Form>

    <div>
      <B24Button color="air-primary" type="submit">
        Submit
      </B24Button>
    </div>
  </B24Form>
</template>
