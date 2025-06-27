<script setup lang="ts">
import theme from '#build/b24ui/toaster'
import themeToast from '#build/b24ui/toast'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import { useAppConfig } from '#imports'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

usePageMeta.setPageTitle('Toast')
const colors = Object.keys(themeToast.variants.color) as Array<keyof typeof themeToast.variants.color>
const positions = Object.keys(theme.variants.position)

const { toasts, add, update, remove } = useToast()
const appConfig = useAppConfig()

const count = ref(1)
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
        color: 'primary' as const,
        onClick: () => {
          console.log(`Toast ${id} action _Trash_ clicked`)
        }
      },
      {
        label: 'Cancel',
        color: 'default' as const,
        depth: 'dark' as const,
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
      color: 'link' as const,
      depth: 'normal' as const,
      class: 'text-blue-500 hover:text-blue-400 active:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 dark:active:text-blue-500 ' as const,
      normalCase: true,
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
    description: `This is the updated toast ${count.value++}`
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
  <ExampleGrid v-once>
    <ExampleCard title="settings">
      <B24Separator class="my-3" type="dotted" />
      <div class="space-y-6 mb-3">
        <B24RadioGroup v-model="appConfig.toaster.position" legend="Position" :items="positions" />
        <B24Switch v-model="appConfig.toaster.expand" label="Expand" class="mt-1" />
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
    </ExampleCard>
    <ExampleCard title="actions">
      <B24Separator class="my-3" type="dotted" />
      <div class="mt-3 flex flex-rows items-center justify-start gap-2">
        <B24Button label="Add" color="primary" @click="addToast" />
        <B24Button label="Update" color="secondary" :disabled="!last" @click="updateToast" />
        <B24Button label="Remove" :disabled="!last" @click="removeToast" />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
