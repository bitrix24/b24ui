<template>
  <B24Popover
    mode="hover"
    arrow
  >
    <B24Button label="Hover" color="link" depth="dark" />

    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" />
    </template>
  </B24Popover>

  <B24Popover
    :arrow="{
      width: 20,
      height: 10
    }"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" />
    </template>
  </B24Popover>
</template>
