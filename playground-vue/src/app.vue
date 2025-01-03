<script setup lang="ts">
import usePageMeta from '../../playground/app/composables/usePageMeta'
import RightAlignIcon from '@bitrix24/b24icons-vue/editor/RightAlignIcon'
import LeftAlignIcon from '@bitrix24/b24icons-vue/editor/LeftAlignIcon'
import SunIcon from '@bitrix24/b24icons-vue/main/SunIcon'
import TmpMoon from '../../playground/app/components/TmpMoon.vue'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import { useColorMode, useTextDirection } from '@vueuse/core'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore included for compatibility with Nuxt playground
import { useAppConfig } from '#imports'

const appConfig = useAppConfig()
const mode = useColorMode()
const dir = useTextDirection()

appConfig.toaster = reactive({
  position: 'bottom-right' as const,
  expand: true,
  duration: 5000
})

const route = useRoute()
const router = useRouter()

const isCommandPaletteOpen = ref(false)

function onSelect(item: any) {
  router.push(item.to)
}

function toogleDir() {
  dir.value = dir.value === 'ltr' ? 'rtl' : 'ltr'
}

function toogleMode() {
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
  shift_arrowright: () => {
    dir.value = 'rtl'
  },
  shift_arrowleft: () => {
    dir.value = 'ltr'
  },
  shift_arrowup: () => {
    mode.value = 'light'
  },
  shift_arrowdown: () => {
    mode.value = 'dark'
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
                <div class="invisible md:visible flex flex-row flex-nowrap items-center justify-center gap-0.5">
                  <B24Kbd value="ctrl" size="sm" /> <B24Kbd value="arrowleft" size="sm" />
                </div>
              </div>
            </div>
            <div class="invisible md:visible flex flex-row flex-nowrap items-center justify-center gap-0.5">
              <B24Kbd value="ctrl" size="sm" /> <B24Kbd value="K" size="sm" />
            </div>
            <div
              v-for="(menuItem, menuIndex) in usePageMeta.menuList"
              :key="menuIndex"
              class="text-md font-light invisible md:visible"
            >
              <B24Link
                :href="menuItem.href"
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
        <div class="fixed z-50 top-20 right-4 flex items-center gap-2 rtl:flex-row-reverse">
          <B24Tooltip :content="{ side: 'left' }" :text="`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`" :kbds="['shift', mode === 'dark' ? 'arrowup' : 'arrowdown']">
            <B24Button
              :icon="mode === 'dark' ? TmpMoon : SunIcon"
              :aria-label="`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`"
              color="link"
              depth="normal"
              size="xs"
              @click="toogleMode"
            />
          </B24Tooltip>
          <B24Tooltip :content="{ side: 'left' }" :text="`Switch to ${dir === 'ltr' ? 'Right-to-left' : 'Left-to-right'} mode`" :kbds="['shift', dir === 'ltr' ? 'arrowright' : 'arrowleft']">
            <B24Button
              :icon="dir === 'ltr' ? LeftAlignIcon : RightAlignIcon"
              :aria-label="`Switch to ${dir === 'ltr' ? 'Right-to-left' : 'Left-to-right'} mode`"
              color="link"
              depth="normal"
              size="xs"
              @click="toogleDir"
            />
          </B24Tooltip>
        </div>
        <div class="py-14 px-3xl flex flex-col items-center justify-evenly overflow-y-auto w-full">
          <Suspense>
            <RouterView />
          </Suspense>
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

<style>
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";
</style>
