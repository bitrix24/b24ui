<script setup lang="ts">
import PlusLIcon from '@bitrix24/b24icons-vue/outline/PlusLIcon'
import CalendarWithSlotsIcon from '@bitrix24/b24icons-vue/outline/CalendarWithSlotsIcon'

const toast = useToast()

function addToCalendar() {
  const eventDate = new Date(Date.now() + Math.random() * 31536000000)
  const formattedDate = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  toast.add({
    title: 'Event added to calendar',
    description: `This event is scheduled for ${formattedDate}.`,
    icon: CalendarWithSlotsIcon
  })
}
</script>

<template>
  <B24Button label="Add to calendar" :icon="PlusLIcon" @click="addToCalendar" />
</template>
