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
            <B24Input placeholder="john@lennon.com" />
          </B24FormField>
        </div>
      </div>
    </ExampleCard>

    <ExampleCard title="stream">
      <ExampleCardSubTitle title="Department name and description" />
      <div class="mb-4 flex flex-nowrap flex-col items-stretch justify gap-4">
        <B24FormField label="Parent department" name="department">
          <B24Input placeholder="Select parent department" />
        </B24FormField>
        <B24FormField label="Name" name="name" required error="Enter department name">
          <B24Input placeholder="Enter department name" />
        </B24FormField>
        <B24FormField label="Description" name="description">
          <B24Textarea placeholder="Enter department description" :rows="5" />
        </B24FormField>
      </div>
    </ExampleCard>

    <ExampleCard title="stream rtl" dir="rtl">
      <ExampleCardSubTitle title="اسم ووصف الإدارة" />
      <div class="mb-4 flex flex-nowrap flex-col items-stretch justify gap-4">
        <B24FormField label="الإدارة الرئيسية" name="department">
          <B24Input placeholder="حدد القسم الرئيسي" />
        </B24FormField>
        <B24FormField label="الاسم" name="name" required error="أدخل اسم الإدارة">
          <B24Input placeholder="أدخل اسم الإدارة" />
        </B24FormField>
        <B24FormField label="الوصف" name="description">
          <B24Textarea placeholder="أدخل وصف الإدارة" :rows="5" />
        </B24FormField>
      </div>
    </ExampleCard>

    <ExampleCard title="Size" class="md:col-span-3">
      <ExampleCardSubTitle title="simple" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-6">
        <B24FormField
          v-for="size in sizes"
          :key="size"
          :size="size"
          label="Email"
          name="email"
        >
          <B24Input placeholder="john@lennon.com" class="w-full" />
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
          <B24Input placeholder="john@lennon.com" class="w-full" />
        </B24FormField>
      </div>

      <ExampleCardSubTitle title="with description" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-6">
        <B24FormField
          v-for="size in sizes"
          :key="size"
          :size="size"
          label="Email"
          hint="This is a hint"
          description="This is a description"
          help="Please enter a valid email address."
          name="email"
          required
        >
          <B24Input placeholder="john@lennon.com" class="w-full" />
        </B24FormField>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
