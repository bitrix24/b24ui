<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormError, FormSubmitEvent } from '@bitrix24/b24ui-nuxt'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'
import Shining2Icon from '@bitrix24/b24icons-vue/main/Shining2Icon'

const isShowResult = ref(false)
const autoResultSeconds = ref(20)

interface State {
  email: string | undefined
  password: string | undefined
  tos: boolean | undefined
}

const state = reactive<State>({
  email: undefined,
  password: undefined,
  tos: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ name: 'email', message: 'Required' })

  if (!state.password) errors.push({ name: 'password', message: 'Required' })
  else if (state?.password.length < 8) errors.push({ name: 'password', message: 'Minimum 8 characters' })

  if (!state.tos) errors.push({ name: 'tos', message: 'Required' })
  return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<any>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data, state)
  isShowResult.value = true
}

function resetState() {
  state.email = undefined
  state.password = undefined
  state.tos = undefined

  isShowResult.value = false
}

function fillState() {
  state.email = 'john@lennon.com'
  state.password = '12345678'
  state.tos = true
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <B24Advice v-if="isShowResult" :avatar="{ src: `${$attrs?.base}/avatar/employee.png` }">
      <div class="flex flex-row items-start justify-between gap-2">
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
            class="cursor-pointer size-full opacity-0 group-hover:opacity-100 text-base-500 dark:text-base-600 group-hover:text-base-900 dark:group-hover:text-base-100 absolute inset-x-0 inset-y-0 z-20"
            @click="resetState"
          />
        </div>
      </div>
    </B24Advice>
    <B24Form
      v-else
      :validate="validate"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <B24FormField label="Email" name="email" help="Please enter a valid email address.">
        <B24Input v-model="state.email" />
      </B24FormField>

      <B24FormField label="Password" name="password" help="Minimum password length is 8 characters">
        <B24Input v-model="state.password" type="password" />
      </B24FormField>

      <B24FormField name="tos">
        <B24Checkbox v-model="state.tos">
          <template #label>
            You confirm that you accept the <B24Link active target="_blank" to="https://www.bitrix24.eu/terms/?utm_source=%40bitrix24%2Fb24ui-nuxt&utm_medium=form&utm_campaign=playground">
              Terms of Service
            </B24Link> and the <B24Link active target="_blank" to="https://www.bitrix24.eu/privacy/?utm_source=%40bitrix24%2Fb24ui-nuxt&utm_medium=form&utm_campaign=playground">
              Privacy Policy
            </B24Link>.
          </template>
        </B24Checkbox>
      </B24FormField>

      <B24Separator class="mt-6 mb-3" />

      <div class="flex flex-row gap-4 items-center justify-between">
        <B24Button type="submit" label="Submit" color="success" />
        <B24Button
          type="button"
          class="text-base-master/10 dark:text-base-100/20"
          color="link"
          :icon="Shining2Icon"
          @click="fillState"
        />
      </div>
    </B24Form>
  </div>
</template>
