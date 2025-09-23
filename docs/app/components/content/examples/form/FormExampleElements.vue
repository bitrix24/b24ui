<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'

const schema = z.object({
  input: z.string().min(10),
  inputNumber: z.number().min(10),
  inputMenu: z.any().refine(option => option?.value === 'option-2', {
    message: 'Select Option 2'
  }),
  inputMenuMultiple: z.any().refine(values => !!values?.find((option: any) => option.value === 'option-2'), {
    message: 'Include Option 2'
  }),
  textarea: z.string().min(10),
  select: z.string().refine(value => value === 'option-2', {
    message: 'Select Option 2'
  }),
  selectMultiple: z.array(z.string()).refine(values => values.includes('option-2'), {
    message: 'Include Option 2'
  }),
  selectMenu: z.any().refine(option => option?.value === 'option-2', {
    message: 'Select Option 2'
  }),
  selectMenuMultiple: z.any().refine(values => !!values?.find((option: any) => option.value === 'option-2'), {
    message: 'Include Option 2'
  }),
  switch: z.boolean().refine(value => value === true, {
    message: 'Toggle me'
  }),
  checkbox: z.boolean().refine(value => value === true, {
    message: 'Check me'
  }),
  radioGroup: z.string().refine(value => value === 'option-2', {
    message: 'Select Option 2'
  }),
  checkboxGroup: z.any().refine(values => !!values?.find((option: any) => option === 'option-2'), {
    message: 'Include Option 2'
  }),
  range: z.number().max(20, { message: 'Must be less than 20' }),
  // pin: z.string().regex(/^\d$/).array().length(5),
  file: z.file().min(1).max(1024 * 1024).mime('image/png')
})

type Schema = z.input<typeof schema>

const state = reactive<Partial<Schema>>({})

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
  state.range = undefined
  state.file = undefined
}
</script>

<template>
  <B24Form ref="form" :state="state" :schema="schema" class="w-full" @submit="onSubmit">
    <div class="grid grid-cols-3 gap-4">
      <B24FormField label="Input" name="input">
        <B24Input v-model="state.input" placeholder="john@lennon.com" class="w-full" />
      </B24FormField>

      <div class="flex flex-col gap-4">
        <B24FormField name="switch">
          <B24Switch v-model="state.switch" label="Switch me" />
        </B24FormField>

        <B24FormField name="checkbox">
          <B24Checkbox v-model="state.checkbox" label="Check me" />
        </B24FormField>
      </div>

      <B24FormField name="slider" label="Slider">
        <B24Range v-model="state.range" />
      </B24FormField>

      <B24FormField name="select" label="Select">
        <B24Select v-model="state.select" :items="items" class="w-full" />
      </B24FormField>

      <B24FormField name="selectMultiple" label="Select (Multiple)">
        <B24Select v-model="state.selectMultiple" multiple :items="items" class="w-full" />
      </B24FormField>

      <B24FormField name="selectMenu" label="Select Menu">
        <B24SelectMenu v-model="state.selectMenu" :items="items" class="w-full" />
      </B24FormField>

      <B24FormField name="selectMenuMultiple" label="Select Menu (Multiple)">
        <B24SelectMenu v-model="state.selectMenuMultiple" multiple :items="items" class="w-full" />
      </B24FormField>

      <B24FormField name="inputMenu" label="Input Menu">
        <B24InputMenu v-model="state.inputMenu" :items="items" class="w-full" />
      </B24FormField>

      <B24FormField name="inputMenuMultiple" label="Input Menu (Multiple)">
        <B24InputMenu v-model="state.inputMenuMultiple" multiple :items="items" class="w-full" />
      </B24FormField>

      <B24FormField name="inputNumber" label="Input Number">
        <B24InputNumber v-model="state.inputNumber" class="w-full" />
      </B24FormField>

      <B24FormField label="Textarea" name="textarea">
        <B24Textarea v-model="state.textarea" class="w-full" />
      </B24FormField>
      <div class="flex gap-4">
        <B24FormField name="radioGroup">
          <B24RadioGroup v-model="state.radioGroup" legend="Radio group" :items="items" />
        </B24FormField>
        <B24FormField name="checkboxGroup">
          <B24CheckboxGroup v-model="state.checkboxGroup" legend="Checkbox group" :items="items" />
        </B24FormField>
      </div>
      <!-- B24FormField name="pin" label="Pin Input" :error-pattern="/(pin)\..*/">
        <B24PinInput v-model="state.pin" />
      </B24FormField -->

      <B24FormField name="file" label="File Input">
        <B24FileUpload
          v-model="state.file"
          label="Drop your image here"
          description="PNG (max. 1MB)"
          class="w-full min-h-44"
        />
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
