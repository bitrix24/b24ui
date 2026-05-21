<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'
import EditPencilIcon from '@bitrix24/b24icons-vue/main/EditPencilIcon'
import CirclePlusIcon from '@bitrix24/b24icons-vue/main/CirclePlusIcon'
import UserCompanyIcon from '@bitrix24/b24icons-vue/common-b24/UserCompanyIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'

const stages = [
  'Contact information review',
  'Solution design',
  'Awaiting parts',
  'Scheduled',
  'Completed'
]

const currencies = ['USD', 'EUR', 'RUB'] as const

const salutations = ['Mr.', 'Ms.', 'Dr.', 'Not selected']

const serviceTypes = [
  'On-site installation',
  'Remote setup',
  'Consulting',
  'Maintenance contract'
]

const schema = z.object({
  stage: z.string().min(1, 'Stage is required'),
  amount: z.number().nonnegative('Amount must be 0 or more'),
  currency: z.enum(currencies),
  company: z.string().optional(),
  contact: z.string().optional(),
  salutation: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  firstName: z.string().min(1, 'First name is required'),
  serviceType: z.string().min(1, 'Service type is required'),
  // B24InputDate binds an @internationalized/date DateValue, not a native Date,
  // so the field is typed loosely here instead of z.date().
  scheduledAt: z.any().optional()
})

type Schema = z.output<typeof schema>

function defaultState(): Partial<Schema> {
  return {
    stage: 'Contact information review',
    amount: 0,
    currency: 'USD',
    company: undefined,
    contact: undefined,
    salutation: 'Not selected',
    lastName: 'Sidorov',
    firstName: 'Ivan',
    serviceType: undefined,
    scheduledAt: undefined
  }
}

const state = reactive<Partial<Schema>>(defaultState())

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Order saved', description: 'The order details have been submitted.', color: 'air-primary-success' })
  console.log(event.data) // demo only — remove before production use
}

function onCancel() {
  Object.assign(state, defaultState())
}
</script>

<template>
  <B24Form :schema="schema" :state="state" class="space-y-4 w-full max-w-lg" @submit="onSubmit">
    <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-(--ui-color-divider-vibrant-default)">
      <div class="flex items-center gap-1">
        <h3 class="text-(length:--ui-font-size-lg) font-(--ui-font-weight-semi-bold) uppercase tracking-wide">
          Order details
        </h3>
        <B24Button variant="link" size="sm" :icon="EditPencilIcon" aria-label="Edit section" />
      </div>
      <B24Button variant="link" size="sm" label="Cancel" @click="onCancel" />
    </div>

    <B24FormField label="Stage" name="stage">
      <!-- On Select, `class` targets the trigger while `b24ui.root` targets the outer wrapper, so both are needed for a full-width control. -->
      <B24Select v-model="state.stage" :items="stages" class="w-full" :b24ui="{ root: 'w-full' }" />
    </B24FormField>

    <B24FormField label="Amount and currency" name="amount">
      <div class="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
        <B24InputNumber v-model="state.amount" :min="0" class="w-full" />
        <B24Select v-model="state.currency" :items="currencies" class="w-full sm:w-32" :b24ui="{ root: 'w-full sm:w-32' }" />
      </div>
    </B24FormField>

    <!-- Inner "Client" section: a labelled, bordered group built from plain elements
         (b24ui has no dedicated fieldset primitive). role/aria-labelledby tie the
         heading to the group for screen readers. -->
    <div class="space-y-1.5">
      <span id="edit-client-label" class="block text-(length:--ui-font-size-sm) text-(--ui-color-typography-secondary)">
        Client
      </span>
      <div
        role="group"
        aria-labelledby="edit-client-label"
        class="rounded-md border border-(--ui-color-design-outline-stroke) p-3 sm:p-4 space-y-4"
      >
        <B24FormField label="Company" name="company">
          <B24Input
            v-model="state.company"
            :icon="UserCompanyIcon"
            placeholder="Company name, phone or email"
            class="w-full"
          />
        </B24FormField>

        <B24FormField label="Contact" name="contact">
          <B24Input
            v-model="state.contact"
            :icon="PersonIcon"
            placeholder="Contact name, phone or email"
            class="w-full"
          />
        </B24FormField>

        <B24Button variant="link" size="sm" :icon="CirclePlusIcon" label="Add participant" />
      </div>
    </div>

    <B24FormField label="Salutation" name="salutation">
      <B24Select v-model="state.salutation" :items="salutations" class="w-full" :b24ui="{ root: 'w-full' }" />
    </B24FormField>

    <B24FormField label="Last name" name="lastName">
      <B24Input v-model="state.lastName" class="w-full" />
    </B24FormField>

    <B24FormField label="First name" name="firstName">
      <B24Input v-model="state.firstName" class="w-full" />
    </B24FormField>

    <B24FormField label="Service type" name="serviceType">
      <B24Select v-model="state.serviceType" :items="serviceTypes" placeholder="Choose a service" class="w-full" :b24ui="{ root: 'w-full' }" />
    </B24FormField>

    <B24FormField label="Scheduled date" name="scheduledAt">
      <B24InputDate v-model="state.scheduledAt" class="w-full" />
    </B24FormField>

    <div class="flex flex-wrap justify-end gap-2 pt-2">
      <B24Button color="air-tertiary" label="Cancel" @click="onCancel" />
      <B24Button color="air-primary" type="submit" label="Save" />
    </div>
  </B24Form>
</template>
