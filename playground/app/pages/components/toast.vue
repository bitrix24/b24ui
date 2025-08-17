<script setup lang="ts">
import theme from '#build/b24ui/toaster'
import themeToast from '#build/b24ui/toast'
import usePageMeta from './../../composables/usePageMeta'
import { useAppConfig } from '#imports'
import B24SidebarLayout from '@bitrix24/b24ui-nuxt/components/SidebarLayout.vue'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import NotificationIcon from '@bitrix24/b24icons-vue/outline/NotificationIcon'

usePageMeta.setPageTitle('Toast')
const colors = Object.keys(themeToast.variants.color) as Array<keyof typeof themeToast.variants.color>
const positions = Object.keys(theme.variants.position)

const { toasts, add, update, remove } = useToast()
const appConfig = useAppConfig()

const count = ref(1)
const isShowProgress = ref(true)
const last = computed(() => toasts.value[toasts.value.length - 1])

const messageList: string[] = [
  '',
  'File report-for-february.docs successfully deleted. ',
  'File successfully deleted. '
]

function getRandomString<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex] as T
}

const templates = (id: number) => [
  {
    title: `Title for toast ${id}`,
    description: `${getRandomString(messageList)}Description for toast ${id}`,
    color: getRandomString(colors)
  },
  {
    class: 'context-light',
    title: `Title for albino toast ${id}`,
    description: `${getRandomString(messageList)}Description for toast ${id}`,
    color: getRandomString(colors)
  },
  {
    title: `Title for toast ${id}`
  },
  {
    description: `${getRandomString(messageList)}Description for toast ${id}`,
    color: getRandomString(colors)
  },
  {
    title: `Title for toast ${id}`,
    description: `${getRandomString(messageList)}Description for toast ${id}`,
    icon: RocketIcon,
    color: getRandomString(colors)
  },
  {
    title: `Title for toast ${id}`,
    icon: RocketIcon,
    color: getRandomString(colors)
  },
  {
    description: `${getRandomString(messageList)}Description for toast ${id}`,
    icon: RocketIcon,
    color: getRandomString(colors)
  },
  {
    title: `Title for toast ${id}`,
    description: `${getRandomString(messageList)}Description for toast ${id}`,
    avatar: {
      src: '/avatar/employee.png'
    },
    color: getRandomString(colors)
  },
  {
    title: `Title for toast ${id}`,
    description: `${getRandomString(messageList)}Description for toast ${id}`,
    color: getRandomString(colors),
    avatar: {
      src: '/avatar/assistant.png'
    },
    actions: [{
      label: 'Action 4',
      onClick: () => {
        console.log(`Toast ${id} action 4 clicked`)
      }
    }],
    orientation: 'horizontal' as const
  },
  {
    title: `Title for toast ${id}`,
    icon: RocketIcon,
    color: getRandomString(colors),
    actions: [
      {
        label: 'Trash',
        color: 'air-primary' as const,
        onClick: () => {
          console.log(`Toast ${id} action _Trash_ clicked`)
        }
      },
      {
        label: 'Cancel',
        color: 'air-tertiary-accent' as const,
        onClick: () => {
          console.log(`Toast ${id} action _Cancel_ clicked`)
        }
      }
    ]
  },
  {
    description: `File successfully deleted`,
    color: getRandomString(colors),
    icon: RocketIcon,
    actions: [{
      label: 'Cancel',
      color: 'air-tertiary-accent' as const,
      onClick: () => {
        console.log(`Toast ${id} action Cancel clicked`)
      }
    }],
    orientation: 'horizontal' as const
  }
]

function addToast() {
  const id = count.value++

  const template = templates(id)[Math.floor(Math.random() * templates(id).length)]

  add({
    id,
    ...template,
    progress: isShowProgress.value,
    onClick: (toast) => {
      console.log(`Toast ${toast.id} clicked`)
    }
  })
}

function updateToast() {
  if (!last.value) {
    return
  }

  update(last.value.id, {
    title: 'Toast updated',
    description: `This is the updated toast ${count.value++}`,
    progress: isShowProgress.value
  })
}

function removeToast() {
  if (!last.value) {
    return
  }

  remove(last.value.id)
}
</script>

<template>
  <div class="relative h-full rounded-t-[12px] overflow-hidden">
    <div class="absolute size-full rounded-t-[12px]">
      <B24SidebarLayout
        :use-light-content="false"
        is-inner
        off-content-scrollbar
        :b24ui="{
          root: [
            'context-edge-light',
            'context-edge-light:[--air-theme-bg-color:#eef2f4]',
            'context-edge-light:[--air-theme-bg-size:240px_240px]',
            'context-edge-light:[--air-theme-bg-repeat:repeat]',
            'context-edge-light:[--air-theme-bg-position:0_0]',
            'context-edge-light:[--air-theme-bg-attachment:fixed]',
            'context-edge-light:[--air-theme-bg-image:url(/bg/edge-light-v1.svg)]',
            'context-edge-light:[--air-theme-bg-image-blurred:url(/bg/edge-light-v1-blurred.webp)]'
          ].join(' '),
          contentWrapper: [
            'bg-[url(/bg/pattern-1.png)] bg-cover bg-center bg-fixed bg-no-repeat bg-[#799fe1]/10 context-dark:bg-[#799fe1]',
            'p-0 px-0 ps-0 pe-0 lg:p-0 lg:px-0 lg:ps-0 lg:pe-0 '
          ].join(' '),
          containerWrapper: 'h-full relative',
          containerWrapperInner: 'flex flex-col items-center justify-center'
        }"
      >
        <template #sidebar>
          <B24SidebarHeader>
            <div class="text-[#f8f7f7] h-full flex items-center relative my-0 ps-[25px] pe-xs rtl:pe-[25px]">
              <ProseH6 class="font-medium mb-0">
                Settings
              </ProseH6>
            </div>
          </B24SidebarHeader>
          <B24SidebarBody>
            <div class="space-y-6 px-[25px]">
              <B24RadioGroup v-model="appConfig.toaster.position" legend="Position" :items="positions" />
              <B24Switch v-model="appConfig.toaster.expand" label="Expand" class="mt-1" />
              <B24Switch v-model="isShowProgress" label="isShowProgress" class="mt-1" />
              <B24FormField
                label="Duration"
                :hint="`${appConfig.toaster.duration} ms.`"
                name="duration"
              >
                <B24Range
                  v-model="appConfig.toaster.duration"
                  aria-label="Duration"
                  :min="1000"
                  :max="50000"
                  :step="500"
                />
              </B24FormField>
            </div>
          </B24SidebarBody>
        </template>
        <template #navbar>
          <ProseH4 class="font-medium mb-0">
            Toast
          </ProseH4>
          <B24NavbarSpacer />
        </template>
        <template #default>
          <div
            class="text-(--ui-color-design-filled-market-content) max-w-[550px] mx-(--content-area-shift) px-[60px] py-[40px] rounded-[24px] bg-[#525c69]/20 flex flex-col items-center justify-center gap-[20px]"
          >
            <B24Avatar
              :icon="NotificationIcon"
              alt="Toast"
              size="3xl"
              :b24ui="{
                root: 'bg-transparent ring-2 ring-(--ui-color-design-filled-market-content)/50',
                icon: 'size-[74px] text-(--ui-color-design-filled-market-content)'
              }"
            />
            <ProseH2 class="text-center text-(--ui-color-design-filled-market-content) leading-[29px] mb-0">
              A short message to offer information or feedback to the user
            </ProseH2>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-[15px]">
              <B24Button label="Add" color="air-primary" @click="addToast" />
              <B24Button label="Update" color="air-secondary" :disabled="!last" @click="updateToast" />
              <B24Button label="Remove" color="air-secondary-alert" :disabled="!last" @click="removeToast" />
            </div>
          </div>
        </template>
      </B24SidebarLayout>
    </div>
  </div>
</template>
