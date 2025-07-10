<script setup lang="ts">
import usePageMeta from '../../playground/app/composables/usePageMeta'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, computed } from 'vue'
import { useColorMode, useTextDirection } from '@vueuse/core'
import HomeIcon from '@bitrix24/b24icons-vue/main/HomeIcon'
import RightAlignIcon from '@bitrix24/b24icons-vue/editor/RightAlignIcon'
import LeftAlignIcon from '@bitrix24/b24icons-vue/editor/LeftAlignIcon'
import SunIcon from '@bitrix24/b24icons-vue/main/SunIcon'
import SunIconAir from '@bitrix24/b24icons-vue/outline/SunIcon'
import MoonIcon from '@bitrix24/b24icons-vue/main/MoonIcon'
import MoonIconAir from '@bitrix24/b24icons-vue/outline/MoonIcon'
import OpenIn50Icon from '@bitrix24/b24icons-vue/actions/OpenIn50Icon'
import type { DropdownMenuItem } from '@bitrix24/b24ui-nuxt'

const appConfig = useAppConfig()
const mode = useColorMode<'light' | 'dark' | 'edgeLight' | 'edgeDark'>({
  attribute: 'class',
  modes: {
    light: 'light --ui-context-content-light',
    dark: 'dark --ui-context-content-dark',
    edgeLight: 'edge-light --ui-context-edge-light',
    edgeDark: 'edge-dark --ui-context-edge-dark'
  }
})
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

const itemsForColorMode: DropdownMenuItem[] = [
  {
    label: 'dark',
    code: 'dark',
    isDark: true,
    icon: MoonIcon,
    onSelect() {
      mode.value = 'dark'
    }
  },
  {
    label: 'light',
    code: 'light',
    isDark: false,
    icon: SunIcon,
    onSelect() {
      mode.value = 'light'
    }
  },
  {
    label: 'edge-dark',
    code: 'edgeDark',
    isDark: false,
    icon: MoonIconAir,
    onSelect() {
      mode.value = 'edgeDark'
    }
  },
  {
    label: 'edge-lark',
    code: 'edgeLight',
    isDark: false,
    icon: SunIconAir,
    onSelect() {
      mode.value = 'edgeLight'
    }
  }
]

function toggleMode() {
  switch (mode.value) {
    case 'dark':
      mode.value = 'light'
      break
    case 'light':
      mode.value = 'edgeDark'
      break
    case 'edgeDark':
      mode.value = 'edgeLight'
      break
    case 'edgeLight':
    default:
      mode.value = 'dark'
      break
  }
}

const colorModeIcon = computed(() => {
  const theme = itemsForColorMode.find((row) => {
    return row.code === mode.value
  })

  if (theme) {
    return theme.icon
  }

  console.warn('colorModeIcon', false)
  console.warn(false)
  return MoonIcon
})

const isColorModeDark = computed(() => {
  const theme = itemsForColorMode.find((row) => {
    return row.code === mode.value
  })
  if (theme) {
    return theme.isDark
  }

  console.warn('isColorModeDark', false, [
    mode.value,
    itemsForColorMode
  ])
  return false
})

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
    toggleMode()
  }
})
</script>

<template>
  <B24App :toaster="(appConfig.toaster as any)">
    <B24SidebarLayout
      :b24ui="{
        root: 'edge-light:bg-transparent edge-dark:bg-transparent',
        container: isColorModeDark ? 'dark --ui-context-content-dark' : 'light --ui-context-content-light',
        sidebarSlideoverContainer: isColorModeDark ? 'dark --ui-context-content-dark' : 'light --ui-context-content-light'
      }"
      :use-light-content="route.path !== '/'"
    >
      <template #sidebar>
        <B24SidebarHeader>
          <ProseH4 class="h-[32px] font-medium flex flex-row items-center relative my-0 ps-2xl pe-xs">
            Vue::Playground
          </ProseH4>
        </B24SidebarHeader>
        <B24SidebarBody>
          <template v-for="(group) in usePageMeta.groups" :key="group.id">
            <B24NavigationMenu
              :items="[
                { label: group.label, type: 'label' },
                ...group.children
              ]"
              variant="pill"
              orientation="vertical"
            />
          </template>
        </B24SidebarBody>
        <B24SidebarFooter>
          <B24SidebarSection>
            <template
              v-for="(item, itemIndex) in usePageMeta.menuList"
              :key="itemIndex"
            >
              <B24Link
                class="text-sm mb-2 flex flex-row items-center justify-between"
                :to="item.to"
                :target="item.target"
              >
                <div>
                  {{ item.label }}
                </div>
                <OpenIn50Icon class="size-4"/>
              </B24Link>
            </template>
          </B24SidebarSection>
        </B24SidebarFooter>
      </template>
      <template #navbar>
        <B24NavbarSpacer />
        <B24NavbarSection class="flex-row items-center justify-start ps-[18px] gap-0.5">
          <B24Tooltip :content="{ side: 'left' }" :text="`Switch to ${dir === 'ltr' ? 'Right-to-left' : 'Left-to-right'} mode`" :kbds="['shift', 'L']">
            <B24Button
              :icon="dir === 'ltr' ? LeftAlignIcon : RightAlignIcon"
              :aria-label="`Switch to ${dir === 'ltr' ? 'Right-to-left' : 'Left-to-right'} mode`"
              color="link"
              depth="light"
              size="xs"
              @click="toggleDir"
            />
          </B24Tooltip>
          <B24DropdownMenu
            use-dropdown
            :items="itemsForColorMode"
          >
            <B24Tooltip :content="{ side: 'left' }" :text="`Switch to next mode`" :kbds="['shift', 'D']">
              <B24Button
                class="w-[100px]"
                :icon="colorModeIcon"
                :aria-label="`Switch to next mode`"
                color="link"
                depth="light"
                size="xs"
                normal-case
                :label="mode"
              />
            </B24Tooltip>
          </B24DropdownMenu>
          <div class="hidden mx-2 lg:flex flex-row flex-nowrap items-center justify-center gap-0.5">
            <B24Kbd value="ctrl" size="sm" /> <B24Kbd value="K" size="sm" />
          </div>
        </B24NavbarSection>
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
