<template>
  <B24Slideover
    title="Slideover with custom close button"
    description="The `close` prop inherits from the Button props."
    :close="{ color: 'danger', depth: 'dark', size: 'xs', rounded: true }"
    :b24ui="{ close: 'rounded-full py-4 px-2 -left-2' }"
  >
    <B24Button label="Open with custom close button" color="link" depth="dark" />

    <template #body>
      <Placeholder class="h-full w-full" />
    </template>
  </B24Slideover>

  <B24Slideover
    title="Slideover with ai close button"
    description="The `close` prop inherits from the Button props."
    :close="{ label: 'Test', color: 'ai' }"
  >
    <B24Button label="Open with ai close button" color="link" depth="dark" />

    <template #body>
      <Placeholder class="h-full w-full" />
    </template>
  </B24Slideover>
</template>
