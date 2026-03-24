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
      <div class="w-1/5 flex items-center justify-start" />
      <div class="w-full flex flex-row items-center justify-center gap-2.5">
        <B24ModalDialogClose>
          <B24Button size="lg" color="air-primary" label="Save" />
        </B24ModalDialogClose>
        <B24Button size="sm" color="air-tertiary" label="Cancel" :normal-case="false" @click="close" />
      </div>
      <div class="w-1/5 flex items-center justify-end">
        <B24Button label="Full version" size="sm" color="air-tertiary-no-accent" />
      </div>
    </template>
  </B24Slideover>
</template>
