<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import MockContentLongString from '../../components/MockContentLongString.vue'
import MockContentLongText from '../../components/MockContentLongText.vue'
import MockContentUploadFile from '../../components/MockContentUploadFile.vue'

const LazyModalExample = defineAsyncComponent(() => import('../../components/ModalExample.vue'))

const attrs = reactive({
  overlay: true,
  modal: true,
  transition: true,
  close: true,
  portal: true,
  fullscreen: false
})

const open = ref(false)
const count = ref(0)
const overlay = useOverlay()

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
</script>

<template>
  <PlaygroundPage :b24ui="{ body: 'flex-col gap-2 max-w-100 mx-auto' }">
    <template #controls>
      <B24Switch v-model="attrs.overlay" label="Overlay" />
      <B24Switch v-model="attrs.modal" label="Modal" />
      <B24Switch v-model="attrs.transition" label="Transition" />
      <B24Switch v-model="attrs.close" label="Close" />
      <B24Switch v-model="attrs.portal" label="Portal" />
      <B24Switch v-model="attrs.fullscreen" label="Fullscreen" />
    </template>

    <B24Modal title="First modal" v-bind="attrs">
      <B24Button label="Open with nested" />

      <template #footer>
        <B24Modal title="Second modal" v-bind="attrs">
          <B24Button label="Open second" color="air-primary" />
        </B24Modal>
      </template>
    </B24Modal>

    <B24Modal
      v-model:open="open"
      title="Modal with v-model"
      description="This can be useful to control the state of the modal yourself."
      v-bind="attrs"
    >
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
    <B24Button label="Open with v-model" color="air-secondary-accent" @click="open = true" />

    <B24Modal
      title="Modal without overlay blur"
      description="This modal has `overlay-blur: off` prop."
      overlay-blur="off"
      v-bind="attrs"
    >
      <B24Button label="Open without overlay blur" />
    </B24Modal>

    <B24Modal
      title="This modal has long text"
      v-bind="attrs"
    >
      <B24Button label="With long text" color="air-secondary-accent" />

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
      title="Modal scrollable"
      description="This modal has `scrollable: true` prop. Content scrolls within the overlay, preventing accidental closes on scrollbar clicks."
      v-bind="attrs"
      scrollable
    >
      <B24Button label="Long text with scrollable" />

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
      description="This modal has `dismissible: false` prop so it won't close when clicking outside."
      :b24ui="{ footer: 'border-t-0 pt-0' }"
      v-bind="{ ...attrs, dismissible: false, modal: false, overlay: false }"
    >
      <B24Button label="Modal prevent close" color="air-secondary-accent" />

      <template #body>
        <MockContentUploadFile />
      </template>
      <template #footer>
        <div class="flex flex-row gap-xs2">
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

    <B24Modal
      title="Modal with custom close button"
      description="The `close` prop inherits from the Button props."
      v-bind="attrs"
      :close="{ color: 'air-boost', size: 'xs' }"
      :ui="{ close: 'top-3.5 rounded-full' }"
    >
      <B24Button label="Open with custom close button" />
    </B24Modal>

    <B24Button label="Open programmatically" color="air-secondary-accent" @click="openModal" />
  </PlaygroundPage>
</template>
