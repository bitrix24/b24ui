<script setup lang="ts">
import theme from '#build/b24ui/slideover'
import { defineAsyncComponent } from 'vue'
import { useMockMenu } from '../../composables/useMockMenu'
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
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'

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
const openTopAndBottomVer2 = ref(false)
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
}

const openSliderTopAndBottomVer2 = async () => {
  openTopAndBottomVer2.value = true
}
</script>

<template>
  <PlaygroundPage :b24ui="{ body: 'flex-col gap-2 max-w-100 mx-auto' }">
    <template #controls>
      <B24Select v-model="attrs.side" :items="sides" size="xs" label="Side" class="w-24" />
      <B24Switch v-model="attrs.overlay" size="xs" label="Overlay" />
      <B24Switch v-model="attrs.modal" size="xs" label="Modal" />
      <B24Switch v-model="attrs.transition" size="xs" label="Transition" />
      <B24Switch v-model="attrs.close" size="xs" label="Close" />
      <B24Switch v-model="attrs.portal" size="xs" label="Portal" />
      <B24Switch v-model="attrs.inset" size="xs" label="Inset" />
    </template>

    <B24Slideover
      title="First slideover"
      v-bind="{ ...attrs, close: attrs.close ? { label: attrs.side } : false }"
      :b24ui="{ content: 'sm:max-w-1/2 lg:max-w-1/4' }"
    >
      <B24Button label="Open with nested slideover" />

      <template #body>
        <Placeholder class="size-full" />
      </template>

      <template #footer>
        <B24Slideover
          title="Second slideover"
          v-bind="attrs"
          side="bottom"
          :b24ui="{ content: 'sm:max-w-1/2 lg:max-w-1/4 sm:top-[375px] sm:max-h-[calc(100%-375px)]' }"
        >
          <B24Button size="lg" label="Open second" color="air-primary" />

          <template #body>
            <Placeholder class="size-full" />
          </template>
          <template #footer>
            <B24ModalDialogClose>
              <B24Button size="sm" color="air-tertiary" label="Cancel" :normal-case="false" />
            </B24ModalDialogClose>
          </template>
        </B24Slideover>

        <B24ModalDialogClose>
          <B24Button size="sm" color="air-tertiary" label="Cancel" :normal-case="false" />
        </B24ModalDialogClose>
      </template>
    </B24Slideover>

    <B24Slideover
      v-model:open="open"
      title="Slideover with v-model"
      description="This is useful to control the state yourself."
      :b24ui="{ content: 'edge-dark air-custom-bg sm:max-w-1/2 lg:max-w-1/4' }"
      v-bind="{ ...attrs, close: { label: 'Test' } }"
    >
      <template #body>
        <B24Card class="base-mode" :b24ui="{ root: 'size-full' }">
          <MockContentLongString />
        </B24Card>
      </template>
      <template #footer>
        <B24ModalDialogClose>
          <B24Button size="lg" color="air-primary" label="Save" />
        </B24ModalDialogClose>
        <B24ModalDialogClose>
          <B24Button size="sm" color="air-tertiary" label="Cancel" :normal-case="false" />
        </B24ModalDialogClose>
      </template>
    </B24Slideover>
    <B24Button label="Open with v-model" color="air-secondary-accent" @click="open = true" />

    <B24Slideover
      title="Slideover with overlay blur"
      description="This slideover has `overlay-blur: auto` prop."
      v-bind="attrs"
      :b24ui="{ content: 'sm:max-w-1/2 lg:max-w-1/4' }"
      overlay-blur="auto"
    >
      <B24Button label="Open with overlay blur" />

      <template #body>
        <Placeholder class="size-full" />
      </template>
    </B24Slideover>

    <B24Slideover
      title="Slideover prevent close"
      description="This slideover has `dismissible: false` prop so it won't close when clicking outside."
      :b24ui="{ content: 'sm:max-w-1/2 lg:max-w-1/4' }"
      v-bind="{ ...attrs, dismissible: false, modal: true, overlay: true }"
    >
      <B24Button label="Open unclosable" color="air-secondary-accent" />

      <template #body>
        <B24Card :b24ui="{ root: 'w-full' }">
          <MockContentUploadFile />
        </B24Card>
      </template>

      <template #footer>
        <B24ModalDialogClose>
          <B24Button size="lg" color="air-primary" label="Save" />
        </B24ModalDialogClose>
        <B24ModalDialogClose>
          <B24Button size="sm" color="air-tertiary" label="Cancel" :normal-case="false" />
        </B24ModalDialogClose>
      </template>
    </B24Slideover>

    <B24Slideover
      title="Slideover with scoped slot close"
      description="This slideover has a scoped slot close that can be used to close the slideover from within the content."
      v-bind="attrs"
      :b24ui="{ content: 'sm:max-w-1/2 lg:max-w-1/4' }"
    >
      <B24Button label="Open with scoped slot close" />

      <template #header="{ close }">
        <B24Button label="Close with scoped slot[header] close" @click="close" />
      </template>

      <template #body="{ close }">
        <B24Button label="Close with scoped slot[body] close" @click="close" />
      </template>

      <template #footer="{ close }">
        <B24Button label="Close with scoped slot[footer] close" @click="close" />
      </template>
    </B24Slideover>

    <B24Slideover
      title="Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Magna copiosae apeirian ius at."
      description="Ius dicat feugiat no, vix cu modo dicat principes. Eu cum iuvaret debitis voluptatibus, esse perfecto reformidans id has."
      v-bind="attrs"
      :b24ui="{
        content: 'bg-[#ffffffb5] dark:bg-[#55476bb5] sm:max-w-1/2 lg:max-w-1/3',
        body: 'scrollbar-thin'
      }"
    >
      <B24Button label="Open with long text" color="air-secondary-accent" />

      <template #body>
        <B24Card class="base-mode" :b24ui="{ root: 'w-full' }">
          <MockContentLongText />
        </B24Card>
      </template>

      <template #footer>
        <B24ModalDialogClose>
          <B24Button size="lg" color="air-primary" label="Save" />
        </B24ModalDialogClose>
        <B24ModalDialogClose>
          <B24Button size="sm" color="air-tertiary" label="Cancel" :normal-case="false" />
        </B24ModalDialogClose>
      </template>
    </B24Slideover>

    <B24Slideover
      v-model:open="openTopAndBottom"
      title="Bottom"
      description="Some description"
      v-bind="{ ...attrs }"
      side="bottom"
      :dismissible="false"
      :overlay="true"
      :modal="true"
      :close="true"
      :inert="false"
      :b24ui="{
        overlay: 'bg-[#00204e]/85',
        content: [
          'light',
          'top-[58px] sm:top-[58px]',
          'right-[22px] sm:right-[22px]',
          'max-h-[calc(100%-58px)] sm:max-h-[calc(100%-58px)]',
          'w-[calc(100%-60px-22px)] sm:w-[calc(100%-60px-22px)]'
        ].join(' '),
        header: 'base-mode px-0 pb-0',
        body: 'base-mode pt-[20px] scrollbar-thin scrollbar-transparent'
      }"
    >
      <template #header>
        <div class="w-full flex flex-col gap-lg">
          <MockSidebarLayoutTopProfile class="rounded-b-none rounded-t-[18px] -mt-[20px]" />
        </div>
      </template>
      <template #body>
        <div class="lg:col-span-12 lg:min-w-0 flex-1 flex flex-col lg:gap-[22px] mt-0 h-full gap-[22px]">
          <MockSidebarLayoutTop class="flex-row">
            Bottom
          </MockSidebarLayoutTop>
          <MockSidebarLayoutActions />

          <Placeholder class="w-full min-h-[calc(100%+20px)]">
            <div class="p-4 rounded-md bg-(--ui-color-g-content-glass-1)">
              <ProseP>Selected action: <ProseStrong>{{ action }}</ProseStrong></ProseP>
            </div>
          </Placeholder>
        </div>
      </template>
    </B24Slideover>
    <B24Slideover
      v-model:open="openTopAndBottom"
      title="Top"
      description="Some description"
      v-bind="{ ...attrs }"
      side="top"
      :dismissible="false"
      :overlay="false"
      :modal="false"
      :close="false"
      :inert="false"
      class="edge-dark"
      :b24ui="{
        content: 'max-h-[56px] sm:shadow-none bg-transparent dark:bg-transparent',
        header: 'ps-[86px] py-3'
      }"
    >
      <template #header>
        <MockSidebarLayoutMenu orientation="horizontal" />
      </template>
    </B24Slideover>
    <B24Button label="Top & Bottom" @click="openSliderTopAndBottom" />

    <B24Slideover
      v-model:open="openTopAndBottomVer2"
      title="Bottom"
      description="Some description"
      v-bind="{ ...attrs }"
      side="bottom"
      :dismissible="false"
      :overlay="true"
      :modal="true"
      :close="true"
      :inert="false"
      :b24ui="{
        overlay: 'bg-[#00204e]/85',
        content: [
          'light',
          'top-[58px] sm:top-[58px]',
          'right-[22px] sm:right-[22px]',
          'max-h-[calc(100%-58px)] sm:max-h-[calc(100%-58px)]',
          'w-[calc(100%-60px-22px)] sm:w-[calc(100%-60px-22px)]',
          'p-0!'
        ].join(' ')
      }"
    >
      <template #content>
        <div class="relative isolate flex-1 base-mode ">
          <B24DashboardGroup unit="px" storage="local" class="absolute overflow-clip rounded-t-[18px]">
            <B24DashboardSidebar
              id="default"
              mode="slideover"
              collapsible
              resizable
              class="border-e-1 backdrop-blur-none min-h-full"
            >
              <template #header="{ collapsed }">
                <B24DashboardSidebarCollapse :icon="HamburgerMenuIcon" class="size-9 px-2" />
                <ProseH2 v-show="!collapsed" class="mb-0 text-[length:22px] font-semibold text-(--ui-color-base-1)">
                  Inner
                </ProseH2>
              </template>
              <template #default="{ collapsed }">
                <MockSidebarLayoutMenu :collapsed="collapsed" orientation="vertical" />
              </template>

              <template #footer="{ collapsed }">
                <MockSidebarLayoutSideFooter :collapsed="collapsed" />
              </template>
            </B24DashboardSidebar>
            <B24DashboardPanel
              id="demo-slider-top-bottom-v2"
              :b24ui="{
                root: 'min-h-full',
                body: 'p-4 sm:pt-0 scrollbar-transparent'
              }"
            >
              <template #header>
                <B24DashboardNavbar title="Sub Title" :b24ui="{ root: 'lg:pe-6.5' }">
                  <template #right>
                    <MockSidebarLayoutMenu orientation="horizontal" />
                  </template>
                </B24DashboardNavbar>
              </template>
              <template #body>
                <div class="w-full flex flex-col gap-lg">
                  <MockSidebarLayoutTopProfile class="" />
                </div>
                <div class="lg:col-span-12 lg:min-w-0 flex-1 flex flex-col mt-[20px] h-full gap-[22px]">
                  <MockSidebarLayoutTop class="flex-row">
                    Bottom
                  </MockSidebarLayoutTop>
                  <MockSidebarLayoutActions />

                  <Placeholder class="w-full min-h-[calc(100%+20px)]">
                    <div class="p-4 rounded-md bg-(--ui-color-g-content-glass-1)">
                      <ProseP>Selected action: <ProseStrong>{{ action }}</ProseStrong></ProseP>
                    </div>
                  </Placeholder>
                </div>
              </template>
            </B24DashboardPanel>
          </B24DashboardGroup>
        </div>
      </template>
    </B24Slideover>
    <B24Slideover
      v-model:open="openTopAndBottomVer2"
      title="Top"
      description="Some description"
      v-bind="{ ...attrs }"
      side="top"
      :dismissible="false"
      :overlay="false"
      :modal="false"
      :close="false"
      :inert="false"
      class="edge-dark"
      :b24ui="{
        content: 'max-h-[56px] sm:shadow-none bg-transparent dark:bg-transparent',
        header: 'ps-[86px] py-3'
      }"
    >
      <template #header>
        <MockSidebarLayoutMenu orientation="horizontal" />
      </template>
    </B24Slideover>
    <B24Button label="Top & Bottom Ver2" color="air-secondary-accent" @click="openSliderTopAndBottomVer2" />

    <B24Slideover
      title="List"
      description="Some description"
      :use-light-content="false"
      :b24ui="{
        content: [
          'sm:max-w-[970px] sm:top-[275px] sm:max-h-[calc(100%-275px)]',
          'air-custom-bg',
          'edge-dark',
          'edge-dark:[--air-theme-bg-color:#7c235b]',
          'edge-dark:[--air-theme-bg-size:cover]',
          'edge-dark:[--air-theme-bg-repeat:no-repeat]',
          'edge-dark:[--air-theme-bg-position:0_0]',
          'edge-dark:[--air-theme-bg-attachment:local]',
          'edge-dark:[--air-theme-bg-image:url(/bg/edge-dark-v2.jpg)]',
          'dark:before:absolute',
          'dark:before:inset-0 dark:before:bg-black/50'
        ].join(' '),
        header: 'px-0'
      }"
      v-bind="{ ...attrs, close: { label: 'List' } }"
    >
      <B24Button label="List" />
      <template #header>
        <div class="w-full flex flex-col gap-lg">
          <MockSidebarLayoutTopProfile class="rounded-b-none rounded-t-[18px] -mt-[20px]" />
          <MockSidebarLayoutTop class="flex-row">
            List
          </MockSidebarLayoutTop>
        </div>
      </template>
      <template #body>
        <B24Card class="base-mode" :b24ui="{ body: '!px-0 !py-0' }">
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
                  <td>
                    <B24Link @click="openListItem = true">
                      Tech Innovators Inc.
                    </B24Link>
                  </td>
                  <td><B24Badge label="Proposal Sent" use-link use-close /></td>
                  <td>50,000</td>
                </tr>
                <!-- row 2 -->
                <tr>
                  <th>2</th>
                  <td>
                    <B24Link @click="openListItem = true">
                      Global Solutions Ltd.
                    </B24Link>
                  </td>
                  <td><B24Badge label="Negotiation" use-link inverted use-close /></td>
                  <td>120,000</td>
                </tr>
                <!-- row 3 -->
                <tr>
                  <th>3</th>
                  <td>
                    <B24Link @click="openListItem = true">
                      Future Enterprises
                    </B24Link>
                  </td>
                  <td><B24Chip standalone color="air-primary-warning" text="Contract Signed" size="lg" :trailing-icon="TrendUpIcon" /></td>
                  <td>200,000</td>
                </tr>
                <!-- row 4 -->
                <tr>
                  <th>4</th>
                  <td>
                    <B24Link @click="openListItem = true">
                      Bright Ideas Co.
                    </B24Link>
                  </td>
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
                  <td>
                    <B24Link @click="openListItem = true">
                      NextGen Technologies
                    </B24Link>
                  </td>
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
        </B24Card>
      </template>
    </B24Slideover>
    <B24Slideover
      v-model:open="openListItem"
      title="Item"
      description="Some description"
      :use-light-content="false"
      :b24ui="{
        content: [
          'sm:max-w-[965px] sm:top-[375px] sm:max-h-[calc(100%-375px)]',
          'air-custom-bg',
          'edge-light',
          'edge-light:[--air-theme-bg-color:#eef2f4]',
          'edge-light:[--air-theme-bg-size:auto]',
          'edge-light:[--air-theme-bg-repeat:no-repeat]',
          'edge-light:[--air-theme-bg-position:0_0]',
          'edge-light:[--air-theme-bg-attachment:local]',
          'edge-light:[--air-theme-bg-image:url(/bg/slider-ring-blurred.webp)]',
          'dark:before:absolute',
          'dark:before:inset-0 dark:before:bg-black/70'
        ].join(' '),
        body: 'relative'
      }"
      v-bind="{ ...attrs, close: { label: 'Item' } }"
    >
      <template #header>
        <B24Card
          dd-variant="outline"
          :b24ui="{
            root: 'w-full backdrop-blur-sm backdrop-brightness-90',
            body: 'flex flex-row items-center justify-between gap-[20px]'
          }"
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
          <div class="flex-1 base-mode">
            <ProseH1 class="leading-[29px] font-(--ui-font-weight-light)">
              Workflows
            </ProseH1>
            <ProseP small accent="less">
              Automate your workflows, control every stage and manage workflows from your mobile.
            </ProseP>
          </div>
        </B24Card>
      </template>
      <template #body>
        <Placeholder class="w-full h-[300px]" />
      </template>
      <template #footer>
        <B24ModalDialogClose>
          <B24Button size="lg" color="air-primary" label="Continue" />
        </B24ModalDialogClose>
        <B24ModalDialogClose>
          <B24Button size="sm" color="air-tertiary" label="Cancel" :normal-case="false" />
        </B24ModalDialogClose>
      </template>
    </B24Slideover>

    <B24Button label="Open programmatically" color="air-secondary-accent" @click="openSlideover" />
  </PlaygroundPage>
</template>
