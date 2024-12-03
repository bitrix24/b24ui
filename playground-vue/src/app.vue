<script setup lang="ts">
import usePageMeta from '../../playground/app/composables/usePageMeta'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import { useColorMode } from '@vueuse/core'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore included for compatibility with Nuxt playground
import { useAppConfig } from '#imports'

const appConfig = useAppConfig()
const mode = useColorMode()

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

defineShortcuts({
  meta_k: () => isCommandPaletteOpen.value = true
})
</script>

<template>
  <B24App :toaster="(appConfig.toaster as any)">
    <div class="flex flex-col">
      <div class="px-lg">
        <div class="min-h-7xl h-7xl w-full flex flex-row items-center justify-normal gap-lg2 border-b border-b-base-200">
          <div class="pl-xs2 text-4xl font-light font-b24-secondary text-base-master">
            <span class="text-base-600">Vue::</span>{{ usePageMeta.getPageTitle() }}
          </div>
          <div class="pr-xs2 grow flex gap-4 flex-row items-center justify-end text-lg">
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
          <B24Button
            :icon="mode === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
            color="neutral"
            variant="ghost"
            :aria-label="`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`"
            @click="mode = mode === 'dark' ? 'light' : 'dark'"
          />
        </div>
        <div class="flex-1 flex flex-col items-center justify-evenly overflow-y-auto w-full py-14 px-4">
          <Suspense>
            <RouterView />
          </Suspense>
          <div v-if="route.path === '/'" class="w-full">
            <div
              v-for="(group) in usePageMeta.groups"
              :key="group.id"
              class="mb-md"
            >
              <div class="mb-sm font-b24-secondary text-h4 font-light leading-8 text-base-900">
                {{ group.label }}
              </div>
              <div class="grid grid-cols-[repeat(auto-fill,minmax(266px,1fr))] gap-y-sm gap-x-xs">
                <B24Link
                  v-for="(item) in group.items"
                  :key="item.id"
                  class="bg-white py-sm2 px-xs2 cursor-pointer rounded-md flex flex-row gap-sm border-2 transition-shadow shadow hover:shadow-lg relative border-white hover:border-primary"
                  :to="`/${group.id}/${item.id}`"
                >
                  <div class="rounded-full bg-blue-200 size-14 min-w-14 min-h-14 flex items-center justify-center">
                    <component
                      :is="item.icon"
                      class="size-12 text-info-text"
                    />
                  </div>
                  <div class="max-w-11/12">
                    <div
                      class="font-b24-secondary text-black text-h6 leading-4 mb-xs font-semibold line-clamp-2"
                    >
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

<style>
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";
</style>
