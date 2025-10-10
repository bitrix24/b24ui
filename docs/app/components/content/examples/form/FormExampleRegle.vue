<script setup lang="ts">
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'
import { useRegle, type InferInput } from '@regle/core'
import { required, email, minLength, withMessage } from '@regle/rules'

const { r$ } = useRegle({ email: '', password: '' }, {
  email: { required, email: withMessage(email, 'Invalid email') },
  password: { required, minLength: withMessage(minLength(8), 'Must be at least 8 characters') }
})

type Schema = InferInput<typeof r$>

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <B24Form :schema="r$" :state="r$.$value" class="space-y-4" @submit="onSubmit">
    <B24FormField label="Email" name="email">
      <B24Input v-model="r$.$value.email" />
    </B24FormField>

    <B24FormField label="Password" name="password">
      <B24Input v-model="r$.$value.password" type="password" />
    </B24FormField>

    <B24Button type="submit">
      Submit
    </B24Button>
  </B24Form>
</template>
