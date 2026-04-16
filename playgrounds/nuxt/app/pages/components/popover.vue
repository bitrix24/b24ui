<script setup lang="ts">
import MockContentLongText from '../../components/MockContentLongText.vue'
import MockContentUploadFile from '../../components/MockContentUploadFile.vue'
import Cross50Icon from '@bitrix24/b24icons-vue/actions/Cross50Icon'

const open = ref(false)
const openCustomAnchor = ref(false)

const contentAligns = ['start', 'center', 'end']
const contentSides = ['right', 'left', 'top', 'bottom']

const align = ref<'start' | 'center' | 'end'>('center')
const side = ref<'right' | 'left' | 'top' | 'bottom'>('bottom')
const sideOffset = ref(0)
const openDelay = ref(500)
const closeDelay = ref(300)
const arrow = ref(false)
const modal = ref(false)
</script>

<template>
  <PlaygroundPage :b24ui="{ body: 'flex-col max-w-60 mx-auto' }">
    <template #controls>
      <B24Tooltip text="content.align" size="xs">
        <B24Select v-model="align" placeholder="content.align" size="xs" :items="contentAligns" />
      </B24Tooltip>
      <B24Tooltip text="content.side" size="xs">
        <B24Select v-model="side" placeholder="content.side" size="xs" :items="contentSides" />
      </B24Tooltip>
      <B24Tooltip text="content.sideOffset" size="xs">
        <B24InputNumber v-model="sideOffset" size="xs" placeholder="content.sideOffset" class="w-20" />
      </B24Tooltip>

      <B24Tooltip text="Open delay (hover)" size="xs">
        <B24InputNumber v-model="openDelay" size="xs" placeholder="openDelay" class="w-20" />
      </B24Tooltip>
      <B24Tooltip text="Close delay (hover)" size="xs">
        <B24InputNumber v-model="closeDelay" size="xs" placeholder="closeDelay" class="w-20" />
      </B24Tooltip>
      <B24Switch v-model="arrow" size="xs" label="Arrow" />
      <B24Switch v-model="modal" size="xs" label="Modal" />
    </template>

    <B24Popover
      :arrow="arrow"
      :modal="modal"
      :content="{
        align,
        side,
        sideOffset
      }"
      :b24ui="{ content: 'p-[10px]' }"
    >
      <B24Button label="Click me" />

      <template #content="{ close }">
        <div class="flex items-center justify-between gap-4 mb-2xs border-b border-(--ui-color-divider-default)">
          <ProseH4 class="mb-0.5">
            Popover with long text
          </ProseH4>

          <B24Button
            color="air-tertiary-no-accent"
            :icon="Cross50Icon"
            @click="close"
          />
        </div>
        <div class="max-w-60 max-h-48 overflow-y-auto scrollbar-thin scrollbar-transparent">
          <MockContentLongText />
        </div>
      </template>
    </B24Popover>

    <B24Popover
      v-model:open="open"
      mode="hover"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :arrow="arrow"
      :modal="modal"
      :content="{
        align,
        side,
        sideOffset
      }"
      :b24ui="{ content: 'p-[10px]' }"
    >
      <B24Button label="Hover me" />

      <template #content>
        <div class="max-w-48 max-h-73">
          <MockContentUploadFile />
        </div>

        <div class="mt-lg flex flex-row gap-xs2">
          <B24Button
            rounded
            label="Send"
            color="air-primary-success"
            size="sm"
            @click="open = false"
          />
          <B24Button
            rounded
            label="Cancel"
            color="air-tertiary-no-accent"
            size="sm"
            @click="open = false"
          />
        </div>
      </template>
    </B24Popover>

    <B24Popover
      v-model:open="openCustomAnchor"
      :arrow="arrow"
      :modal="modal"
      :dismissible="false"
      :content="{
        align,
        side,
        sideOffset
      }"
      :b24ui="{ content: 'p-[10px]' }"
    >
      <template #anchor>
        <B24Input
          placeholder="Focus me"
          @focus="openCustomAnchor = true"
        />
      </template>

      <template #content>
        <div class="flex items-center justify-between gap-4 mb-2xs">
          <ProseH4 class="mb-0.5">
            Popover non-dismissible
          </ProseH4>

          <B24Button
            color="air-tertiary-no-accent"
            :icon="Cross50Icon"
            @click="openCustomAnchor = false"
          />
        </div>
        <Placeholder class="w-60 h-48" />
      </template>
    </B24Popover>
  </PlaygroundPage>
</template>
