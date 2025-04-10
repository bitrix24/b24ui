<script setup lang="ts">
import { reactive } from 'vue'
import type { FormError, FormErrorEvent, FormSubmitEvent } from '@bitrix24/b24ui-nuxt'

const state = reactive({
  email: undefined,
  password: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ name: 'email', message: 'Required' })
  if (!state.password) errors.push({ name: 'password', message: 'Required' })
  return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<typeof state>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}

async function onError(event: FormErrorEvent) {
  if (event?.errors?.[0]?.id) {
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <B24Form
      :validate="validate"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
      @error="onError"
    >
      <B24FormField label="Email" name="email">
        <B24Input v-model="state.email" />
      </B24FormField>

      <B24FormField label="Password" name="password">
        <B24Input v-model="state.password" type="password" />
      </B24FormField>

      <B24Separator class="mt-6 mb-3" />

      <B24Button type="submit" color="success">
        Submit
      </B24Button>
    </B24Form>
  </div>
</template>
