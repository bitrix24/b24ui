<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'

const schema = z.object({
  name: z.string().min(2, 'Too short'),
  email: z.email('Invalid email'),
  bio: z.string().optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: 'John Doe',
  email: 'john@example.com',
  bio: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Saved', description: 'Your profile has been updated.', color: 'air-primary-success' })
  console.log(event.data)
}
</script>

<template>
  <B24Theme
    :b24ui="{
      formField: {
        root: 'flex max-sm:flex-col justify-between gap-4',
        wrapper: 'w-full sm:max-w-[320px]'
      }
    }"
  >
    <B24Form :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
      <B24FormField label="Name" name="name" description="Your public display name.">
        <B24Input v-model="state.name" />
      </B24FormField>

      <B24FormField label="Email" name="email" description="Used for notifications.">
        <B24Input v-model="state.email" type="email" />
      </B24FormField>

      <B24FormField label="Bio" name="bio" description="A short description about yourself.">
        <B24Textarea v-model="state.bio" placeholder="Tell us about yourself" />
      </B24FormField>

      <div class="flex justify-end">
        <B24Button type="submit">
          Save changes
        </B24Button>
      </div>
    </B24Form>
  </B24Theme>
</template>
