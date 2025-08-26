<template>
  <B24Popover :b24ui="{ content: 'p-[10px]' }">
    <B24Button label="Open" />

    <template #content>
      <Placeholder class="size-[192px]" />
    </template>
  </B24Popover>
</template>
