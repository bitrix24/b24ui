<script setup lang="ts">
import { ref } from 'vue'
import TrendUpIcon from '@bitrix24/b24icons-vue/outline/TrendUpIcon'
import TrendDownIcon from '@bitrix24/b24icons-vue/outline/TrendDownIcon'
import BusinesProcessStagesIcon from '@bitrix24/b24icons-vue/outline/BusinesProcessStagesIcon'

const openListItem = ref(false)

// Manage loading state
const handleAction = async () => {
  await new Promise(resolve => setTimeout(resolve, 2_000))
}
</script>

<template>
  <B24Slideover
    ref="currentSlideoverRef"
    title="Some list"
    description="Some description"
    :use-light-content="false"
    :b24ui="{
      content: 'sm:max-w-[970px] sm:top-[275px] sm:max-h-[calc(100%-275px)]',
      sidebarLayoutRoot: [
        'edge-dark',
        'edge-dark:[--air-theme-bg-color:#7c235b]',
        'edge-dark:[--air-theme-bg-size:cover]',
        'edge-dark:[--air-theme-bg-repeat:no-repeat]',
        'edge-dark:[--air-theme-bg-position:0_0]',
        'edge-dark:[--air-theme-bg-attachment:local]',
        'edge-dark:[--air-theme-bg-image:url(/bg/edge-dark-v2.jpg)]',
        'edge-dark:[--air-theme-bg-image-blurred:url(/bg/edge-dark-v2-blurred.webp)]'
      ].join(' '),
      sidebarLayoutLoadingIcon: 'text-(--ui-color-gray-70)'
    }"
  >
    <B24Button label="Some list" color="air-boost" />
    <template #body>
      <div class="light mt-[22px] rounded-(--ui-border-radius-md) bg-(--ui-color-background-primary)">
        <B24TableWrapper
          row-hover
          class="overflow-x-auto w-full"
        >
          <table>
            <!-- head -->
            <thead>
              <tr>
                <th>#</th>
                <th>Company</th>
                <th>Status</th>
                <th>Amount (USD)</th>
              </tr>
            </thead>
            <tbody>
              <!-- row 1 -->
              <tr>
                <th>1</th>
                <td><B24Link @click="openListItem = true">Tech Innovators Inc.</B24Link></td>
                <td><B24Badge label="Proposal Sent" use-link use-close /></td>
                <td>50,000</td>
              </tr>
              <!-- row 2 -->
              <tr>
                <th>2</th>
                <td><B24Link @click="openListItem = true">Global Solutions Ltd.</B24Link></td>
                <td><B24Badge label="Negotiation" use-link inverted use-close /></td>
                <td>120,000</td>
              </tr>
              <!-- row 3 -->
              <tr>
                <th>3</th>
                <td><B24Link @click="openListItem = true">Future Enterprises</B24Link></td>
                <td><B24Chip standalone color="air-primary-warning" text="Contract Signed" size="lg" :trailing-icon="TrendUpIcon" /></td>
                <td>200,000</td>
              </tr>
              <!-- row 4 -->
              <tr>
                <th>4</th>
                <td><B24Link @click="openListItem = true">Bright Ideas Co.</B24Link></td>
                <td>
                  <B24Chip
                    standalone
                    text="Initial Contact"
                    color="air-primary-alert"
                    size="lg"
                    inverted
                    :trailing-icon="TrendDownIcon"
                  />
                </td>
                <td>15,000</td>
              </tr>
              <!-- row 5 -->
              <tr>
                <th>5</th>
                <td><B24Link @click="openListItem = true">NextGen Technologies</B24Link></td>
                <td>
                  <B24Chip
                    standalone
                    text="Important"
                    size="lg"
                    color="air-primary-alert"
                    :b24ui="{ base: 'style-filled-boost' }"
                  />
                </td>
                <td>300,000</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan="3" class="text-right">
                  Total:
                </th>
                <td>
                  685,000
                </td>
              </tr>
            </tfoot>
          </table>
        </B24TableWrapper>
      </div>
    </template>

    <template #footer>
      <B24Button
        label="Reload"
        color="air-primary"
        loading-auto
        @click="handleAction"
      />
      <B24ModalDialogClose>
        <B24Button label="Cancel" color="air-tertiary" />
      </B24ModalDialogClose>
    </template>
  </B24Slideover>
  <B24Slideover
    v-model:open="openListItem"
    :close="{ label: 'Item' }"
    title="Item"
    description="Some description"
    :use-light-content="false"
    :b24ui="{
      content: 'sm:max-w-[965px] sm:top-[375px] sm:max-h-[calc(100%-375px)]',
      body: 'relative',
      sidebarLayoutRoot: [
        'edge-light',
        'edge-light:[--air-theme-bg-color:#eef2f4]',
        'edge-light:[--air-theme-bg-size:auto]',
        'edge-light:[--air-theme-bg-repeat:no-repeat]',
        'edge-light:[--air-theme-bg-position:0_0]',
        'edge-light:[--air-theme-bg-attachment:local]',
        'edge-light:[--air-theme-bg-image:url(/bg/slider-ring-blurred.webp)]',
        'edge-light:[--air-theme-bg-image-blurred:url(/bg/slider-ring-blurred.webp)]'
      ].join(' ')
    }"
  >
    <template #header>
      <div
        class="w-full pt-(--ui-space-inset-md2) pb-[calc(var(--ui-space-inset-md2)+10px)] px-(--ui-space-inset-lg) rounded-(--ui-border-radius-3xl) bg-(--ui-color-background-primary)/80 flex flex-row items-center justify-between gap-[20px]"
      >
        <B24Avatar
          :icon="BusinesProcessStagesIcon"
          alt="Workflows"
          size="2xl"
          :b24ui="{
            root: 'bg-(--ui-color-primary)',
            icon: 'size-[48px] text-(--ui-color-palette-white-base)'
          }"
        />
        <div class="flex-1">
          <ProseH1 class="text-(--ui-color-text-primary) leading-[29px] font-(--ui-font-weight-light)">
            Workflows
          </ProseH1>
          <ProseP small accent="less">
            Automate your workflows, control every stage and manage workflows from your mobile.
          </ProseP>
        </div>
      </div>
    </template>
    <template #body>
      <Placeholder class="w-full h-[300px]" />
    </template>
    <template #footer>
      <B24ModalDialogClose>
        <B24Button label="Continue" color="air-primary" />
      </B24ModalDialogClose>
      <B24ModalDialogClose>
        <B24Button label="Back" color="air-tertiary" />
      </B24ModalDialogClose>
    </template>
  </B24Slideover>
</template>
