<script setup lang="ts">
import { splitByCase, upperFirst } from 'scule'
import { useColorMode } from '#imports'

import CheckIcon from '@bitrix24/b24icons-vue/main/CheckIcon'
import ItemIcon from '@bitrix24/b24icons-vue/crm/ItemIcon'

const route = useRoute()
const router = useRouter()
const appConfig = useAppConfig()
const colorMode = useColorMode()

useHead({
  bodyAttrs: {
    class: 'bg-tertiary font-b24-system text-base-900 antialiased'
  }
})

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const components = [
  'link',
  'skeleton'
]

const items = components.map(component => ({ label: upperName(component), to: `/components/${component}` }))

function upperName(name: string) {
  return splitByCase(name).map(p => upperFirst(p)).join('')
}

const isCommandPaletteOpen = ref(false)

function onSelect(item: any) {
  router.push(item.to)
}

defineShortcuts({
  meta_k: () => isCommandPaletteOpen.value = true
})

interface MenuItem {
  title: string
  href: string
}

const menuList: Ref<MenuItem[]> = ref([
  {
    title: 'API Docs',
    href: 'https://apidocs.bitrix24.com'
  },
  {
    title: '@bitrix24/b24jssdk',
    href: 'https://bitrix24.github.io/b24jssdk/'
  },
  {
    title: '@bitrix24/b24style',
    href: 'https://bitrix24.github.io/b24style/'
  },
  {
    title: '@bitrix24/b24icons',
    href: 'https://bitrix24.github.io/b24icons/'
  }
])

interface Item {
  code: string
  icon: any
  title: string
  description: string
  isActive: boolean
}

interface Group {
  code: string
  title: string
  items: Item[]
}

const groups: Ref<Group[]> = ref([
  {
    code: `components`,
    title: 'Components',
    items: [
      {
        code: 'link',
        icon: ItemIcon,
        title: 'Link',
        description: '@todo Link',
        isActive: false
      },
      {
        code: 'skeleton',
        icon: ItemIcon,
        title: 'Skeleton',
        description: '@todo Skeleton',
        isActive: false
      }
    ]
  } as Group
])
</script>

<template>
  <template v-if="!$route.path.startsWith('/__bitrix24_ui__')">
    <B24App :toaster="appConfig.toaster">
      <div class="flex flex-col">
        <div class="px-lg">
          <div class="min-h-7xl h-7xl w-full flex flex-row items-center justify-normal gap-lg2 border-b border-b-base-200">
            <div class="pl-xs2 text-4xl font-light font-b24-secondary text-base-master">
              {{ route.meta.title }}
            </div>
            <div class="pr-xs2 grow flex gap-4 flex-row items-end justify-end text-lg">
              <div v-if="route.path !== '/'" class="grow font-b24-primary">
                <div class="flex flex-row gap-2xs items-end">
                  <div class="flex flex-col">
                    <div class="text-3xs leading-tight opacity-70 text-base-500 items-center">
                      Playground
                    </div>
                    <B24Link
                      to="/"
                      class="text-sm text-primary-link hover:opacity-80 border-b border-dashed border-b-primary-link"
                    >
                      list actions
                    </B24Link>
                  </div>
                </div>
              </div>
              <div
                v-for="(menuItem, menuIndex) in menuList"
                :key="menuIndex"
                class="text-md font-light"
              >
                <B24Link
                  :to="menuItem.href"
                  target="_blank"
                  class="pr-2 whitespace-nowrap hover:underline underline-offset-2"
                >
                  {{ menuItem.title }}
                </B24Link>
              </div>
            </div>
          </div>
        </div>
        <div vaul-drawer-wrapper class="flex flex-col lg:flex-row h-[calc(100vh-4.1rem)] w-screen overflow-hidden min-h-0">
          <div class="fixed top-15 lg:top-3 right-4 flex items-center gap-2">
            <ClientOnly v-if="!colorMode?.forced">
              <B24Button
                :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
                color="neutral"
                variant="ghost"
                :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
                @click="isDark = !isDark"
              />

              <template #fallback>
                <div class="size-8" />
              </template>
            </ClientOnly>
          </div>

          <div class="flex-1 flex flex-col items-center justify-evenly overflow-y-auto w-full py-14 px-4">
            <NuxtPage />
            <div v-if="route.path === '/'" class="w-full">
              <div
                v-for="(group) in groups"
                :key="group.code"
                class="mb-md"
              >
                <div class="mb-sm font-b24-secondary text-h4 font-light leading-8 text-base-900">
                  {{ group.title }}
                </div>
                <div class="grid grid-cols-[repeat(auto-fill,minmax(266px,1fr))] gap-y-sm gap-x-xs">
                  <NuxtLink
                    v-for="(item) in group.items"
                    :key="item.code"
                    class="bg-white py-sm2 px-xs2 cursor-pointer rounded-md flex flex-row gap-sm border-2 transition-shadow shadow hover:shadow-lg relative"
                    :class="item.isActive ? 'border-success-text' : 'border-white hover:border-primary'"
                    :to="`/${group.code}/${item.code}`"
                  >
                    <div
                      v-if="item.isActive"
                      class="absolute -top-2 -right-2 rounded-full bg-success-text size-5 text-success-on flex items-center justify-center"
                    >
                      <CheckIcon class="size-md" />
                    </div>
                    <div class="rounded-full bg-blue-200 size-14 min-w-14 min-h-14 flex items-center justify-center">
                      <component
                        :is="item.icon"
                        class="size-12 text-info-text"
                      />
                    </div>
                    <div class="max-w-11/12">
                      <div
                        class="font-b24-secondary text-black text-h6 leading-4 mb-xs font-semibold line-clamp-2"
                        :title="item.title"
                      >{{ item.title }}</div>
                      <div
                        class="font-b24-primary text-sm text-base-500 line-clamp-2"
                        :title="item.description"
                      >
                        <div>{{ item.description }}</div>
                      </div>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <B24Modal v-model:open="isCommandPaletteOpen" class="sm:h-96">
            <template #content>
              <B24CommandPalette placeholder="Search a component..." :groups="[{ id: 'items', items }]" :fuse="{ resultLimit: 100 }" @update:model-value="onSelect" @update:open="(value: boolean) => isCommandPaletteOpen = value" />
            </template>
          </B24Modal>
        </div>
      </div>
    </B24App>
  </template>
  <template v-else>
    <NuxtPage />
  </template>
</template>

<style>
@import "tailwindcss";

@import "@bitrix24/b24ui-nuxt";
</style>
