<template>
  <B24Drawer :b24ui="{ content: 'h-full' }">
    <B24Button label="Open" use-dropdown :b24ui="{ trailingIcon: 'rotate-180' }" />

    <template #footer>
      <B24Drawer nested :b24ui="{ content: 'h-full' }">
        <B24Button label="Open nested" />

        <template #content>
          <Placeholder class="flex-1 m-4" />
        </template>
      </B24Drawer>
    </template>
  </B24Drawer>
</template>
