<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue'
import { B24FormField, B24Input, B24Form } from '#components'

const state = reactive<any>({})
const form = useTemplateRef('form')
</script>

<template>
  <B24Form id="42" ref="form" :state="state">
    <B24FormField id="field" name="value">
      <B24Input id="input" v-model="state.value" />
    </B24FormField>
  </B24Form>
</template>
