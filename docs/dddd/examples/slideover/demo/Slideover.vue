<template>
  <B24Slideover
    :b24ui="{ content: 'sm:top-[300px] sm:max-h-[calc(100%-300px)]' }"
  >
    <B24Button label="Open" />

    <template #content>
      <Placeholder class="size-full bg-(--ui-color-base-7)" />
    </template>
  </B24Slideover>
</template>
