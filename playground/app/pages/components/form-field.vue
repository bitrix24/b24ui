<script setup lang="ts">
import theme from '#build/b24ui/form-field'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('FormField')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const feedbacks = [
  { description: 'This is a description' },
  { error: 'This is an error' },
  { hint: 'This is a hint' },
  { help: 'This is a help' },
  { required: true }
]
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="feedback">
      <ExampleCardSubTitle title="different" />
      <div class="mb-4 flex flex-wrap flex-col items-center gap-4">
        <div v-for="(feedback, count) in feedbacks" :key="count" class="flex items-center">
          <B24FormField v-bind="feedback" label="Email" name="email">
            <B24Input name="email" aria-label="Email" type="email" placeholder="john@lennon.com" />
          </B24FormField>
        </div>
      </div>
    </ExampleCard>

    <ExampleCard title="stream">
      <ExampleCardSubTitle title="Department name and description" />
      <div class="mb-4 flex flex-nowrap flex-col items-stretch justify gap-4">
        <B24FormField label="Parent department" name="department">
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
          :items="[
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
          ]"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="size" class="md:col-span-3">
      <ExampleCardSubTitle title="simple" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-6">
        <B24FormField
          v-for="size in sizes"
          :key="size"
          :size="size"
          label="Email"
          name="email"
        >
          <B24Input aria-label="Email" type="email" placeholder="john@lennon.com" />
        </B24FormField>
      </div>

      <ExampleCardSubTitle title="with error" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-6">
        <B24FormField
          v-for="size in sizes"
          :key="size"
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
        </template>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
