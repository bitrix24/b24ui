<script setup lang="ts">
import { z } from 'zod'
import { reactive, useTemplateRef } from 'vue'
import { B24Form } from '#components'

defineProps<{ nestedName?: string }>()

const state = reactive<any>({ field: 'abc', nested: { field: 'abc' } })
const nestedSchema = z.object({
  field: z.string().transform(value => value.toUpperCase())
})

const form = useTemplateRef('form')
</script>

<template>
  <B24Form ref="form" :state="state">
    <B24Form :name="nestedName" :schema="nestedSchema" nested />
  </B24Form>
</template>
