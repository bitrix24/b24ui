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
  name: z.string().min(2),
  news: z.boolean()
})

type Schema = z.output<typeof schema>

const nestedSchema = z.object({
  email: z.string().email()
})

type NestedSchema = z.output<typeof nestedSchema>

const isShowResult = ref(false)
const autoResultSeconds = ref(20)

const state = reactive<Partial<Schema & NestedSchema>>({ })

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<any>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data, state)
  isShowResult.value = true
}

function resetState() {
  state.name = undefined
  state.news = undefined
  state.email = undefined

  isShowResult.value = false
}

function fillState() {
  state.name = 'john'
  state.news = true
  state.email = 'john@lennon.com'
}
</script>

<template>
  <div class="flex flex-col gap-4">
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
      v-else
      :state="state"
      :schema="schema"
      class="space-y-4"
      @submit="onSubmit"
    >
      <B24FormField label="Name" name="name">
        <B24Input v-model="state.name" placeholder="John Lennon" />
      </B24FormField>

      <div>
        <B24Checkbox v-model="state.news" name="news" label="Register to our newsletter" />
      </div>

      <B24Form v-if="state.news" :state="state" :schema="nestedSchema">
        <B24FormField label="Email" name="email">
          <B24Input v-model="state.email" />
        </B24FormField>
      </B24Form>

      <B24Separator class="mt-6 mb-3" />

      <div class="flex flex-row gap-4 items-center justify-between">
        <B24Button type="submit" label="Submit" color="success" />
        <B24Button
          type="button"
          class="text-base-300 dark:text-base-700"
          color="link"
          :icon="Shining2Icon"
          @click="fillState"
        />
      </div>
    </B24Form>
  </div>
</template>
