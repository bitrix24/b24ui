<template>
  <B24Slideover
    title="Slideover with footer"
    description="This is useful when you want a form in a Slideover."
    :b24ui="{ footer: 'flex-row-reverse justify-start' }"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #body>
      <Placeholder class="h-full w-full" />
    </template>
    <template #footer>
      <B24ModalDialogClose>
        <B24Button rounded label="Send" color="primary" size="sm" />
      </B24ModalDialogClose>
      <B24ModalDialogClose>
        <B24Button rounded label="Cancel" color="link" depth="dark" size="sm" />
      </B24ModalDialogClose>
    </template>
  </B24Slideover>
</template>
