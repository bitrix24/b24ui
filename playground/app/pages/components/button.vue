<script setup lang="ts">
import { upperFirst } from 'scule'
import theme from '#build/b24ui/button'

const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const variants = Object.keys(theme.variants.variant) as Array<keyof typeof theme.variants.variant>

function onClick() {
  return new Promise<void>(res => setTimeout(res, 5000))
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <B24Button class="font-bold">
        Button
      </B24Button>
    </div>
    <div class="flex items-center gap-2">
      <B24Button to="/">
        Link
      </B24Button>
    </div>
    <div class="flex items-center gap-2">
      <B24Button disabled>
        Disabled
      </B24Button>

      <B24Button to="#" disabled>
        Disabled Link
      </B24Button>
    </div>
    <div class="flex items-center gap-2">
      <B24Button loading>
        Loading
      </B24Button>
    </div>
    <div class="flex items-center gap-2">
      <B24Button loading-auto @click="onClick">
        Loading auto
      </B24Button>
    </div>
    <div class="flex items-center gap-2">
      <B24Button loading trailing>
        Loading
      </B24Button>
    </div>
    <div class="flex items-center gap-2">
      <B24Button v-for="variant in variants" :key="variant" icon="i-lucide-rocket" :label="upperFirst(variant)" :variant="variant" />
    </div>
    <div class="flex items-center gap-2">
      <B24Button
        v-for="variant in variants"
        :key="variant"
        icon="i-lucide-rocket"
        :label="upperFirst(variant)"
        :variant="variant"
        color="neutral"
      />
    </div>
    <div class="flex items-center gap-2">
      <B24Button
        v-for="variant in variants"
        :key="variant"
        :avatar="{ src: 'https://github.com/benjamincanac.png' }"
        :label="upperFirst(variant)"
        color="neutral"
        :variant="variant"
      />
    </div>
    <div class="flex items-center gap-2 ms-[-129px]">
      <B24Button v-for="size in sizes" :key="size" label="Button" :size="size" />
    </div>
    <div class="flex items-center gap-2 ms-[-171px]">
      <B24Button v-for="size in sizes" :key="size" icon="i-lucide-rocket" label="Button" :size="size" />
    </div>
    <div class="flex items-center gap-2 ms-[-171px]">
      <B24Button v-for="size in sizes" :key="size" :avatar="{ src: 'https://github.com/benjamincanac.png' }" label="Button" :size="size" />
    </div>
    <div class="flex items-center gap-2 ms-[-159px]">
      <B24Button
        v-for="size in sizes"
        :key="size"
        icon="i-lucide-rocket"
        label="Square"
        square
        :size="size"
      />
    </div>
    <div class="flex items-center gap-2 ms-[-159px]">
      <B24Button
        v-for="size in sizes"
        :key="size"
        :avatar="{ src: 'https://github.com/benjamincanac.png' }"
        label="Square"
        square
        :size="size"
      />
    </div>
    <div class="flex items-center gap-2 ms-[-68px]">
      <B24Button v-for="size in sizes" :key="size" icon="i-lucide-rocket" :size="size" />
    </div>
    <div class="flex items-center gap-2 ms-[-68px]">
      <B24Button
        v-for="size in sizes"
        :key="size"
        :avatar="{ src: 'https://github.com/benjamincanac.png' }"
        :size="size"
        color="neutral"
        variant="outline"
      />
    </div>
    <div class="flex items-center gap-2">
      <B24Button icon="i-lucide-rocket" trailing-icon="i-lucide-chevron-down" label="Block" block />
    </div>
    <div class="flex items-center gap-2">
      <B24Button icon="i-lucide-cloud-download" label="Button" class="group" :b24ui="{ leadingIcon: 'group-hover:animate-pulse' }" />
    </div>
  </div>
</template>
