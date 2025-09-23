<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue'
import { B24FormField, B24Input, B24Form } from '#components'

const form = useTemplateRef('form')
const state = reactive<any>({})
function validate() {
  return [{ name: 'email.1', message: 'Error message' }]
}
</script>

<template>
  <B24Form ref="form" :state="state" :validate="validate">
    <B24FormField id="emailField" :error-pattern="/(email)\..*/">
      <B24Input id="email" v-model="state.email" />
    </B24FormField>
  </B24Form>
</template>
