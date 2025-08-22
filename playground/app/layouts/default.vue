<script setup lang="ts">
import { computed, ref } from 'vue'
import { useColorMode } from '#imports'
import { useTextDirection } from '@vueuse/core'
import usePageMeta from '~/composables/usePageMeta'
import AlignRightIcon from '@bitrix24/b24icons-vue/outline/AlignRightIcon'
import AlignLeftIcon from '@bitrix24/b24icons-vue/outline/AlignLeftIcon'
import SunIcon from '@bitrix24/b24icons-vue/main/SunIcon'
import SunIconAir from '@bitrix24/b24icons-vue/outline/SunIcon'
import MoonIcon from '@bitrix24/b24icons-vue/main/MoonIcon'
import MoonIconAir from '@bitrix24/b24icons-vue/outline/MoonIcon'

import type { DropdownMenuItem, NavigationMenuItem, SidebarLayoutInstance } from '@bitrix24/b24ui-nuxt'

const route = useRoute()
const router = useRouter()

type colorMode = 'dark' | 'light' | 'edgeDark' | 'edgeLight'

const colorMode = useColorMode()
const mode = ref<colorMode>(colorMode.value as colorMode)
// const mode = useColorMode<'light' | 'dark' | 'edgeLight' | 'edgeDark'>({
//   attribute: 'class',
//   modes: {
//     light: 'light',
//     dark: 'dark',
//     edgeLight: 'edge-light',
//     edgeDark: 'edge-dark'
//   }
// })
const dir = useTextDirection()
const { isSidebarLayoutUseLightContent, isSidebarLayoutClearContent, checkedUseLightContent } = useRouteCheck()

// useHead({
//   bodyAttrs: {
//     // fix class: 'text-base-master dark:text-base-150 bg-base-50 dark:bg-base-dark font-b24-system antialiased'
//   }
// })

// const isDark = computed({
//   get() {
//     return colorMode.value === 'dark'
//   },
//   set(_isDark) {
//     colorMode.preference = _isDark ? 'dark' : 'light'
//   }
// })

const isCommandPaletteOpen = ref(false)

// function onSelect(item: any) {
//   router.push(item.to)
// }

function toggleDir() {
  dir.value = dir.value === 'ltr' ? 'rtl' : 'ltr'
}

const itemsForColorMode = computed<DropdownMenuItem[]>(() => {
  return [
    {
      label: 'dark',
      code: 'dark',
      icon: MoonIcon,
      active: mode.value === 'dark',
      checked: mode.value === 'dark',
      type: 'checkbox' as DropdownMenuItem['type'],
      onSelect(e: Event) {
        mode.value = 'dark'
        colorMode.preference = 'dark'
        e.preventDefault()
      }
    },
    {
      label: 'light',
      code: 'light',
      icon: SunIcon,
      active: mode.value === 'light',
      checked: mode.value === 'light',
      type: 'checkbox' as DropdownMenuItem['type'],
      onSelect(e: Event) {
        mode.value = 'light'
        colorMode.preference = 'light'
        e.preventDefault()
      }
    },
    {
      label: 'edge-dark',
      code: 'edgeDark',
      icon: MoonIconAir,
      active: mode.value === 'edgeDark',
      checked: mode.value === 'edgeDark',
      type: 'checkbox' as DropdownMenuItem['type'],
      onSelect(e: Event) {
        mode.value = 'edgeDark'
        colorMode.preference = 'edge-dark'
        e.preventDefault()
      }
    },
    {
      label: 'edge-light',
      code: 'edgeLight',
      icon: SunIconAir,
      active: mode.value === 'edgeLight',
      checked: mode.value === 'edgeLight',
      type: 'checkbox' as DropdownMenuItem['type'],
      onSelect(e: Event) {
        mode.value = 'edgeLight'
        colorMode.preference = 'edge-light'
        e.preventDefault()
      }
    }
  ]
})

function toggleMode() {
  switch (mode.value) {
    case 'dark':
      mode.value = 'light'
      colorMode.preference = 'light'
      break
    case 'light':
      mode.value = 'edgeDark'
      colorMode.preference = 'edge-dark'
      break
    case 'edgeDark':
      mode.value = 'edgeLight'
      colorMode.preference = 'edge-light'
      break
    case 'edgeLight':
    default:
      mode.value = 'dark'
      colorMode.preference = 'dark'
      break
  }
}

const getLightContent = computed(() => {
  const result = {
    containerWrapper: ''
  }

  if (!isSidebarLayoutUseLightContent.value) {
    return result
  }

  switch (mode.value) {
    case 'dark':
      result.containerWrapper = 'dark'
      break
    case 'light':
      result.containerWrapper = 'light'
      break
    case 'edgeDark':
      result.containerWrapper = 'light'
      break
    case 'edgeLight':
      result.containerWrapper = 'light'
      break
  }

  return result
})

const colorModeIcon = computed(() => {
  const theme = itemsForColorMode.value.find((row) => {
    return row.code === mode.value
  })

  if (theme) {
    return theme.icon
  }

  return MoonIcon
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
    toggleDir()
  },
  shift_D: () => {
    toggleMode()
  }
})

const currentSidebarRef = ref<SidebarLayoutInstance | null>(null)

const handleSidebarLayoutLoadingAction = async () => {
  if (!currentSidebarRef.value) {
    return
  }

  try {
    currentSidebarRef.value.setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2_000))
  } finally {
    currentSidebarRef.value.setLoading(false)
  }
}

const menuTop = computed<NavigationMenuItem[]>(() => {
  return [
    {
      label: 'Home',
      to: '/'
    },
    ...(usePageMeta.groups.map((group) => {
      return {
        label: group.label,
        type: 'trigger' as NavigationMenuItem['type'],
        active: (group.id === 'components' && (route.path.includes(`content/`) || route.path.includes(`prose/`)))
          ? false
          : route.path.includes(`${group.id}`),
        children: group.children
      }
    }))
  ]
})
</script>

<template>
  <!-- // @see playground/app/assets/css/main.css -->
  <B24SidebarLayout
    ref="currentSidebarRef"
    :use-light-content="isSidebarLayoutUseLightContent"
    :b24ui="getLightContent"
  >
    <template #sidebar>
      <B24SidebarHeader>
        <div class="h-full flex items-center relative my-0 ps-[25px] pe-xs rtl:pe-[25px]">
          <B24Tooltip
            class="flex-0 mt-1"
            :content="{ side: 'bottom', align: 'start' }"
            text="Go home"
            :kbds="['ctrl', 'arrowleft']"
          >
            <B24Link to="/" class="mt-0 text-(--ui-color-design-selection-content)">
              <ProseH4 class="font-medium mb-0">
                Playground
              </ProseH4>
            </B24Link>
          </B24Tooltip>
        </div>
      </B24SidebarHeader>
      <B24SidebarBody>
        <template v-for="(group) in usePageMeta.groups" :key="group.id">
          <B24NavigationMenu
            :items="[
              { label: group.label, type: 'label' },
              ...group.children
            ]"
            orientation="vertical"
          />
        </template>
      </B24SidebarBody>
      <B24SidebarFooter>
        <B24SidebarSection>
          <MockSidebarLayoutSideFooter />
        </B24SidebarSection>
      </B24SidebarFooter>
    </template>

    <template #navbar>
      <B24NavbarSection class="hidden sm:inline-flex">
        <B24NavigationMenu
          :items="menuTop"
          orientation="horizontal"
        />
      </B24NavbarSection>
      <B24NavbarSpacer />
      <B24NavbarSection class="flex-row items-center justify-start gap-4">
        <B24DropdownMenu
          arrow
          :items="itemsForColorMode"
        >
          <B24Tooltip :content="{ side: 'bottom' }" :text="`Switch to next mode`" :kbds="['shift', 'D']">
            <B24Button
              :icon="colorModeIcon"
              aria-label="Switch to next mode"
              color="air-secondary-accent"
              size="xs"
              rounded
              use-dropdown
              :label="mode"
            />
          </B24Tooltip>
        </B24DropdownMenu>
        <B24Switch
          v-model="checkedUseLightContent"
          :disabled="isSidebarLayoutClearContent"
          size="xs"
        />
        <B24Button
          label="Reload"
          color="air-secondary-accent"
          rounded
          size="xs"
          loading-auto
          @click="handleSidebarLayoutLoadingAction"
        />
        <B24Tooltip :content="{ side: 'bottom' }" :text="`Switch to ${dir === 'ltr' ? 'Right-to-left' : 'Left-to-right'} mode`" :kbds="['shift', 'L']">
          <B24Button
            :icon="dir === 'ltr' ? AlignLeftIcon : AlignRightIcon"
            :aria-label="`Switch to ${dir === 'ltr' ? 'Right-to-left' : 'Left-to-right'} mode`"
            color="air-secondary-accent"
            rounded
            size="xs"
            @click="toggleDir"
          />
        </B24Tooltip>
        <div class="hidden lg:flex flex-row flex-nowrap items-center justify-center gap-0.5">
          <B24Kbd value="ctrl" size="sm" /> <B24Kbd value="K" size="sm" />
        </div>
      </B24NavbarSection>
    </template>

    <template
      v-if="route.path !== '/' && !isSidebarLayoutClearContent"
      #content-top
    >
      <div class="w-full flex flex-col gap-[20px]">
        <MockSidebarLayoutTopProfile class="rounded-(--ui-border-radius-md)" />
        <ClientOnly>
          <MockSidebarLayoutTop class="flex-row">
            {{ usePageMeta.getPageTitle() }}
          </MockSidebarLayoutTop>
          <template #fallback>
            <div class="flex items-center gap-[12px]">
              <div class="w-full flex items-center gap-[20px]">
                <ProseH2 class="font-semibold mb-0">
                  Loading ...
                </ProseH2>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </template>

    <template
      v-if="route.path !== '/' && !isSidebarLayoutClearContent"
      #content-actions
    >
      <MockSidebarLayoutActions />
    </template>

    <slot />
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
</template>
