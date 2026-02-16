<script setup lang="ts">
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'

const state = reactive({
  email: undefined,
  age: undefined
})

type Schema = typeof state

const form = useTemplateRef('form')

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'air-primary-success' })
  console.log(event.data)
}
</script>

<template>
  <div class="space-y-4">
    <B24Form ref="form" :state="state" class="space-y-4" @submit="onSubmit">
      <B24FormField label="Email" name="email">
        <B24Input v-model="state.email" type="email" required class="w-full" />
      </B24FormField>

      <B24FormField label="Age" name="age">
        <B24InputNumber v-model="state.age" :min="18" :max="100" required class="w-full" />
      </B24FormField>
    </B24Form>

    <B24Button color="air-primary" @click="form?.submit()">
      Submit
    </B24Button>
  </div>
</template>
