<script setup lang="ts">
import { useColorMode } from '#imports'
import { useTextDirection } from '@vueuse/core'
import usePageMeta from './composables/usePageMeta'
import RightAlignIcon from '@bitrix24/b24icons-vue/editor/RightAlignIcon'
import LeftAlignIcon from '@bitrix24/b24icons-vue/editor/LeftAlignIcon'
import SunIcon from '@bitrix24/b24icons-vue/main/SunIcon'
import MoonIcon from '@bitrix24/b24icons-vue/main/MoonIcon'
import ExpandIcon from '@bitrix24/b24icons-vue/main/ExpandIcon'
import HomeIcon from '@bitrix24/b24icons-vue/main/HomeIcon'

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
      <B24SidebarLayout
        :use-light-content="route.path !== '/'"
      >
        <template #sidebar>
          <B24SidebarHeader>
            <B24SidebarSection class="flex-row">
              <ClientOnly>
                <template v-if="!colorMode?.forced">
                  <B24Tooltip :content="{ side: 'right' }" :text="`Switch to ${isDark ? 'light' : 'dark'} mode`" :kbds="['shift', 'D']">
                    <B24Button
                      :icon="isDark ? MoonIcon : SunIcon"
                      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
                      color="link"
                      depth="normal"
                      size="xs"
                      @click="isDark = !isDark"
                    />
                  </B24Tooltip>
                </template>
                <B24Tooltip :content="{ side: 'right' }" :text="`Switch to ${isLtr ? 'Right-to-left' : 'Left-to-right'} mode`" :kbds="['shift', 'L']">
                  <B24Button
                    :icon="isLtr ? LeftAlignIcon : RightAlignIcon"
                    :aria-label="`Switch to ${isLtr ? 'Right-to-left' : 'Left-to-right'} mode`"
                    color="link"
                    depth="normal"
                    size="xs"
                    @click="isLtr = !isLtr"
                  />
                </B24Tooltip>

                <div class="hidden mx-2 lg:flex flex-row flex-nowrap items-center justify-center gap-0.5">
                  <B24Kbd value="ctrl" size="sm" /> <B24Kbd value="K" size="sm" />
                </div>
                <template #fallback>
                  <div class="h-[26px]" />
                </template>
              </ClientOnly>
            </B24SidebarSection>
            <ProseH3 class="pl-2 mt-3">
              Playground
            </ProseH3>
          </B24SidebarHeader>
          <B24SidebarBody>
            <B24SidebarSection
              v-for="(group) in usePageMeta.groups"
              :key="group.id"
              class="mb-md"
            >
              <B24SidebarHeading>{{ group.label }}</B24SidebarHeading>

              <template v-for="(item) in group.items" :key="item.id">
                <B24Link
                  :to="`/${group.id}/${item.id}`"
                  class="truncate mt-2 px-2"
                >
                  {{ item.label }}
                </B24Link>
              </template>
            </B24SidebarSection>
          </B24SidebarBody>
          <B24SidebarFooter>
            <B24SidebarSection>
              <div
                v-for="(menuItem, menuIndex) in usePageMeta.menuList"
                :key="menuIndex"
                class="mt-2 text-md font-light"
              >
                <B24Link
                  :href="menuItem.href"
                  target="_blank"
                  class="whitespace-nowrap flex flex-row flex-nowrap items-center justify-start gap-1 px-2"
                >
                  {{ menuItem.title }}

                  <ExpandIcon class="size-3" />
                </B24Link>
              </div>
            </B24SidebarSection>
          </B24SidebarFooter>
        </template>

        <template v-if="route.path !== '/'">
          <div class="flex flex-row items-center justify-start gap-1">
            <B24Tooltip :content="{ side: 'bottom', align: 'start' }" text="Go home" :kbds="['ctrl', 'arrowleft']">
              <B24Link to="/" class="whitespace-nowrap flex flex-row flex-nowrap items-center justify-start gap-1 truncate text-base-500">
                <HomeIcon class="size-5" /> Home
              </B24Link>
            </B24Tooltip>
            <span class=" text-base-500"> / </span>
            <ClientOnly>
              <ProseH1 class="font-bold">
                {{ usePageMeta.getPageTitle() }}
              </ProseH1>
            </ClientOnly>
          </div>
          <B24Separator class="mt-2 mb-4" />
        </template>

        <NuxtPage />
      </B24SidebarLayout>
      <B24Modal v-model:open="isCommandPaletteOpen" class="sm:h-96">
        <template #content>
          <ProseP>@todo open CommandPaletteOpen</ProseP>
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
