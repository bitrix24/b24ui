<template>
  <B24Theme
    :b24ui="{
      button: {
        base: 'rounded-full'
      }
    }"
  >
    <div class="flex items-center gap-2">
      <B24Button label="Button" color="air-primary-success" />
      <B24Button label="Button" color="air-secondary-accent-1" />
      <B24Button label="Button" color="air-boost" />
    </div>
  </B24Theme>
</template>
