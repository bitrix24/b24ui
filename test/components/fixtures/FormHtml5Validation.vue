<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue'
import { B24FormField, B24Input, B24Form } from '#components'

interface FormState {
  email?: string
  age?: string
  username?: string
}

const state = reactive<FormState>({})
const form = useTemplateRef('form')
</script>

<template>
  <B24Form ref="form" :state="state" v-bind="$attrs">
    <B24FormField id="emailField" name="email">
      <B24Input id="email" v-model="state.email" type="email" required />
    </B24FormField>
    <B24FormField id="ageField" name="age">
      <B24Input
        id="age"
        v-model="state.age"
        type="number"
        min="18"
        max="100"
        required
      />
    </B24FormField>
    <B24FormField id="usernameField" name="username">
      <B24Input id="username" v-model="state.username" minlength="3" maxlength="20" required />
    </B24FormField>
  </B24Form>
</template>
