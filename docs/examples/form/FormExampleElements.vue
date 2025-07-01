<script setup lang="ts">
import { reactive, ref, useTemplateRef } from 'vue'
import * as z from 'zod'
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'
import SuccessIcon from '@bitrix24/b24icons-vue/button/SuccessIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'
import Shining2Icon from '@bitrix24/b24icons-vue/main/Shining2Icon'

defineOptions({ inheritAttrs: false })

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
  range: z.number().max(20, { message: 'Must be less than 20' })
})

type Schema = z.input<typeof schema>

const isShowResult = ref(false)
const autoResultSeconds = ref(20)

const state = reactive<Partial<Schema>>({})

const form = useTemplateRef('form')

const items = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' }
]

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data, state)
  isShowResult.value = true
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

  isShowResult.value = false
}

function fillState() {
  state.input = 'john john john'
  state.inputNumber = 11
  state.inputMenu = { label: 'Option 2', value: 'option-2' }
  state.inputMenuMultiple = [{ label: 'Option 2', value: 'option-2' }]
  state.textarea = 'john john john john john'
  state.select = 'option-2'
  state.selectMultiple = ['option-2']
  state.selectMenu = { label: 'Option 2', value: 'option-2' }
  state.selectMenuMultiple = [{ label: 'Option 2', value: 'option-2' }]
  state.switch = true
  state.checkbox = true
  state.radioGroup = 'option-2'
  state.range = 15
}
</script>

<template>
  <B24Alert
    v-if="isShowResult"
    :icon="SuccessIcon"
    description="The form has been submitted."
    size="sm"
    color="success"
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
            class="cursor-pointer size-full opacity-0 group-hover:opacity-100 text-base-500 dark:text-base-600 group-hover:text-base-900 dark:group-hover:text-base-900 absolute inset-x-0 inset-y-0 z-20"
            @click="resetState"
          />
        </div>
      </div>
    </template>
  </B24Alert>
  <B24Form
    v-show="!isShowResult"
    v-bind="$attrs"
    ref="form"
    :state="state"
    :schema="schema"
    class="space-y-6"
    @submit="onSubmit"
  >
    <B24FormField label="Input" name="input">
      <B24Input v-model="state.input" placeholder="john@lennon.com" class="w-full" />
    </B24FormField>

    <B24FormField name="switch" label="Switch">
      <B24Switch v-model="state.switch" label="Switch me" />
    </B24FormField>

    <B24FormField name="checkbox" label="Checkbox">
      <B24Checkbox v-model="state.checkbox" label="Check me" />
    </B24FormField>

    <B24FormField name="range" label="Range">
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
      <B24InputMenu v-model="state.inputMenuMultiple" multiple placeholder="Select..." :items="items" class="w-full" />
    </B24FormField>

    <B24FormField name="inputNumber" label="Input Number">
      <B24InputNumber v-model.number="state.inputNumber" class="w-full" />
    </B24FormField>

    <B24FormField label="Textarea" name="textarea">
      <B24Textarea v-model="state.textarea" class="w-full" />
    </B24FormField>

    <B24FormField name="radioGroup">
      <B24RadioGroup v-model="state.radioGroup" legend="Radio group" :items="items" />
    </B24FormField>

    <B24Separator class="mt-6 mb-3" />
    <div class="flex flex-row gap-4 items-center justify-between">
      <div class="flex gap-2">
        <B24Button type="submit" label="Submit" color="success" :disabled="!!$attrs?.disabled" />
        <B24Button label="Clear" color="link" :disabled="!!$attrs?.disabled" @click="form?.clear(); resetState()" />
      </div>

      <B24Button
        type="button"
        class="text-base-master/10 dark:text-base-100/20"
        color="link"
        :icon="Shining2Icon"
        :disabled="!!$attrs?.disabled"
        @click="fillState"
      />
    </div>
  </B24Form>
</template>
