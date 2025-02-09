<template>
  <B24Modal
    title="Modal with custom close button"
    description="The `close` prop inherits from the Button props."
    :close="{ color: 'danger', depth: 'dark', size: 'xs', rounded: true }"
    :b24ui="{ close: '-top-3 -end-3' }"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #body>
      <Placeholder class="h-48" />
    </template>
  </B24Modal>
</template>
