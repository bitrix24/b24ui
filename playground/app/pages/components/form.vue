<script setup lang="ts">
/**
 * @todo add B24SelectMenu
 * @todo add FormExampleElements
 * @todo add FormExampleNestedList
 * @todo add FormExampleNested
 */
import * as z from 'zod'
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'
// import FormExampleElements from '../../../../docs/examples/form/FormExampleElements.vue'
// import FormExampleNestedList from '../../../../docs/examples/form/FormExampleNestedList.vue'
// import FormExampleNested from '../../../../docs/examples/form/FormExampleNested.vue'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import SuccessIcon from '@bitrix24/b24icons-vue/button/SuccessIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'
import Shining2Icon from '@bitrix24/b24icons-vue/main/Shining2Icon'

usePageMeta.setPageTitle('Form')
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  tos: z.literal(true)
})

type Schema = z.input<typeof schema>

const state = reactive<Partial<Schema>>({})

const simpleFormState = ref(false)
function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
  simpleFormState.value = true
}

const autoCloseMessageSeconds = ref(20)
const resetState = () => {
  state.tos = undefined
  state.password = undefined
  state.email = undefined

  simpleFormState.value = false
}

const fillState = () => {
  state.tos = true
  state.password = '12345678'
  state.email = 'john@lennon.com'
}

// const validateOn = ref(['input', 'change', 'blur'])
// const disabled = ref(false)
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base">
      <ExampleCardSubTitle title="simple" />
      <div class="flex flex-col gap-4">
        <B24Advice v-if="simpleFormState" :avatar="{ src: '/avatar/employee.png' }">
          <div class="flex flex-row items-start justify-between gap-2">
            <div>The form has been submitted.</div>
            <div class="shrink-0 relative size-6 group">
              <B24Countdown
                as="div"
                class="size-full absolute inset-x-0 inset-y-0 z-30 group-hover:z-10 group-hover:opacity-40"
                :seconds="autoCloseMessageSeconds"
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
        <B24Alert
          v-if="simpleFormState"
          :icon="SuccessIcon"
          description="The form has been submitted."
          size="xs"
          color="success"
        >
          <template #description>
            <div class="flex flex-row items-center justify-between gap-2">
              <div>The form has been submitted.</div>
              <div class="shrink-0 relative size-6 group">
                <B24Countdown
                  as="div"
                  class="size-full absolute inset-x-0 inset-y-0 z-30 group-hover:z-10 group-hover:opacity-40"
                  :seconds="autoCloseMessageSeconds"
                  use-circle
                  size="sm"
                  @end="resetState"
                />
                <Cross30Icon
                  class="cursor-pointer size-full opacity-0 group-hover:opacity-100 text-base-500 dark:text-base-600 group-hover:text-base-900 dark:group-hover:text-base-100 absolute inset-x-0 inset-y-0 z-20"
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
          class="gap-4 flex flex-col"
          @submit="onSubmit"
        >
          <B24FormField label="Email" name="email" help="Please enter a valid email address.">
            <B24Input v-model="state.email" placeholder="john@lennon.com" />
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
    </ExampleCard>
  </ExampleGrid>
  <div class="flex flex-col gap-8">
    <div class="flex gap-4">
      <!-- /
      <FormExampleNested />
      <FormExampleNestedList />
      / -->
    </div>
    <!-- /
    <div class="border border-[var(--ui-border)] rounded-lg">
      <div class="py-2 px-4 flex gap-4 items-center">
        <B24FormField label="Validate on" class="flex items-center gap-2">
          <B24SelectMenu v-model="validateOn" :items="['input', 'change', 'blur']" multiple class="w-48" />
        </B24FormField>
        <B24Checkbox v-model="disabled" label="Disabled" />
      </div>

      <FormExampleElements :validate-on="validateOn" :disabled="disabled" class="border-t border-[var(--ui-border)] p-4" />
    </div>
    / -->
  </div>
</template>
