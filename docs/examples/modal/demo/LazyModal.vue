<script setup lang="ts">
const modal = useModal()

defineProps<{
  count: number
}>()

const emit = defineEmits(['success'])

function onSuccess() {
  emit('success')
}
</script>

<template>
  <B24Modal :title="`This modal was opened programmatically ${count} times`">
    <template #footer>
      <div class="flex gap-2">
        <B24Button
          color="success"
          label="Success"
          rounded
          size="sm"
          @click="onSuccess"
        />
        <B24Button
          rounded
          label="Close"
          color="link"
          depth="dark"
          size="sm"
          @click="modal.close()"
        />
      </div>
    </template>
  </B24Modal>
</template>
