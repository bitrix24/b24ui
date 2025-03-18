<script setup lang="ts">
import usePageMeta from '../../playground/app/composables/usePageMeta'
import RightAlignIcon from '@bitrix24/b24icons-vue/editor/RightAlignIcon'
import LeftAlignIcon from '@bitrix24/b24icons-vue/editor/LeftAlignIcon'
import SunIcon from '@bitrix24/b24icons-vue/main/SunIcon'
import MoonIcon from '@bitrix24/b24icons-vue/main/MoonIcon'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import { useColorMode, useTextDirection } from '@vueuse/core'
import ExpandIcon from '@bitrix24/b24icons-vue/main/ExpandIcon'
import HomeIcon from '@bitrix24/b24icons-vue/main/HomeIcon'

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
    <B24SidebarLayout
      :use-light-content="route.path !== '/'"
    >
      <template #sidebar>
        <B24SidebarHeader>
          <ProseH3 class="pl-2 mb-4">
            Vue::Playground
          </ProseH3>
          <B24SidebarSection class="flex-row">
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
            <div class="hidden mx-2 lg:flex flex-row flex-nowrap items-center justify-center gap-0.5">
              <B24Kbd value="ctrl" size="sm" /> <B24Kbd value="K" size="sm" />
            </div>
          </B24SidebarSection>
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
          <span class="text-base-500"> / </span>
          <ProseH1 class="font-bold">
            {{ usePageMeta.getPageTitle() }}
          </ProseH1>
        </div>
        <B24Separator class="mt-2 mb-4" />
      </template>

      <Suspense>
        <RouterView />
      </Suspense>
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
