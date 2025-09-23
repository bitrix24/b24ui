<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue'
import { B24FormField, B24Input, B24Form } from '#components'

const state = reactive<any>({})
const form = useTemplateRef('form')
</script>

<template>
  <B24Form ref="form" :state>
    <B24FormField name="field1">
      <B24Input />
    </B24FormField>
    <B24FormField name="field2" />
    <B24FormField />
  </B24Form>
</template>
