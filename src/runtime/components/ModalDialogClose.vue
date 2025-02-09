<script lang="ts">
export interface ModalDialogCloseSlots {
  default(props: {}): any
}
</script>

<script setup lang="ts">
import { DialogClose } from 'reka-ui'

defineSlots<ModalDialogCloseSlots>()
</script>

<template>
  <DialogClose as-child>
    <slot />
  </DialogClose>
</template>
