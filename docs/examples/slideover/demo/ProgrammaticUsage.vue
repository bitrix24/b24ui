<script setup lang="ts">
import { ref } from 'vue'
import LazySlideover from './LazySlideover.vue'

const count = ref(0)

const toast = useToast()
const overlay = useOverlay()

const slideover = overlay.create(LazySlideover, {
  props: {
    count: count.value
  }
})

async function open() {
  const shouldIncrement = await slideover.open()

  if (shouldIncrement) {
    count.value++

    toast.add({
      title: `Success: ${shouldIncrement}`,
      color: 'success',
      id: 'slideover-success'
    })

    // Update the count
    slideover.patch({
      count: count.value
    })
    return
  }

  toast.add({
    title: `Dismissed: ${shouldIncrement}`,
    color: 'danger',
    id: 'slideover-dismiss'
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
