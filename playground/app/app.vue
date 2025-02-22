<script setup lang="ts">
import { useColorMode } from '#imports'
import { useTextDirection } from '@vueuse/core'
import usePageMeta from './composables/usePageMeta'
import RightAlignIcon from '@bitrix24/b24icons-vue/editor/RightAlignIcon'
import LeftAlignIcon from '@bitrix24/b24icons-vue/editor/LeftAlignIcon'
import SunIcon from '@bitrix24/b24icons-vue/main/SunIcon'
import MoonIcon from '@bitrix24/b24icons-vue/main/MoonIcon'

const route = useRoute()
const router = useRouter()
const appConfig = useAppConfig()
const colorMode = useColorMode()
const dir = useTextDirection()

useHead({
  title: 'Playground',
  bodyAttrs: {
    class: 'text-base-master dark:text-base-150 bg-base-50 dark:bg-base-dark font-b24-system antialiased'
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

// function onSelect(item: any) {
//   router.push(item.to)
// }

defineShortcuts({
  ctrl_k: () => {
    alert('@todo open CommandPaletteOpen')
    isCommandPaletteOpen.value = true
  },
  ctrl_arrowleft: () => {
    if (route.path === '/') {
      return
    }

    router.push('/')
  },
  shift_L: () => {
    dir.value = dir.value === 'rtl' ? 'ltr' : 'rtl'
  },
  shift_D: () => {
    colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light'
  }
})
</script>

<template>
  <template v-if="!route.path.startsWith('/__bitrix24_ui__')">
    <B24App :toaster="appConfig.toaster">
      <div class="flex flex-col">
        <div class="px-lg overflow-hidden">
          <div class="min-h-7xl h-7xl w-full flex flex-row items-center justify-normal gap-lg2 border-b border-b-base-master/10 dark:border-b-base-100/20">
            <div class="pl-xs2 text-4xl font-light font-b24-secondary text-base-master dark:text-base-100">
              {{ usePageMeta.getPageTitle() }}
            </div>
            <div class="pr-xs grow flex gap-4 flex-row items-center justify-end text-lg">
              <div v-if="route.path !== '/'" class="grow font-b24-primary">
                <div class="flex flex-row gap-1.5 items-center">
                  <div class="flex flex-col">
                    <div class="text-3xs leading-tight text-base-500/85 dark:text-base-500/85 items-center">
                      Playground
                    </div>
                    <div class="flex flex-row flex-nowrap items-center justify-center gap-1">
                      <B24Link
                        to="/"
                        is-action
                      >
                        <span>main page</span>
                      </B24Link>
                    </div>
                  </div>
                  <div class="hidden md:flex flex-row flex-nowrap items-center justify-center gap-0.5">
                    <B24Kbd value="ctrl" size="sm" /> <B24Kbd value="arrowleft" size="sm" />
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-1.5 rtl:flex-row-reverse">
                <ClientOnly v-if="!colorMode?.forced">
                  <B24Tooltip :content="{ side: 'left' }" :text="`Switch to ${isDark ? 'light' : 'dark'} mode`" :kbds="['shift', 'D']">
                    <B24Button
                      :icon="isDark ? MoonIcon : SunIcon"
                      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
                      color="link"
                      depth="normal"
                      size="xs"
                      @click="isDark = !isDark"
                    />
                  </B24Tooltip>
                  <B24Tooltip :content="{ side: 'left' }" :text="`Switch to ${isLtr ? 'Right-to-left' : 'Left-to-right'} mode`" :kbds="['shift', 'L']">
                    <B24Button
                      :icon="isLtr ? LeftAlignIcon : RightAlignIcon"
                      :aria-label="`Switch to ${isLtr ? 'Right-to-left' : 'Left-to-right'} mode`"
                      color="link"
                      depth="normal"
                      size="xs"
                      @click="isLtr = !isLtr"
                    />
                  </B24Tooltip>
                </ClientOnly>
                <div class="hidden mx-2 md:flex flex-row flex-nowrap items-center justify-center gap-0.5">
                  <B24Kbd value="ctrl" size="sm" /> <B24Kbd value="K" size="sm" />
                </div>
              </div>
              <div
                v-for="(menuItem, menuIndex) in usePageMeta.menuList"
                :key="menuIndex"
                class="text-md font-light hidden md:flex flex-row flex-nowrap items-center justify-center"
              >
                <B24Link
                  :href="menuItem.href"
                  target="_blank"
                  class="pr-2 whitespace-nowrap"
                >
                  {{ menuItem.title }}
                </B24Link>
              </div>
            </div>
          </div>
        </div>
        <div vaul-drawer-wrapper class="flex flex-col lg:flex-row h-[calc(100vh-4.1rem)] w-screen overflow-hidden min-h-0">
          <div class="py-14 px-3xl flex flex-col items-center justify-evenly overflow-y-auto w-full">
            <NuxtPage />
          </div>
        </div>
      </div>
      <B24Modal v-model:open="isCommandPaletteOpen" class="sm:h-96">
        <template #content>
          <!-- B24CommandPalette
            placeholder="Search a component..."
            :groups="usePageMeta.groups"
            :fuse="{ resultLimit: 100 }"
            @update:model-value="onSelect"
            @update:open="(value: boolean) => isCommandPaletteOpen = value"
          / -->
        </template>
      </B24Modal>
    </B24App>
  </template>
  <template v-else>
    <NuxtPage />
  </template>
</template>
