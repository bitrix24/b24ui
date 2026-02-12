<script setup lang="ts">
import theme from '#build/b24ui/slideover'
import { defineAsyncComponent } from 'vue'
import Placeholder from '../../components/Placeholder.vue'
import MockSidebarLayoutMenu from '../../components/MockSidebarLayoutMenu.vue'
import MockSidebarLayoutActions from '../../components/MockSidebarLayoutActions.vue'
import MockSidebarLayoutSideFooter from '../../components/MockSidebarLayoutSideFooter.vue'
import MockContentLongString from '../../components/MockContentLongString.vue'
import MockContentLongText from '../../components/MockContentLongText.vue'
import MockContentUploadFile from '../../components/MockContentUploadFile.vue'
import B24Slideover from '@bitrix24/b24ui-nuxt/components/Slideover.vue'
import BusinesProcessStagesIcon from '@bitrix24/b24icons-vue/outline/BusinesProcessStagesIcon'
import TrendUpIcon from '@bitrix24/b24icons-vue/outline/TrendUpIcon'
import TrendDownIcon from '@bitrix24/b24icons-vue/outline/TrendDownIcon'
import { useMockMenu } from './../../composables/useMockMenu'

const { action } = useMockMenu()

const SlideoverExample = defineAsyncComponent(() => import('../../components/SlideoverExample.vue'))

const sides = Object.keys(theme.variants.side) as Array<keyof typeof theme.variants.side>

const attrs = reactive({
  side: sides[2],
  overlay: true,
  modal: true,
  transition: true,
  close: true,
  portal: true,
  inset: false
})

const open = ref(false)
const openTopAndBottom = ref(false)
const openListItem = ref(false)
const count = ref(0)
const overlay = useOverlay()

const slideover = overlay.create(SlideoverExample, {
  props: {
    count: count.value
  }
})
function openSlideover() {
  count.value++

  slideover.open({
    description: 'And you can even provide a description!',
    count: count.value
  })
}

const openSliderTopAndBottom = async () => {
  openTopAndBottom.value = true
  Promise.resolve().then(() => {
    requestAnimationFrame(() => {
      console.log(123)
    })
  })
}
</script>

<template>
  <PlaygroundPage :b24ui="{ body: 'flex-col gap-2 max-w-100 mx-auto' }">
    <template #controls>
      <B24Select v-model="attrs.side" :items="sides" label="Side" class="w-24" />
      <B24Switch v-model="attrs.overlay" label="Overlay" />
      <B24Switch v-model="attrs.modal" label="Modal" />
      <B24Switch v-model="attrs.transition" label="Transition" />
      <B24Switch v-model="attrs.close" label="Close" />
      <B24Switch v-model="attrs.portal" label="Portal" />
      <B24Switch v-model="attrs.inset" label="Inset" />
    </template>

    <B24Slideover
      title="First slideover"
      v-bind="{ ...attrs, close: { label: attrs.side } }"
    >
      <B24Button label="Open with nested slideover" />

      <template #body>
        <Placeholder class="size-full" />
      </template>

      <template #footer>
        <B24Slideover
          title="Second slideover"
          :b24ui="{ content: 'max-w-[600px]' }"
          v-bind="attrs"
        >
          <B24Button label="Open second" color="air-primary" />

          <template #body>
            <Placeholder class="size-full" />
          </template>
          <template #footer>
            <B24ModalDialogClose>
              <B24Button label="Cancel" />
            </B24ModalDialogClose>
          </template>
        </B24Slideover>
      </template>
    </B24Slideover>

    <B24Slideover
      v-model:open="open"
      title="Slideover with v-model"
      description="This is useful to control the state yourself."
      :b24ui="{
        content: 'sm:max-w-1/2',
        sidebarLayoutRoot: 'edge-dark'
      }"
      v-bind="{ ...attrs, close: { label: 'Test' } }"
    >
      <template #body>
        <MockContentLongString />
      </template>
      <template #footer>
        <B24ModalDialogClose>
          <B24Button label="Send" color="air-primary-success" />
        </B24ModalDialogClose>
        <B24ModalDialogClose>
          <B24Button label="Cancel" color="air-tertiary" />
        </B24ModalDialogClose>
      </template>
    </B24Slideover>
    <B24Button label="Open with v-model" color="air-secondary-accent" @click="open = true" />

    <B24Slideover
      title="Slideover with overlay blur"
      description="This slideover has `overlay-blur: auto` prop."
      overlay-blur="auto"
      v-bind="attrs"
    >
      <B24Button label="Open with overlay blur" />

      <template #body>
        <Placeholder class="size-full" />
      </template>
    </B24Slideover>

    <B24Slideover
      title="Slideover prevent close"
      description="This slideover has `dismissible: false` prop so it won't close when clicking outside."
      v-bind="{ ...attrs, dismissible: false, modal: false, overlay: false }"
    >
      <B24Button label="Open unclosable" color="air-secondary-accent" />

      <template #body>
        <div class="p-5 rounded-(--ui-border-radius-md) bg-(--ui-color-bg-content-primary)">
          <MockContentUploadFile />
        </div>
      </template>

      <template #footer>
        <B24ModalDialogClose>
          <B24Button label="Send" color="air-primary-success" />
        </B24ModalDialogClose>
        <B24ModalDialogClose>
          <B24Button label="Cancel" color="air-tertiary" />
        </B24ModalDialogClose>
      </template>
    </B24Slideover>

    <B24Slideover
      title="Slideover with scoped slot close"
      description="This slideover has a scoped slot close that can be used to close the slideover from within the content."
      v-bind="attrs"
    >
      <B24Button label="Open with scoped slot close" />

      <template #header="{ close }">
        <B24Button label="Close with scoped slot close" @click="close" />
      </template>

      <template #body="{ close }">
        <B24Button label="Close with scoped slot close" @click="close" />
      </template>

      <template #footer="{ close }">
        <B24Button label="Close with scoped slot close" @click="close" />
      </template>
    </B24Slideover>

    <B24Slideover
      title="Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Magna copiosae apeirian ius at."
      description="Ius dicat feugiat no, vix cu modo dicat principes. Eu cum iuvaret debitis voluptatibus, esse perfecto reformidans id has."
      :b24ui="{
        content: 'sm:max-w-1/2',
        sidebarLayoutRoot: '[--air-theme-bg-color:#ffffffb5] dark:[--air-theme-bg-color:#55476bb5]'
      }"
      v-bind="attrs"
    >
      <B24Button label="Open with long text" color="air-secondary-accent" />

      <template #body>
        <MockContentLongText />
      </template>

      <template #footer>
        <B24ModalDialogClose>
          <B24Button label="Send" color="air-primary-success" />
        </B24ModalDialogClose>
        <B24ModalDialogClose>
          <B24Button label="Cancel" color="air-tertiary" />
        </B24ModalDialogClose>
      </template>
    </B24Slideover>

    <B24Slideover
      v-model:open="openTopAndBottom"
      title="Bottom"
      description="Some description"
      v-bind="{ ...attrs, side: 'bottom' }"
      :use-light-content="false"
      :b24ui="{
        overlay: 'bg-[#00204e]/85',
        content: 'top-[58px] sm:top-[58px] right-[22px] sm:right-[22px] max-h-[calc(100%-58px)] sm:max-h-[calc(100%-58px)] w-[calc(100%-60px-22px)] sm:w-[calc(100%-60px-22px)]',
        sidebarLayoutRoot: [
          'edge-light',
          'edge-light:[--air-theme-bg-color:#eef2f4]',
          'edge-light:[--air-theme-bg-size:auto]',
          'edge-light:[--air-theme-bg-repeat:repeat]',
          'edge-light:[--air-theme-bg-position:0_0]',
          'edge-light:[--air-theme-bg-attachment:scroll]',
          'edge-light:[--air-theme-bg-image:none]',
          'edge-light:[--air-theme-bg-image-blurred:none]'
        ].join(' ')
      }"
    >
      <template #sidebar>
        <B24SidebarHeader>
          <div class="h-full flex items-center relative my-0 ps-[25px] pe-xs rtl:pe-[25px]">
            <ProseH4 class="font-(--ui-font-weight-medium) mb-0">
              Inner
            </ProseH4>
          </div>
        </B24SidebarHeader>
        <B24SidebarBody>
          <MockSidebarLayoutMenu orientation="vertical" />
        </B24SidebarBody>
        <B24SidebarFooter>
          <B24SidebarSection>
            <MockSidebarLayoutSideFooter />
          </B24SidebarSection>
        </B24SidebarFooter>
      </template>
      <template #navbar>
        <MockSidebarLayoutMenu orientation="horizontal" />
      </template>
      <template #header>
        <div class="w-full flex flex-col gap-lg">
          <MockSidebarLayoutTopProfile class="rounded-(--ui-border-radius-md)" />
          <MockSidebarLayoutTop class="flex-row">
            Bottom
          </MockSidebarLayoutTop>
        </div>
      </template>
      <template #actions>
        <MockSidebarLayoutActions />
      </template>
      <template #body>
        <Placeholder class="size-full">
          <div class="p-4 rounded-md bg-(--ui-color-g-content-glass-1)">
            <ProseP>Selected action: <ProseStrong>{{ action }}</ProseStrong></ProseP>
          </div>
        </Placeholder>
      </template>
    </B24Slideover>
    <B24Slideover
      v-model:open="openTopAndBottom"
      title="Top"
      description="Some description"
      v-bind="{ ...attrs, side: 'top' }"
      :b24ui="{
        content: 'max-h-[56px] sm:shadow-none',
        sidebarLayoutRoot: [
          'edge-dark',
          'edge-dark:[--air-theme-bg-color:#00204e85]',
          'edge-dark:[--air-theme-bg-size:cover]',
          'edge-dark:[--air-theme-bg-repeat:no-repeat]',
          'edge-dark:[--air-theme-bg-position:0_0]',
          'edge-dark:[--air-theme-bg-attachment:fixed]',
          'edge-dark:[--air-theme-bg-image:none]',
          'edge-dark:[--air-theme-bg-image-blurred:none]',
          'pl-[calc(60px+0px)]'
        ].join(' '),
        sidebarLayoutHeaderWrapper: 'before:hidden'
      }"
    >
      <template #navbar>
        <MockSidebarLayoutMenu orientation="horizontal" />
      </template>
    </B24Slideover>
    <B24Button label="Top & Bottom" @click="openSliderTopAndBottom" />

    <B24Slideover
      title="List"
      description="Some description"
      :use-light-content="false"
      :b24ui="{
        content: 'sm:max-w-[970px]',
        sidebarLayoutRoot: [
          'edge-dark',
          'edge-dark:[--air-theme-bg-color:#7c235b]',
          'edge-dark:[--air-theme-bg-size:cover]',
          'edge-dark:[--air-theme-bg-repeat:no-repeat]',
          'edge-dark:[--air-theme-bg-position:0_0]',
          'edge-dark:[--air-theme-bg-attachment:local]',
          'edge-dark:[--air-theme-bg-image:url(/bg/edge-dark-v2.jpg)]',
          'edge-dark:[--air-theme-bg-image-blurred:url(/bg/edge-dark-v2-blurred.webp)]'
        ].join(' ')
      }"
      v-bind="{ ...attrs, close: { label: 'List' } }"
    >
      <B24Button label="List" color="air-secondary-accent" />
      <template #header>
        <div class="w-full flex flex-col gap-lg">
          <MockSidebarLayoutTopProfile class="-mt-xl rounded-b-(--ui-border-radius-md)" />
          <MockSidebarLayoutTop class="flex-row">
            List
          </MockSidebarLayoutTop>
        </div>
      </template>
      <template #body>
        <div class="light px-0.5 rounded-(--ui-border-radius-md) bg-(--ui-color-background-primary)">
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
    </B24Slideover>
    <B24Slideover
      v-model:open="openListItem"
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
      v-bind="{ ...attrs, close: { label: 'Item' } }"
    >
      <template #header>
        <div
          class="w-full pt-(--ui-space-inset-md2) pb-[calc(var(--ui-space-inset-md2)+10px)] px-(--ui-space-inset-lg) rounded-(--ui-border-radius-3xl) bg-(--ui-color-background-primary)/80 flex flex-row items-center justify-between gap-lg"
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
          <B24Button label="Back" color="air-tertiary" />
        </B24ModalDialogClose>
        <B24ModalDialogClose>
          <B24Button label="Continue" color="air-primary" />
        </B24ModalDialogClose>
      </template>
    </B24Slideover>

    <B24Button label="Open programmatically" @click="openSlideover" />
  </PlaygroundPage>
</template>
