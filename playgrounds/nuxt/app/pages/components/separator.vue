<script setup lang="ts">
import theme from '#build/b24ui/separator'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'

const sizes = Object.keys(theme.variants.size)
const accents = Object.keys(theme.variants.accent)
const types = Object.keys(theme.variants.type)

const multipleAttrs = reactive({
  size: [theme.defaultVariants.size],
  accent: [theme.defaultVariants.accent],
  type: [theme.defaultVariants.type]
})

const singleAttrs = reactive({
  label: 'Label',
  useIcon: true,
  useLabel: true
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="multipleAttrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />
      <B24Select v-model="multipleAttrs.accent" class="w-44" :items="accents" placeholder="Accent" multiple />
      <B24Select v-model="multipleAttrs.type" class="w-32" :items="types" placeholder="Type" multiple />

      <B24Input v-model="singleAttrs.label" class="min-w-32 w-32" placeholder="Label" />

      <B24Switch v-model="singleAttrs.useIcon" label="Icon" />
      <B24Switch v-model="singleAttrs.useLabel" label="Label" />
    </template>

    <Matrix v-slot="props" :attrs="multipleAttrs" :b24ui="{ root: 'max-w-80' }">
      <div class="h-24 flex gap-4 items-center">
        <div class="flex-1 text-center">
          <ProseP>Blog</ProseP>
        </div>

        <B24Separator
          :avatar="singleAttrs.useIcon ? { src: '/avatar/assistant.png' } : undefined"
          v-bind="props"
          orientation="vertical"
          :label="singleAttrs.useLabel ? singleAttrs.label : undefined"
        />

        <div class="flex-1 text-center">
          <ProseP>Docs</ProseP>
        </div>

        <B24Separator v-bind="props" orientation="vertical" :label="singleAttrs.useLabel ? singleAttrs.label : undefined">
          <B24Avatar v-if="singleAttrs.useIcon" size="sm" src="/avatar/employee.png" />
        </B24Separator>

        <div class="flex-1 text-center">
          <ProseP>Source</ProseP>
        </div>
      </div>
      <B24Separator
        v-bind="props"
        :icon="singleAttrs.useIcon ? Bitrix24Icon : undefined"
        :label="singleAttrs.useLabel ? singleAttrs.label : undefined"
      />
    </Matrix>
  </PlaygroundPage>
</template>
