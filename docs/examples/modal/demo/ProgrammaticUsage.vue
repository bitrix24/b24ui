<script setup lang="ts">
import { ref } from 'vue'
import LazyModal from './LazyModal.vue'

const count = ref(0)

const toast = useToast()
const overlay = useOverlay()

const modal = overlay.create(LazyModal, {
  props: {
    count: count.value
  }
})

async function open() {
  const shouldIncrement = await modal.open()

  if (shouldIncrement) {
    count.value++

    toast.add({
      title: `Success: ${shouldIncrement}`,
      color: 'success',
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
    color: 'danger',
    id: 'modal-dismiss'
  })
}
</script>

<template>
  <B24Button
    label="Open"
    color="link"
    depth="dark"
    @click="open"
  />
</template>
