<script setup lang="ts">
import theme from '#build/b24ui/toaster'
import themeToast from '#build/b24ui/toast'
import { useAppConfig } from '#imports'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import NotificationIcon from '@bitrix24/b24icons-vue/outline/NotificationIcon'

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
    class: 'light',
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
      src: '/b24ui/demo/avatar/employee.png'
    },
    color: getRandomString(colors)
  },
  {
    title: `Title for toast ${id}`,
    description: `${getRandomString(messageList)}Description for toast ${id}`,
    color: getRandomString(colors),
    avatar: {
      src: '/b24ui/demo/avatar/assistant.png'
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
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="appConfig.toaster.position" placeholder="Position" :items="positions" />
      <B24FormField
        label="Duration"
        :hint="`${appConfig.toaster.duration} ms.`"
        name="duration"
        class="min-w-32"
      >
        <B24Range
          v-model="appConfig.toaster.duration"
          aria-label="Duration"
          :min="1000"
          :max="50000"
          :step="500"
        />
      </B24FormField>
      <B24Input v-model="appConfig.toaster.max" placeholder="Max" type="number" class="min-w-24 w-24" />

      <B24Switch v-model="appConfig.toaster.disableSwipe" label="DisableSwipe" />
      <B24Switch v-model="appConfig.toaster.expand" label="Expand" />
      <B24Switch v-model="isShowProgress" label="isShowProgress" />
    </template>

    <div
      class="max-w-[550px] mx-auto px-[60px] py-5xl rounded-[24px] flex flex-col items-center justify-center gap-lg"
    >
      <B24Avatar
        :icon="NotificationIcon"
        alt="Toast"
        size="3xl"
        :b24ui="{
          root: 'bg-transparent',
          icon: 'size-[74px]'
        }"
      />
      <ProseH2 class="text-center leading-[29px] mb-0">
        A short message to offer information or feedback to the user
      </ProseH2>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-[15px]">
        <B24Button label="Add" color="air-primary" @click="addToast" />
        <B24Button label="Update" color="air-secondary" :disabled="!last" @click="updateToast" />
        <B24Button label="Remove" color="air-secondary-alert" :disabled="!last" @click="removeToast" />
      </div>
    </div>
  </PlaygroundPage>
</template>
