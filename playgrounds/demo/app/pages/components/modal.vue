<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import ArrowRightLIcon from '@bitrix24/b24icons-vue/outline/ArrowRightLIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/main/CircleCheckIcon'
import MockContentLongString from '../../components/MockContentLongString.vue'
import MockContentLongText from '../../components/MockContentLongText.vue'
import MockContentUploadFile from '../../components/MockContentUploadFile.vue'

const LazyModalExample = defineAsyncComponent(() => import('../../components/ModalExample.vue'))

const proBenefits: NavigationMenuItem[] = [
  { label: 'Unlimited monitored lines', icon: CircleCheckIcon },
  { label: 'AI defect detection on camera streams', icon: CircleCheckIcon }
]

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
      <B24Switch v-model="attrs.overlay" label="Overlay" size="xs" />
      <B24Switch v-model="attrs.modal" label="Modal" size="xs" />
      <B24Switch v-model="attrs.transition" label="Transition" size="xs" />
      <B24Switch v-model="attrs.close" label="Close" size="xs" />
      <B24Switch v-model="attrs.portal" label="Portal" size="xs" />
      <B24Switch v-model="attrs.fullscreen" label="Fullscreen" size="xs" />
    </template>

    <B24Modal title="First modal" v-bind="attrs">
      <B24Button label="Open with nested" />

      <template #footer>
        <B24Modal v-bind="attrs" :close="false">
          <B24Button label="Open second" color="air-primary" />
          <template #body>
            <ProseH2 class="mt-4">
              Second modal
            </ProseH2>
          </template>
          <template #footer>
            <B24ModalDialogClose>
              <B24Button label="Cancel" color="air-tertiary" />
            </B24ModalDialogClose>
          </template>
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

    <B24Modal
      title=""
      description=""
      scrollable
      :b24ui="{
        content: 'sm:max-w-[788px] bg-[radial-gradient(110.42%_110.42%_at_-10.42%_31.25%,var(--ui-color-design-filled-boost-bg-gradient-1)_0%,var(--ui-color-design-filled-boost-bg-gradient-2)_58.65%,var(--ui-color-design-filled-boost-bg-gradient-3)_100%)]',
        body: 'relative p-6 md:p-8'
      }"
      v-bind="{ ...attrs, close: false }"
    >
      <B24Button label="Open marketing modal" color="air-secondary-accent" />

      <template #body>
        <div class="flex flex-col md:flex-row gap-6 min-h-full">
          <div class="flex-1 flex flex-col gap-3 text-white">
            <h2 class="text-2xl font-semibold leading-snug">
              Keep your factory floor moving — your Pro trial ends in 6 days
            </h2>
            <p class="text-white/85">
              Pro unlocks real-time OEE across every line, 90 days of historical
              analytics, AI defect detection on camera streams and predictive
              maintenance alerts. Teams on Pro ship 12% more units per shift on
              average.
            </p>
            <B24Link to="#" class="inline-flex text-white underline">
              Compare plans
            </B24Link>

            <div class="flex flex-wrap items-center gap-2 mt-auto pt-4">
              <B24Button
                label="Upgrade to Pro"
                color="air-primary"
                size="lg"
                :trailing-icon="ArrowRightLIcon"
              />
              <B24ModalDialogClose>
                <B24Button label="Remind me later" color="air-tertiary-accent" />
              </B24ModalDialogClose>
            </div>
          </div>

          <div class="md:w-80 shrink-0">
            <B24Card
              variant="tinted-no-accent"
              :b24ui="{
                header: 'flex items-center justify-between gap-2',
                body: 'space-y-4'
              }"
            >
              <template #header>
                <span class="font-semibold whitespace-nowrap">Production Insights · Pro</span>
                <B24Badge label="Recommended" color="air-primary" size="xs" class="shrink-0" />
              </template>

              <div>
                <div class="text-3xl font-semibold leading-none">
                  +12%
                </div>
                <div class="text-sm text-description mt-1">
                  average throughput uplift after upgrade
                </div>
              </div>

              <div class="space-y-1">
                <B24Progress :model-value="24" :max="30" color="air-primary" size="sm" />
                <div class="text-xs text-description">
                  Trial used — 24 of 30 days
                </div>
              </div>

              <B24NavigationMenu
                orientation="vertical"
                :items="proBenefits"
                :b24ui="{ link: 'px-2 py-1.5', linkLeadingIcon: 'text-primary' }"
              />
            </B24Card>
          </div>
        </div>
      </template>
    </B24Modal>

    <B24Modal
      title=""
      description=""
      :b24ui="{
        content: 'sm:max-w-md bg-transparent shadow-none border-0',
        body: 'p-0'
      }"
      v-bind="{ ...attrs, close: false }"
    >
      <B24Button label="Open sales widget" color="air-secondary-accent" />

      <template #body>
        <SalesDynamicsWidget
          title="Repeat sales dynamics"
          total-line="Total deals created: 10"
          today-line="Today: 10 deals"
          range-label="Last 30 days"
          :rows="[
            { label: 'Active deals', count: 10, amount: '$46,500' },
            { label: 'Won deals', count: 1, amount: '$10,000' }
          ]"
          :highlight="{
            label: 'Conversion',
            count: '10%',
            amount: '17.7%',
            info: 'Today vs. last 30 days'
          }"
        />
      </template>
    </B24Modal>
  </PlaygroundPage>
</template>
