<script setup lang="ts">
import { z } from 'zod'
import { reactive, useTemplateRef } from 'vue'
import { B24FormField, B24Input, B24Form } from '#components'

const state = reactive<any>({
  nested: { }
})

const nestedSchema = z.object({
  first: z.string().min(1),
  second: z.string().min(1)
})

const form = useTemplateRef('form')
</script>

<template>
  <B24Form ref="form" :state="state">
    <B24Form name="nested" :schema="nestedSchema" nested>
      <B24FormField id="firstField" name="first">
        <B24Input id="first" v-model="state.nested.first" />
      </B24FormField>
      <B24FormField id="secondField" name="second">
        <B24Input id="second" v-model="state.nested.second" />
      </B24FormField>
    </B24Form>
  </B24Form>
</template>
