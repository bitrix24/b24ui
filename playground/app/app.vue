<script setup lang="ts">
import { useColorMode } from '#imports'
import { useTextDirection } from '@vueuse/core'
import usePageMeta from './composables/usePageMeta'
import Clock2Icon from '@bitrix24/b24icons-vue/main/Clock2Icon'
import ClockFillIcon from '@bitrix24/b24icons-vue/main/ClockFillIcon'
import RightAlignIcon from '@bitrix24/b24icons-vue/editor/RightAlignIcon'
import LeftAlignIcon from '@bitrix24/b24icons-vue/editor/LeftAlignIcon'

const route = useRoute()
const router = useRouter()
const appConfig = useAppConfig()
const colorMode = useColorMode()
const dir = useTextDirection()

useHead({
  title: 'Playground',
  bodyAttrs: {
    class: 'bg-tertiary dark:bg-base-dark font-b24-system text-base-900 antialiased'
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

const isLtr = computed({
  get() {
    return dir.value === 'ltr'
  },
  set() {
    dir.value = dir.value === 'rtl' ? 'ltr' : 'rtl'
  }
})

const isCommandPaletteOpen = ref(false)

function onSelect(item: any) {
  router.push(item.to)
}

defineShortcuts({
  meta_k: () => isCommandPaletteOpen.value = true
})
</script>

<template>
  <template v-if="!route.path.startsWith('/__bitrix24_ui__')">
    <B24App :toaster="appConfig.toaster">
      <div class="flex flex-col">
        <div class="px-lg overflow-hidden">
          <div class="min-h-7xl h-7xl w-full flex flex-row items-center justify-normal gap-lg2 border-b border-b-base-200 dark:border-b-base-900">
            <div class="pl-xs2 text-4xl font-light font-b24-secondary text-base-master dark:text-base-100">
              {{ usePageMeta.getPageTitle() }}
            </div>
            <div class="pr-xs grow flex gap-4 flex-row items-center justify-end text-lg">
              <div v-if="route.path !== '/'" class="grow font-b24-primary">
                <div class="flex flex-row gap-2xs items-end">
                  <div class="flex flex-col">
                    <div class="text-3xs leading-tight opacity-70 text-base-500 dark:text-base-700 items-center">
                      Playground
                    </div>
                    <B24Link
                      to="/"
                      class="text-sm text-primary-link hover:opacity-80 border-b border-dashed border-b-primary-link dark:text-base-700 dark:border-b-base-700 dark:hover:text-info-background-on! dark:hover:border-b-info-background-on"
                    >
                      main page
                    </B24Link>
                  </div>
                </div>
              </div>
              <div
                v-for="(menuItem, menuIndex) in usePageMeta.menuList"
                :key="menuIndex"
                class="text-md font-light"
              >
                <B24Link
                  :to="menuItem.href"
                  target="_blank"
                  class="pr-2 whitespace-nowrap hover:underline underline-offset-2 dark:text-base-700"
                >
                  {{ menuItem.title }}
                </B24Link>
              </div>
            </div>
          </div>
        </div>
        <div vaul-drawer-wrapper class="flex flex-col lg:flex-row h-[calc(100vh-4.1rem)] w-screen overflow-hidden min-h-0">
          <div class="fixed z-50 top-20 right-4 flex items-center gap-2 rtl:flex-row-reverse">
            <ClientOnly v-if="!colorMode?.forced">
              <B24Button
                :icon="isDark ? ClockFillIcon : Clock2Icon"
                :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
                color="link"
                depth="light"
                size="xs"
                @click="isDark = !isDark"
              />
              <B24Button
                :icon="isLtr ? LeftAlignIcon : RightAlignIcon"
                :aria-label="`Switch to ${isLtr ? 'Right-to-left' : 'Left-to-right'} mode`"
                color="link"
                depth="light"
                size="xs"
                @click="isLtr = !isLtr"
              />
            </ClientOnly>
          </div>
          <div class="py-14 px-3xl flex flex-col items-center justify-evenly overflow-y-auto w-full">
            <NuxtPage />
            <div v-if="route.path === '/'" class="w-full">
              <div
                v-for="(group) in usePageMeta.groups"
                :key="group.id"
                class="mb-md"
              >
                <div class="mb-sm font-b24-secondary text-h4 font-light leading-8 text-base-900 dark:text-base-200">
                  {{ group.label }}
                </div>
                <div class="grid grid-cols-[repeat(auto-fill,minmax(266px,1fr))] gap-y-sm gap-x-xs">
                  <B24Link
                    v-for="(item) in group.items"
                    :key="item.id"
                    class="bg-white dark:bg-white/10 py-sm2 px-xs2 cursor-pointer rounded-md flex flex-row gap-sm border-2 transition-shadow shadow hover:shadow-lg relative border-white dark:border-white/10 hover:border-primary"
                    :to="`/${group.id}/${item.id}`"
                  >
                    <B24Avatar
                      :icon="item.icon"
                      size="2xl"
                    />
                    <div class="max-w-11/12">
                      <div class="font-b24-secondary text-black dark:text-base-150 text-h6 leading-4 mb-xs font-semibold line-clamp-2">
                        {{ item.label }}
                      </div>
                      <div
                        class="font-b24-primary text-sm text-base-500 line-clamp-2"
                        :title="item.description"
                      >
                        <div>{{ item.description }}</div>
                      </div>
                    </div>
                  </B24Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <B24Modal v-model:open="isCommandPaletteOpen" class="sm:h-96">
        <template #content>
          <B24CommandPalette
            placeholder="Search a component..."
            :groups="usePageMeta.groups"
            :fuse="{ resultLimit: 100 }"
            @update:model-value="onSelect"
            @update:open="(value: boolean) => isCommandPaletteOpen = value"
          />
        </template>
      </B24Modal>
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
