<script setup lang="ts">
import theme from '#build/b24ui/button'

const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div class="flex flex-col gap-4 -ms-[110px]">
      <B24ButtonGroup>
        <B24Button>Button</B24Button>
      </B24ButtonGroup>

      <B24ButtonGroup>
        <B24Input placeholder="Search..." />
      </B24ButtonGroup>

      <B24ButtonGroup>
        <B24Button color="neutral" variant="outline">
          Button
        </B24Button>
        <B24Button color="neutral" variant="subtle">
          Button
        </B24Button>
        <B24Button color="neutral" variant="outline">
          Button
        </B24Button>
      </B24ButtonGroup>

      <B24ButtonGroup orientation="vertical">
        <B24Button color="neutral" variant="outline">
          Button
        </B24Button>
        <B24Input placeholder="Search..." />
      </B24ButtonGroup>

      <B24ButtonGroup>
        <B24Button color="neutral" variant="outline">
          Button
        </B24Button>
        <B24Input placeholder="Search..." />
      </B24ButtonGroup>

      <B24ButtonGroup>
        <B24Input placeholder="Search..." />
        <B24Button color="neutral" variant="outline">
          Button
        </B24Button>
      </B24ButtonGroup>
    </div>

    <div class="flex gap-4 items-center justify-center">
      <B24ButtonGroup v-for="size in sizes" :key="size" :size="size">
        <B24Input placeholder="Search..." />
        <B24Button color="neutral" variant="outline">
          Button
        </B24Button>
      </B24ButtonGroup>
    </div>
  </div>
</template>
