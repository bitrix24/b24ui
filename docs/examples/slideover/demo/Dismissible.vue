<template>
  <B24Slideover
    :dismissible="false"
    title="Slideover non-dismissible"
    description="`Esc` also doesn't work"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #body>
      <Placeholder class="h-full w-full" />
    </template>
  </B24Slideover>
</template>
