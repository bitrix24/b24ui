<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('Modal')

const LazyModalExample = defineAsyncComponent(() => import('../../components/ModalExample.vue'))

const open = ref(false)
const count = ref(0)

const modal = useModal()

function openModal() {
  count.value++

  modal.open(LazyModalExample, {
    description: 'And you can even provide a description!',
    count: count.value
  })
}
</script>

<template>
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="base" class="md:col-span-2">
      <ExampleCardSubTitle title="opening options" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Modal>
          <B24Button label="Custom" color="link" depth="dark" />

          <template #content>
            <Placeholder class="h-40 -m-4" />
          </template>
        </B24Modal>

        <B24Modal title="First modal">
          <B24Button color="link" depth="dark" label="Open with nested" />

          <template #footer>
            <B24Modal title="Second modal">
              <B24Button label="Open second" color="primary" />
            </B24Modal>
            <B24Button label="Cancel" color="link" :b24ui="{ base: 'ps-0 pe-0' }" />
          </template>
        </B24Modal>

        <B24Modal
          v-model:open="open"
          title="Modal with v-model"
          description="This can be useful to control the state of the modal yourself."
        />

        <B24Button label="Open with v-model" color="default" depth="light" @click="open = true" />

        <B24Button label="Open programmatically" color="link" depth="dark" @click="openModal" />
      </div>
      <ExampleCardSubTitle title="overlay" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Modal
          title="Modal without overlay"
          description="This modal has `overlay: false` prop."
          :overlay="false"
        >
          <B24Button label="Open without overlay" color="link" depth="dark" />
        </B24Modal>

        <B24Modal
          title="Modal without modal & overlay"
          description="This modal has `modal: false` and `overlay: false` to interact with outside content."
          :overlay="false"
          :modal="false"
        >
          <B24Button label="Open without modal" color="default" depth="light" />
        </B24Modal>
      </div>
      <ExampleCardSubTitle title="transition & portal & size" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Modal
          title="Modal without transition"
          description="This modal has `transition: false` prop."
          :transition="false"
        >
          <B24Button label="Open without transition" color="link" depth="dark" />
        </B24Modal>

        <B24Modal
          title="Modal without portal"
          description="This modal has `portal: false` prop."
          :portal="false"
        >
          <B24Button label="Open without portal" color="default" depth="light" />
        </B24Modal>

        <B24Modal
          title="Modal fullscreen"
          description="This modal has `fullscreen: true` prop."
          fullscreen
        >
          <B24Button label="Open fullscreen" color="link" depth="dark" />
        </B24Modal>
      </div>
      <ExampleCardSubTitle title="closing options" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Modal
          title="Modal prevent close"
          description="This modal has `dismissible: false` prop so it won't close when clicking outside."
          :dismissible="false"
        >
          <B24Button label="Open unclosable" color="default" depth="light" />
        </B24Modal>

        <B24Modal
          title="Modal without close button"
          description="This modal has `close: false` prop."
          :close="false"
        >
          <B24Button label="Open without close button" color="link" depth="dark" />
        </B24Modal>

        <B24Modal
          title="Modal with custom close button"
          description="The `close` prop inherits from the Button props."
          :close="{ color: 'danger', depth: 'dark', size: 'xs', rounded: true }"
          :b24ui="{ close: '-top-3 -end-3 ps-0 pe-0 p-0.5' }"
        >
          <B24Button label="Open with custom close button" color="default" depth="light" />
        </B24Modal>
      </div>
    </ExampleCard>

    <ExampleCard title="full" class="md:col-span-2">
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Modal
          title="Some title"
          description="Some description"
        >
          <B24Button label="Modal" color="link" depth="dark" />

          <template #body>
            Some content
          </template>
          <template #footer>
            <B24Button label="Ok" color="primary" />
            <B24Button label="Cancel" color="link" :b24ui="{ base: 'ps-0 pe-0' }" />
          </template>
        </B24Modal>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
