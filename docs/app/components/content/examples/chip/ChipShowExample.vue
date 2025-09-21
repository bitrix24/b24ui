<script setup lang="ts">
const statuses = ['online', 'away', 'busy', 'offline']
const status = ref(statuses[0])

const color = computed(() => status.value ? { online: 'air-primary-success', away: 'air-primary-warning', busy: 'air-primary-alert', offline: 'air-tertiary' }[status.value] as any : 'online')

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
  <B24Chip :color="color" :show="show" inset>
    <B24Avatar src="/b24ui/avatar/employee.png" />
  </B24Chip>
</template>
