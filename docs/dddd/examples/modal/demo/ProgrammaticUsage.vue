<script setup lang="ts">
import { ref } from 'vue'
import LazyModal from './LazyModal.vue'

const count = ref(0)

const toast = useToast()
const overlay = useOverlay()

const modal = overlay.create(LazyModal)

async function open() {
  const instance = modal.open({
    count: count.value
  })

  const shouldIncrement = await instance.result

  if (shouldIncrement) {
    count.value++

    toast.add({
      title: `Success: ${shouldIncrement}`,
      color: 'air-primary-success',
      id: 'modal-success'
    })

    // Update the count
    modal.patch({
      count: count.value
    })
    return
  }

  toast.add({
    title: `Dismissed: ${shouldIncrement}`,
    color: 'air-primary-alert',
    id: 'modal-dismiss'
  })
}
</script>

<template>
  <B24Button label="Open" @click="open" />
</template>
