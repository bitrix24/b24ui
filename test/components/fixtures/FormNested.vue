<script setup lang="ts">
import { z } from 'zod'
import { reactive, ref, useTemplateRef } from 'vue'
import { B24FormField, B24Input, B24Form } from '#components'

const state = reactive<any>({
  nested: { }
})

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const showNested = ref(true)
const nestedSchema = z.object({
  field: z.string().min(1)
})

const form = useTemplateRef('form')
</script>

<template>
  <B24Form ref="form" :state="state" :schema="schema">
    <B24FormField id="emailField" name="email">
      <B24Input id="email" v-model="state.email" />
    </B24FormField>
    <B24FormField id="passwordField" name="password">
      <B24Input id="password" v-model="state.password" />
    </B24FormField>

    <B24Form v-if="showNested" ref="nestedForm" name="nested" :schema="nestedSchema" nested>
      <B24FormField id="nestedField" name="field">
        <B24Input id="nested" v-model="state.nested.field" />
      </B24FormField>
    </B24Form>
  </B24Form>
</template>
