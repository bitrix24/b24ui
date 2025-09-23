<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue'
import { B24FormField, B24Input, B24Form } from '#components'

const state = reactive<any>({})
const form = useTemplateRef('form')
</script>

<template>
  <B24Form id="42" ref="form" :state="state">
    <B24FormField id="emailField" name="email">
      <B24Input id="email" v-model="state.email" />
    </B24FormField>
    <B24FormField id="passwordField" name="password">
      <B24Input id="password" v-model="state.password" />
    </B24FormField>
  </B24Form>
</template>
