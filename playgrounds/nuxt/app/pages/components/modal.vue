<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import Placeholder from '../../components/Placeholder.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import MockContentLongString from '../../components/MockContentLongString.vue'
import MockContentLongText from '../../components/MockContentLongText.vue'
import MockContentUploadFile from '../../components/MockContentUploadFile.vue'
import NotificationIcon from '@bitrix24/b24icons-vue/outline/NotificationIcon'

usePageMeta.setPageTitle('Modal')

const LazyModalExample = defineAsyncComponent(() => import('../../components/ModalExample.vue'))

const open = ref(false)
const count = ref(0)
const overlay = useOverlay()
const toast = useToast()

const modal = overlay.create(LazyModalExample, {
  props: {
    count: count.value
  }
})

function openModal() {
  count.value++

  modal.open({
    description: 'And you can even provide a description!',
    count: count.value
  })
}

function showToast() {
  toast.add({
    title: 'Toast displayed!',
    description: 'This toast was triggered from the modal.',
    color: 'success',
    icon: 'i-lucide-check-circle'
  })
}
</script>

<template>
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="base" class="md:col-span-2">
      <ExampleCardSubTitle title="opening options" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Modal>
          <B24Button label="Custom" />

          <template #content>
            <Placeholder class="h-40 -m-[10px]" />
          </template>
        </B24Modal>

        <B24Modal title="First modal">
          <B24Button label="Open with nested" />

          <template #footer>
            <div class="flex flex-row gap-[10px]">
              <B24Modal title="Second modal">
                <B24Button label="Open second" color="air-primary" />
              </B24Modal>
              <B24ModalDialogClose>
                <B24Button label="Cancel" color="air-tertiary" />
              </B24ModalDialogClose>
            </div>
          </template>
        </B24Modal>

        <B24Modal
          v-model:open="open"
          title="Modal with v-model"
          description="This can be useful to control the state of the modal yourself."
        />

        <B24Button label="Open with v-model" @click="open=true" />

        <B24Button label="Open programmatically" color="air-secondary-accent-1" @click="openModal" />
      </div>

      <ExampleCardSubTitle title="overlay" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Modal
          title="Modal without overlay blur"
          description="This modal has `overlay-blur: off` prop."
          overlay-blur="off"
        >
          <B24Button label="Open without overlay blur" />
        </B24Modal>

        <B24Modal
          title="Modal without overlay"
          description="This modal has `overlay: false` prop."
          :overlay="false"
        >
          <B24Button label="Open without overlay" />
        </B24Modal>

        <B24Modal
          title="Modal without modal & overlay"
          description="This modal has `modal: false` and `overlay: false` to interact with outside content."
          :overlay="false"
          :modal="false"
        >
          <B24Button label="Open without modal" />
        </B24Modal>
      </div>

      <ExampleCardSubTitle title="transition & portal & size" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Modal
          title="Modal without transition"
          description="This modal has `transition: false` prop."
          :transition="false"
        >
          <B24Button label="Open without transition" />
        </B24Modal>

        <B24Modal
          title="Modal without portal"
          description="This modal has `portal: false` prop."
          :portal="false"
        >
          <B24Button label="Open without portal" />
        </B24Modal>

        <B24Modal
          title="Modal fullscreen"
          description="This modal has `fullscreen: true` prop."
          fullscreen
        >
          <B24Button label="Open fullscreen" />
        </B24Modal>

        <B24Modal
          title="Modal scrollable"
          description="This modal has `scrollable: true` prop. Content scrolls within the overlay, preventing accidental closes on scrollbar clicks."
          scrollable
        >
          <B24Button label="Open scrollable" color="air-secondary-alert" />

          <template #body>
            <Placeholder class="h-[200vh] w-full" />
          </template>

          <template #footer>
            <B24Button label="Send" color="air-primary" />
            <B24Button label="Cancel" color="air-tertiary" />
          </template>
        </B24Modal>
      </div>

      <ExampleCardSubTitle title="closing options" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Modal
          title="Modal prevent close"
          description="This modal has `dismissible: false` prop so it won't close when clicking outside."
          :dismissible="false"
          :modal="false"
          :overlay="false"
        >
          <B24Button label="Open unclosable" />
        </B24Modal>

        <B24Modal
          title="Modal without close button"
          description="This modal has `close: false` prop."
          :close="false"
        >
          <B24Button label="Open without close button" />
        </B24Modal>
      </div>
    </ExampleCard>

    <ExampleCard title="full" class="md:col-span-2">
      <ExampleCardSubTitle title="different content" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Modal
          title="Vivendum dignissim conceptam."
          description="Magna copiosae apeirian ius at."
        >
          <B24Button label="Simple" />

          <template #body>
            <MockContentLongString />
          </template>
          <template #footer>
            <B24ModalDialogClose>
              <B24Button label="Send" color="air-primary" />
            </B24ModalDialogClose>
            <B24ModalDialogClose>
              <B24Button label="Cancel" color="air-tertiary" />
            </B24ModalDialogClose>
          </template>
        </B24Modal>

        <B24Modal
          title="Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Magna copiosae apeirian ius at."
          description="Ius dicat feugiat no, vix cu modo dicat principes. Eu cum iuvaret debitis voluptatibus, esse perfecto reformidans id has."
          :b24ui="{ content: 'sm:max-w-[calc(100vw-4rem)]' }"
        >
          <B24Button label="Long text" color="air-secondary-alert" />

          <template #body>
            <MockContentLongText />
          </template>
          <template #footer>
            <B24ModalDialogClose>
              <B24Button label="Send" color="air-primary" />
            </B24ModalDialogClose>
            <B24ModalDialogClose>
              <B24Button label="Cancel" color="air-tertiary" />
            </B24ModalDialogClose>
          </template>
        </B24Modal>

        <B24Modal
          title="File upload"
          :b24ui="{ footer: 'border-t-0 pt-0' }"
        >
          <B24Button label="Upload file" />

          <template #body>
            <MockContentUploadFile />
          </template>
          <template #footer>
            <div class="flex flex-row gap-[10px]">
              <B24ModalDialogClose>
                <B24Button label="Send" color="air-primary" />
              </B24ModalDialogClose>
              <B24ModalDialogClose>
                <B24Button label="Cancel" color="air-tertiary" />
              </B24ModalDialogClose>
            </div>
            <div>
              <B24Button label="Full version" size="sm" color="air-tertiary-no-accent" />
            </div>
          </template>
        </B24Modal>

        <B24Modal title="Modal with toast" description="Touch bug repro: tap 'Show Toast' multiple times, modal closes unexpectedly on touch devices.">
          <B24Button label="Open with toast" />

          <template #body>
            <B24Button
              label="Show Toast"
              :icon="NotificationIcon"
              @click="showToast"
            />
          </template>
        </B24Modal>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
