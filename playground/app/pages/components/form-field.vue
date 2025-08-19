<script setup lang="ts">
import theme from '#build/b24ui/form-field'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('FormField')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const isUseBg = ref(true)

const feedbacks = [
  { description: 'This is a description' },
  { error: 'This is an error' },
  { hint: 'This is a hint' },
  { help: 'This is a help' },
  { required: true }
]

const items = ref(['CRM settings', 'My company details', 'Access permissions', 'CRM Payment', 'CRM.Delivery', 'Scripts', 'Create script', 'Install from Bitrix24.Market'])
const itemsRadioGroup = ref([
  {
    label: 'CRM settings',
    description: 'Configure your CRM system.\n',
    value: 'settings'
  },
  {
    label: 'My company details',
    description: 'Access and update your company\'s information and profile.\n',
    value: 'my_company_details'
  }
])
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="feedback" :use-bg="isUseBg">
      <ExampleCardSubTitle title="different" />
      <div class="mb-4 flex flex-wrap flex-col items-stretch gap-4">
        <template v-for="(feedback, index) in feedbacks" :key="index">
          <B24FormField v-bind="feedback" label="Email" name="email">
            <B24Input name="email" aria-label="Email" type="email" placeholder="john@lennon.com" />
          </B24FormField>
        </template>
      </div>
    </ExampleCard>

    <ExampleCard title="stream" :use-bg="isUseBg">
      <ExampleCardSubTitle title="Department name and description" />
      <div class="mb-4 flex flex-nowrap flex-col items-stretch gap-4">
        <B24FormField label="Parent department" name="department" description="This is a description">
          <B24Input name="parent_department" aria-label="Parent department" type="text" placeholder="Select parent department" />
        </B24FormField>
        <B24FormField label="Name" name="name" required error="Enter department name">
          <B24Input name="department_name" aria-label="Department name" type="text" placeholder="Enter department name" />
        </B24FormField>
        <B24FormField label="Description" name="description">
          <B24Textarea name="department_description" aria-label="Department description" placeholder="Enter department description" :rows="5" />
        </B24FormField>
      </div>
      <ExampleCardSubTitle title="radio-group" />
      <div class="mb-4 flex flex-wrap flex-col items-center gap-4">
        <B24RadioGroup
          legend="Email"
          class="w-full"
          required
          :items="itemsRadioGroup"
        />
      </div>
    </ExampleCard>
  </ExampleGrid>
  <B24Separator accent="accent" class="my-4" label="Size" type="dotted" />
  <ExampleGrid v-once class="mb-4">
    <ExampleCard title="Some cases" :use-bg="isUseBg" class="sm:col-span-2 md:col-span-4">
      <ExampleCardSubTitle title="simple" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-6">
        <template v-for="size in sizes" :key="size">
          <B24FormField
            :size="size"
            label="Email"
            name="email"
          >
            <B24Input aria-label="Email" type="email" placeholder="john@lennon.com" />
          </B24FormField>
          <B24FormField
            :size="size"
            label="Select"
            name="email"
            required
          >
            <B24Select
              aria-label="Select"
              placeholder="Select value"
              class="w-[140px]"
              :items="items"
            />
          </B24FormField>
        </template>
      </div>

      <ExampleCardSubTitle title="with error" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-6">
        <template v-for="size in sizes" :key="size">
          <B24FormField
            :size="size"
            label="Email"
            hint="This is a hint"
            description="This is a description"
            help="This is a help"
            error="This is an error"
            name="email"
            required
          >
            <B24Input aria-label="Email" type="email" placeholder="john@lennon.com" />
          </B24FormField>
          <B24FormField
            :size="size"
            label="Select"
            hint="This is a hint"
            description="This is a description"
            error="This is an error"
            name="email"
            required
          >
            <B24Select
              aria-label="Select"
              placeholder="Select value"
              class="w-[140px]"
              :items="items"
            />
          </B24FormField>
        </template>
      </div>

      <ExampleCardSubTitle title="with description" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-6">
        <template v-for="size in sizes" :key="size">
          <B24FormField
            :size="size"
            label="Email"
            hint="This is a hint"
            description="This is a description"
            help="Please enter a valid email address."
            name="email"
            required
          >
            <B24Input aria-label="Email" type="email" placeholder="john@lennon.com" />
          </B24FormField>
          <B24FormField
            :size="size"
            label="Select"
            hint="This is a hint"
            description="This is a description"
            help="Please enter a valid email address."
            name="email"
            required
          >
            <B24Select
              aria-label="Select"
              placeholder="Select value"
              class="w-[140px]"
              :items="items"
            />
          </B24FormField>
        </template>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
