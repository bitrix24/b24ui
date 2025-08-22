<script setup lang="ts">
import { reactive } from 'vue'
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  color?: ButtonProps['color']
  size?: ButtonProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'air-primary' as ButtonProps['color'],
  size: 'md' as ButtonProps['size']
})

const state = reactive({ fullName: '' })

async function onSubmit() {
  return new Promise<void>(res => setTimeout(res, 1000))
}

async function validate(data: Partial<typeof state>) {
  if (!data.fullName?.length) return [{ name: 'fullName', message: 'Required' }]
  return []
}
</script>

<template>
  <B24Form :state="state" :validate="validate" @submit="onSubmit">
    <B24FormField name="fullName" label="Full name">
      <B24Input v-model="state.fullName" />
    </B24FormField>
    <B24Button
      type="submit"
      class="mt-2"
      :color="color"
      :size="size"
      use-clock
      loading-auto
      label="Submit"
    />
  </B24Form>
</template>
