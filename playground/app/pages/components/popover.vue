<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import MockContentLongText from '../../components/MockContentLongText.vue'
import MockContentUploadFile from '../../components/MockContentUploadFile.vue'
import Cross50Icon from '@bitrix24/b24icons-vue/actions/Cross50Icon'

usePageMeta.setPageTitle('Popover')

const openVer1 = ref(false)
const openVer2 = ref(false)
const openCustomAnchor = ref(false)
</script>

<template>
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="base" class="md:col-span-2">
      <ExampleCardSubTitle title="opening options" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Popover :b24ui="{ content: 'p-[10px]' }">
          <B24Button label="Click" />

          <template #content>
            <Placeholder class="size-[192px]" />
          </template>
        </B24Popover>

        <B24Popover mode="hover" :b24ui="{ content: 'p-[10px]' }">
          <B24Button label="Hover" />

          <template #content>
            <Placeholder class="size-[192px]" />
          </template>
        </B24Popover>

        <B24Popover
          mode="hover"
          :open-delay="500"
          :close-delay="300"
          :b24ui="{ content: 'p-[10px]' }"
        >
          <B24Button label="Delay" />

          <template #content>
            <Placeholder class="size-[192px]" />
          </template>
        </B24Popover>

        <B24Popover
          mode="hover"
          :content="{
            align: 'center',
            side: 'right',
            sideOffset: 16
          }"
          :b24ui="{ content: 'p-[10px]' }"
        >
          <B24Button label="Content" />

          <template #content>
            <Placeholder class="size-[192px]" />
          </template>
        </B24Popover>

        <B24Popover
          mode="hover"
          arrow
          :b24ui="{ content: 'p-[10px]' }"
        >
          <B24Button label="Arrow" />

          <template #content>
            <Placeholder class="size-[192px]" />
          </template>
        </B24Popover>
      </div>
    </ExampleCard>

    <ExampleCard title="full" class="md:col-span-2">
      <ExampleCardSubTitle title="different content" />
      <div class="mb-4 flex flex-row flex-wrap gap-[20px]">
        <B24Popover
          v-model:open="openVer1"
          arrow
          :dismissible="false"
          :b24ui="{ content: 'p-[10px]' }"
        >
          <B24Button label="Non-dismissible" color="air-secondary-accent-1" />

          <template #content>
            <div class="flex items-center justify-between gap-4 mb-[4px]">
              <ProseH2>
                Popover non-dismissible
              </ProseH2>

              <B24Button
                color="air-tertiary"
                :icon="Cross50Icon"
                @click="openVer1 = false"
              />
            </div>

            <Placeholder class="w-full h-[192px]" />
          </template>
        </B24Popover>

        <B24Popover arrow :b24ui="{ content: 'p-[10px] pe-[4px]' }">
          <B24Button label="Long text" color="air-secondary-alert" />

          <template #content>
            <div class="max-w-[192px] max-h-[192px] overflow-y-auto scrollbar-thin scrollbar-transparent">
              <MockContentLongText />
            </div>
          </template>
        </B24Popover>

        <B24Popover
          v-model:open="openVer2"
          arrow
          :b24ui="{ content: 'p-[10px]' }"
        >
          <B24Button label="Upload file" />

          <template #content>
            <div class="max-w-[192px] max-h-[292px]">
              <MockContentUploadFile />
            </div>

            <div class="mt-[20px] flex flex-row gap-[10px]">
              <B24Button
                rounded
                label="Send"
                color="air-primary-success"
                size="sm"
                @click="openVer2 = false"
              />
              <B24Button
                rounded
                label="Cancel"
                color="air-tertiary"
                size="sm"
                @click="openVer2 = false"
              />
            </div>
          </template>
        </B24Popover>

        <B24Popover
          v-model:open="openCustomAnchor"
          :dismissible="false"
          :content="{
            align: 'center',
            side: 'bottom',
            sideOffset: -50
          }"
          :b24ui="{ content: 'w-[calc(var(--reka-popper-anchor-width)+10px)] p-[10px]' }"
        >
          <template #anchor>
            <B24Input
              placeholder="Search"
              class="w-full"
              @focus="openCustomAnchor = true"
            />
          </template>

          <template #content>
            <div class="flex items-center justify-between gap-4 mb-[4px]">
              <ProseH2>
                Popover non-dismissible
              </ProseH2>

              <B24Button
                color="air-tertiary"
                :icon="Cross50Icon"
                @click="openCustomAnchor = false"
              />
            </div>
            <Placeholder class="w-full h-[192px]" />
          </template>
        </B24Popover>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
