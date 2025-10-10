<script setup lang="ts">
import { LazySlideoverExample } from '#components'

const count = ref(0)

const toast = useToast()
const overlay = useOverlay()

const slideover = overlay.create(LazySlideoverExample)

async function open() {
  const instance = slideover.open({
    count: count.value
  })

  const shouldIncrement = await instance.result

  if (shouldIncrement) {
    count.value++

    toast.add({
      title: `Success: ${shouldIncrement}`,
      color: 'air-primary-success',
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
    color: 'air-primary-alert',
    id: 'slideover-dismiss'
  })
}
</script>

<template>
  <B24Button label="Open" @click="open" />
</template>
