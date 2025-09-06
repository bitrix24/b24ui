<script setup lang="ts">
const itemsSimple = [
  {
    label: 'Full name',
    description: 'Michael Foster'
  },
  {
    label: 'Event',
    description: 'Payment is made through Atol online'
  },
  {
    label: 'Line 1.3',
    description: 'Description 1.3',
    class: 'text-ai-500'
  },
  {
    label: 'Line 1.4',
    description: 'Description 1.4',
    b24ui: {
      description: 'font-semibold'
    }
  }
]
</script>

<template>
  <B24DescriptionList
    legend="Applicant Information"
    text="Personal details and application."
    :items="itemsSimple"
  />
</template>
