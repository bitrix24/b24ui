<script setup lang="ts">
import { defineAsyncComponent, useTemplateRef } from 'vue'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import Placeholder from '../../components/Placeholder.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import MockSidebarLayoutMenu from '../../components/MockSidebarLayoutMenu.vue'
import MockSidebarLayoutActions from '../../components/MockSidebarLayoutActions.vue'
import MockSidebarLayoutSideFooter from '../../components/MockSidebarLayoutSideFooter.vue'
import MockContentLongString from '../../components/MockContentLongString.vue'
import MockContentLongText from '../../components/MockContentLongText.vue'
import MockContentUploadFile from '../../components/MockContentUploadFile.vue'
import { action } from '../../composables/useMockMenu'
import B24Slideover from '@bitrix24/b24ui-nuxt/components/Slideover.vue'
import type { SlideoverInstance } from '@bitrix24/b24ui-nuxt'

usePageMeta.setPageTitle('Slideover')

const SlideoverExample = defineAsyncComponent(() => import('../../components/SlideoverExample.vue'))

const open = ref(false)
const openTopAndBottom = ref(false)
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

const currentSlideoverRef = useTemplateRef<SlideoverInstance>('currentSlideoverRef')
const handleSidebarLayoutLoadingAction = async () => {
  if (!currentSlideoverRef.value) {
    return
  }

  try {
    currentSlideoverRef.value.setSidebarLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2_000))
  } finally {
    currentSlideoverRef.value.setSidebarLoading(false)
  }
}
</script>

<template>
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="base" class="md:col-span-2">
      <ExampleCardSubTitle title="opening options" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Slideover
          title="First slideover"
          description="This slideover has `side: 'right'` prop."
          side="right"
          :close="{ label: 'Right' }"
        >
          <B24Button label="Right" />

          <template #body>
            <Placeholder class="size-full" />
          </template>

          <template #footer>
            <B24Slideover
              title="Second slideover"
              :b24ui="{ content: 'max-w-[600px]' }"
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
          title="Slideover on left side"
          description="This slideover has `side: 'left'` prop."
          side="left"
          :close="{ label: 'Left' }"
        >
          <B24Button label="Left" />

          <template #body>
            <Placeholder class="size-full" />
          </template>

          <template #footer>
            <B24ModalDialogClose>
              <B24Button label="Cancel" />
            </B24ModalDialogClose>
          </template>
        </B24Slideover>

        <B24Slideover
          title="Slideover on top side"
          description="This slideover has `side: 'top'` prop."
          side="top"
        >
          <B24Button label="Top" />

          <template #body>
            <Placeholder class="size-full" />
          </template>

          <template #footer>
            <B24ModalDialogClose>
              <B24Button label="Cancel" />
            </B24ModalDialogClose>
          </template>
        </B24Slideover>

        <B24Slideover
          title="Slideover on bottom side"
          description="This slideover has `side: 'bottom'` prop."
          :close="{ label: 'Bottom' }"
        >
          <B24Button label="Bottom" color="air-secondary-accent-2" />

          <template #body>
            <Placeholder class="size-full" />
          </template>

          <template #footer>
            <B24ModalDialogClose>
              <B24Button label="Cancel" />
            </B24ModalDialogClose>
          </template>
        </B24Slideover>
      </div>

      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Slideover
          v-model:open="open"
          title="Slideover with v-model"
          description="This is useful to control the state yourself."
        >
          <template #body>
            <Placeholder class="size-full" />
          </template>
        </B24Slideover>

        <B24Button label="Open with v-model" @click="open = true" />

        <B24Button label="Open programmatically" color="air-secondary-accent-1" @click="openSlideover" />
      </div>

      <ExampleCardSubTitle title="overlay" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Slideover
          title="Slideover without overlay blur"
          description="This slideover has `overlay-blur: off` prop."
          overlay-blur="off"
        >
          <B24Button label="Open without overlay blur" />

          <template #body>
            <Placeholder class="size-full" />
          </template>
        </B24Slideover>

        <B24Slideover
          title="Slideover without overlay"
          description="This slideover has `overlay: false` prop."
          :overlay="false"
        >
          <B24Button label="Open without overlay" />

          <template #body>
            <Placeholder class="size-full" />
          </template>
        </B24Slideover>

        <B24Slideover
          title="Slideover without modal & overlay"
          description="This slideover has `modal: false` and `overlay: false` to interact with outside content."
          :overlay="false"
          :modal="false"
        >
          <B24Button label="Open without modal" />

          <template #body>
            <Placeholder class="size-full" />
          </template>
        </B24Slideover>
      </div>

      <ExampleCardSubTitle title="transition & portal & size" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Slideover
          title="Slideover without transition"
          description="This slideover has `transition: false` prop."
          :transition="false"
        >
          <B24Button label="Open without transition" />

          <template #body>
            <Placeholder class="size-full" />
          </template>
        </B24Slideover>

        <B24Slideover
          title="Slideover without portal"
          description="This slideover has `portal: false` prop."
          :portal="false"
        >
          <B24Button label="Open without portal" />

          <template #body>
            <Placeholder class="size-full" />
          </template>
        </B24Slideover>
      </div>

      <ExampleCardSubTitle title="closing options" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Slideover
          title="Slideover prevent close"
          description="This slideover has `dismissible: false` prop so it won't close when clicking outside."
          :dismissible="false"
        >
          <B24Button label="Open unclosable" />

          <template #body>
            <Placeholder class="size-full" />
          </template>

          <template #footer>
            <B24ModalDialogClose>
              <B24Button label="Close" color="air-tertiary" />
            </B24ModalDialogClose>
          </template>
        </B24Slideover>

        <B24Slideover
          title="Slideover without close button"
          description="This slideover has `close: false` prop."
          :close="false"
        >
          <B24Button label="Open without close button" />

          <template #body>
            <Placeholder class="size-full" />
          </template>

          <template #footer>
            <B24ModalDialogClose>
              <B24Button label="Close" color="air-tertiary" />
            </B24ModalDialogClose>
          </template>
        </B24Slideover>

        <B24Slideover
          title="Slideover with scoped slot close"
          description="This slideover has a scoped slot close that can be used to close the slideover from within the content."
          side="right"
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
      </div>
    </ExampleCard>

    <ExampleCard title="full" class="md:col-span-2">
      <ExampleCardSubTitle title="different content" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Slideover
          title="Vivendum dignissim conceptam."
          description="Magna copiosae apeirian ius at."
          :close="{ label: 'Test' }"
          :b24ui="{ content: 'sm:max-w-1/2' }"
        >
          <B24Button label="Simple" />

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

        <B24Slideover
          title="Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Magna copiosae apeirian ius at."
          description="Ius dicat feugiat no, vix cu modo dicat principes. Eu cum iuvaret debitis voluptatibus, esse perfecto reformidans id has."
        >
          <B24Button label="Long text" />

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
          ref="currentSlideoverRef"
          title="File upload"
          description="Some description"
          :use-light-content="false"
          :b24ui="{ content: 'sm:max-w-1/2' }"
        >
          <B24Button label="Upload file" />

          <template #body>
            <div class="p-5 rounded bg-(--ui-color-bg-content-primary)">
              <MockContentUploadFile />
            </div>
          </template>

          <template #footer>
            <B24Button
              label="Reload"
              color="air-primary"
              loading-auto
              @click="handleSidebarLayoutLoadingAction"
            />
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
          side="bottom"
          :use-light-content="false"
          :b24ui="{
            overlay: 'bg-[#00204e]/85',
            content: 'top-[58px] sm:top-[58px] right-[22px] sm:right-[22px] max-h-[calc(100%-58px)] sm:max-h-[calc(100%-58px)] w-[calc(100%-60px-22px)] sm:w-[calc(100%-60px-22px)]'
          }"
        >
          <template #sidebar>
            <B24SidebarHeader>
              <div class="h-full flex items-center relative my-0 ps-[25px] pe-xs rtl:pe-[25px]">
                <ProseH4 class="font-medium mb-0">
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
            <MockSidebarLayoutTop>
              Bottom
            </MockSidebarLayoutTop>
          </template>
          <template #actions>
            <MockSidebarLayoutActions />
          </template>
          <template #body>
            <ProseP class="mb-4">Selected action: <ProseStrong>{{ action }}</ProseStrong></ProseP>
            <Placeholder class="size-full h-[800px]" />
          </template>
        </B24Slideover>
        <B24Slideover
          v-model:open="openTopAndBottom"
          side="top"
          :dismissible="false"
          :close="false"
          :overlay="false"
          :modal="false"
          :b24ui="{
            content: 'max-h-[56px] sm:shadow-none',
            sidebarLayoutRoot: 'edge-dark --ui-context-edge-dark bg-transparent  dark:bg-transparent pl-[calc(60px+0px)]',
            sidebarLayoutHeaderWrapper: 'bg-transparent'
          }"
        >
          <template #navbar>
            <MockSidebarLayoutMenu orientation="horizontal" />
          </template>
        </B24Slideover>
        <B24Button label="Top & Bottom" @click="openTopAndBottom = true" />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
