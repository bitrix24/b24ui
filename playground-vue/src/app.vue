<script setup lang="ts">
import usePageMeta from '../../playground/app/composables/usePageMeta'
import RightAlignIcon from '@bitrix24/b24icons-vue/editor/RightAlignIcon'
import LeftAlignIcon from '@bitrix24/b24icons-vue/editor/LeftAlignIcon'
import SunIcon from '@bitrix24/b24icons-vue/main/SunIcon'
import MoonIcon from '@bitrix24/b24icons-vue/main/MoonIcon'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import { useColorMode, useTextDirection } from '@vueuse/core'

const appConfig = useAppConfig()
const mode = useColorMode()
const dir = useTextDirection()

appConfig.toaster = reactive({
  position: 'top-right' as const,
  expand: true,
  duration: 8000
})

const route = useRoute()
const router = useRouter()

const isCommandPaletteOpen = ref(false)

// function onSelect(item: any) {
//   router.push(item.to)
// }

function toggleDir() {
  dir.value = dir.value === 'ltr' ? 'rtl' : 'ltr'
}

function toggleMode() {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}

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
    mode.value = mode.value === 'light' ? 'dark' : 'light'
  }
})
</script>

<template>
  <B24App :toaster="(appConfig.toaster as any)">
    <div class="flex flex-col">
      <div class="px-lg overflow-hidden">
        <div class="min-h-7xl h-7xl w-full flex flex-row items-center justify-normal gap-lg2 border-b border-b-base-master/10 dark:border-b-base-100/20">
          <div class="pl-xs2 text-4xl font-light font-b24-secondary text-base-master dark:text-base-100">
            <span class="text-base-600 dark:text-base-500">Vue::</span>{{ usePageMeta.getPageTitle() }}
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
              <B24Tooltip :content="{ side: 'left' }" :text="`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`" :kbds="['shift', 'D']">
                <B24Button
                  :icon="mode === 'dark' ? MoonIcon : SunIcon"
                  :aria-label="`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`"
                  color="link"
                  depth="normal"
                  size="xs"
                  @click="toggleMode"
                />
              </B24Tooltip>
              <B24Tooltip :content="{ side: 'left' }" :text="`Switch to ${dir === 'ltr' ? 'Right-to-left' : 'Left-to-right'} mode`" :kbds="['shift', 'L']">
                <B24Button
                  :icon="dir === 'ltr' ? LeftAlignIcon : RightAlignIcon"
                  :aria-label="`Switch to ${dir === 'ltr' ? 'Right-to-left' : 'Left-to-right'} mode`"
                  color="link"
                  depth="normal"
                  size="xs"
                  @click="toggleDir"
                />
              </B24Tooltip>
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
          <Suspense>
            <RouterView />
          </Suspense>
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
