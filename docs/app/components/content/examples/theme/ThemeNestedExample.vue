<template>
  <B24Theme
    :b24ui="{
      button: {
        base: 'rounded-full'
      }
    }"
  >
    <div class="flex flex-col items-start gap-4 border border-muted p-4 rounded-lg">
      <div class="flex items-center gap-2">
        <B24Button label="Outer theme" />
        <B24Button label="Outer theme" color="air-secondary-accent-1" />
      </div>

      <B24Theme
        :b24ui="{
          button: {
            base: 'font-black uppercase'
          }
        }"
      >
        <div class="border border-muted p-4 rounded-lg">
          <div class="flex items-center gap-2">
            <B24Button label="Inner theme" />
            <B24Button label="Inner theme" color="air-secondary-accent-1" />
          </div>
        </div>
      </B24Theme>
    </div>
  </B24Theme>
</template>
