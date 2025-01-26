<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import MailIcon from '@bitrix24/b24icons-vue/main/MailIcon'

const statuses = ['online', 'away', 'busy', 'offline']
const status = ref(statuses[0])

const color = computed(() => status.value
  ? {
      online: 'success',
      away: 'warning',
      busy: 'danger',
      offline: 'default'
    }[status.value] as any
  : 'online'
)

const show = computed(() => status.value !== 'offline')

// Note: This is for demonstration purposes only. Don't do this at home.
onMounted(() => {
  setInterval(() => {
    if (status.value) {
      status.value = statuses[(statuses.indexOf(status.value) + 1) % statuses.length]
    }
  }, 1000)
})
</script>

<template>
  <B24Chip :color="color" :show="show">
    <B24Button :icon="MailIcon" depth="light" />
  </B24Chip>
</template>
