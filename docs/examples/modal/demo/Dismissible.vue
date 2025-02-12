<template>
  <B24Modal
    :dismissible="false"
    title="Modal non-dismissible"
    description="`Esc` also doesn't work"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #body>
      <Placeholder class="h-48" />
    </template>
  </B24Modal>
</template>
