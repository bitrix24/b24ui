<template>
  <B24Theme
    :b24ui="{
      button: {
        base: 'rounded-full'
      },
      input: {
        base: 'rounded-full'
      },
      select: {
        base: 'rounded-full'
      }
    }"
  >
    <div class="flex items-center gap-2">
      <B24Button label="Button" color="air-secondary-accent-1" />
      <B24Input placeholder="Search..." />
      <B24Select placeholder="Select" :items="['Item 1', 'Item 2', 'Item 3']" />
    </div>
  </B24Theme>
</template>
