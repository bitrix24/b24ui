<script setup lang="ts">
import { ref } from 'vue'
import LazyModal from './LazyModal.vue'

const count = ref(0)

const toast = useToast()
const modal = useModal()

function open() {
  count.value++

  modal.open(LazyModal, {
    description: 'And you can even provide a description!',
    count: count.value,
    onSuccess() {
      toast.add({
        title: 'Success !',
        id: 'modal-success'
      })
    }
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
