<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <B24Slideover
    v-model:open="open"
    title="Slideover with footer"
    description="This is useful when you want a form in a Slideover."
    :b24ui="{ footer: 'justify-between' }"
  >
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="h-full" />
    </template>

    <template #footer="{ close }">
      <div class="w-1/5 flex justify-start" />
      <div class="w-full flex flex-row justify-center gap-[10px]">
        <B24ModalDialogClose>
          <B24Button label="Send" color="air-primary" />
        </B24ModalDialogClose>
        <B24Button label="Cancel" color="air-tertiary" @click="close" />
      </div>
      <div class="w-1/5 flex justify-end">
        <B24Button label="Full version" size="sm" color="air-tertiary-no-accent" />
      </div>
    </template>
  </B24Slideover>
</template>
