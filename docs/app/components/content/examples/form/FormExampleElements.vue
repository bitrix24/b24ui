<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'

const schema = z.object({
  input: z.string({ message: 'Please enter your email' }).min(10, 'Must be at least 10 characters'),
  inputNumber: z.number({ message: 'Please enter a number' }).min(10, 'Must be at least 10'),
  inputMenu: z.any().refine(option => option?.value === 'option-2', {
    message: 'Please select Option 2'
  }),
  inputMenuMultiple: z.any().refine(values => !!values?.find((option: any) => option.value === 'option-2'), {
    message: 'Option 2 must be included'
  }),
  textarea: z.string({ message: 'Please enter a message' }).min(10, 'Must be at least 10 characters'),
  select: z.string({ message: 'Please select an option' }).refine(value => value === 'option-2', {
    message: 'Please select Option 2'
  }),
  selectMultiple: z.array(z.string(), { message: 'Please select at least one option' }).refine(values => values.includes('option-2'), {
    message: 'Option 2 must be included'
  }),
  selectMenu: z.any().refine(option => option?.value === 'option-2', {
    message: 'Please select Option 2'
  }),
  selectMenuMultiple: z.any().refine(values => !!values?.find((option: any) => option.value === 'option-2'), {
    message: 'Option 2 must be included'
  }),
  switch: z.boolean().refine(value => value === true, {
    message: 'Must be enabled'
  }),
  checkbox: z.boolean().refine(value => value === true, {
    message: 'Must be checked'
  }),
  radioGroup: z.string({ message: 'Please select an option' }).refine(value => value === 'option-2', {
    message: 'Please select Option 2'
  }),
  checkboxGroup: z.any().refine(values => !!values?.find((option: any) => option === 'option-2'), {
    message: 'Option 2 must be included'
  }),
  inputTags: z.array(z.string(), { message: 'Please add at least one tag' }).min(1, 'Please add at least one tag'),
  inputDate: z.any().refine(value => !!value, {
    message: 'Please select a date'
  }),
  inputTime: z.any().refine(value => !!value, {
    message: 'Please select a time'
  }),
  range: z.number().min(1, 'Must be greater than 0').max(20, 'Must be less than 20'),
  pin: z.string().regex(/^\d$/, 'Must be a digit').array().length(5, 'All 5 digits are required'),
  file: z.file({ message: 'Please upload a file' }).min(1, 'File is required').max(1024 * 1024, 'File must be less than 1MB').mime('image/png', 'Only PNG images are allowed')
})

type Schema = z.input<typeof schema>

const state = reactive<Partial<Schema>>({
  switch: false,
  checkbox: false,
  range: 0,
  pin: []
})

const form = useTemplateRef('form')

const items = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' }
]

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'air-primary-success' })
  console.log(event.data)
}

function resetState() {
  state.input = undefined
  state.inputNumber = undefined
  state.inputMenu = undefined
  state.inputMenuMultiple = undefined
  state.textarea = undefined
  state.select = undefined
  state.selectMenu = undefined
  state.selectMultiple = undefined
  state.selectMenuMultiple = undefined
  state.switch = undefined
  state.checkbox = undefined
  state.radioGroup = undefined
  state.checkboxGroup = undefined
  state.inputTags = undefined
  state.inputDate = undefined
  state.inputTime = undefined
  state.range = undefined
  state.pin = []
  state.file = undefined
}
</script>

<template>
  <B24Form ref="form" :state="state" :schema="schema" class="w-full" @submit="onSubmit">
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      <B24FormField label="Input" name="input">
        <B24Input v-model="state.input" placeholder="you@example.com" class="w-full" />
      </B24FormField>

      <B24FormField name="inputNumber" label="InputNumber">
        <B24InputNumber v-model="state.inputNumber" placeholder="Enter a number" class="w-full" />
      </B24FormField>

      <B24FormField name="pin" label="PinInput" :error-pattern="/(pin)\..*/">
        <B24PinInput v-model="state.pin" placeholder="○" />
      </B24FormField>

      <B24FormField name="inputDate" label="InputDate">
        <B24InputDate v-model="state.inputDate" class="w-full" />
      </B24FormField>

      <B24FormField name="inputTime" label="InputTime">
        <B24InputTime v-model="state.inputTime" class="w-full" />
      </B24FormField>

      <B24FormField name="inputTags" label="InputTags">
        <B24InputTags v-model="state.inputTags" placeholder="Add a tag..." class="w-full" />
      </B24FormField>

      <B24FormField name="inputMenu" label="InputMenu">
        <B24InputMenu v-model="state.inputMenu" :items="items" placeholder="Search an option..." class="w-full" />
      </B24FormField>

      <B24FormField name="inputMenuMultiple" label="InputMenu (Multiple)">
        <B24InputMenu v-model="state.inputMenuMultiple" multiple :items="items" placeholder="Search options..." class="w-full" />
      </B24FormField>

      <B24FormField label="Textarea" name="textarea">
        <B24Textarea v-model="state.textarea" placeholder="Write your message..." class="w-full" autoresize :maxrows="6" />
      </B24FormField>

      <B24FormField name="select" label="Select">
        <B24Select v-model="state.select" :items="items" placeholder="Choose an option" class="w-full" :b24ui="{ root: 'w-full' }" />
      </B24FormField>

      <B24FormField name="selectMultiple" label="Select (Multiple)">
        <B24Select
          v-model="state.selectMultiple"
          multiple
          :items="items"
          placeholder="Choose options"
          class="w-full"
          :b24ui="{ root: 'w-full' }"
        />
      </B24FormField>

      <div class="hidden md:block" />

      <B24FormField name="selectMenu" label="SelectMenu">
        <B24SelectMenu v-model="state.selectMenu" :items="items" placeholder="Search an option..." class="w-full" :b24ui="{ root: 'w-full' }" />
      </B24FormField>

      <B24FormField name="selectMenuMultiple" label="SelectMenu (Multiple)">
        <B24SelectMenu
          v-model="state.selectMenuMultiple"
          multiple
          :items="items"
          placeholder="Search options..."
          class="w-full"
          :b24ui="{ root: 'w-full' }"
        />
      </B24FormField>

      <div class="hidden md:block" />

      <B24FormField name="file" label="FileUpload">
        <B24FileUpload
          v-model="state.file"
          label="Drop your image here"
          description="PNG (max. 1MB)"
          class="w-full"
        />
      </B24FormField>

      <B24FormField name="checkbox" label="Checkbox">
        <B24Checkbox v-model="state.checkbox" label="Check me" />
      </B24FormField>

      <B24FormField name="switch" label="Switch">
        <B24Switch v-model="state.switch" label="Switch me" />
      </B24FormField>

      <B24FormField name="range" label="Range">
        <B24Range v-model="state.range" class="mt-2.5" />
      </B24FormField>

      <B24FormField name="checkboxGroup">
        <B24CheckboxGroup v-model="state.checkboxGroup" legend="CheckboxGroup" :items="items" />
      </B24FormField>

      <B24FormField name="radioGroup">
        <B24RadioGroup v-model="state.radioGroup" legend="RadioGroup" :items="items" />
      </B24FormField>
    </div>

    <div class="flex gap-2 mt-8">
      <B24Button color="air-primary" type="submit">
        Submit
      </B24Button>

      <B24Button @click="form?.clear(); resetState()">
        Clear
      </B24Button>
    </div>
  </B24Form>
</template>
