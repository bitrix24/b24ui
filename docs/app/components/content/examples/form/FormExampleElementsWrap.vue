<script setup lang="ts">
import { ref } from 'vue'
import Demo from './FormExampleElements.vue'

const validateOn = ref(['input', 'change', 'blur'])
const isDisabled = ref(false)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="Validate on" class="w-full sm:w-1/4">
        <B24Select v-model="validateOn" :items="['input', 'change', 'blur']" multiple class="w-full" />
      </B24FormField>
      <B24FormField label="isDisabled">
        <B24Switch v-model="isDisabled" />
      </B24FormField>
    </template>
    <Demo
      class="w-full sm:w-2/3"
      :validate-on="validateOn"
      :disabled="isDisabled"
    />
  </ComponentShowExample>
</template>
