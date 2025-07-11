<script setup lang="ts">
import usePageMeta from '../../playground/app/composables/usePageMeta'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, computed } from 'vue'
import { useColorMode, useTextDirection } from '@vueuse/core'
import RightAlignIcon from '@bitrix24/b24icons-vue/editor/RightAlignIcon'
import LeftAlignIcon from '@bitrix24/b24icons-vue/editor/LeftAlignIcon'
import SunIcon from '@bitrix24/b24icons-vue/main/SunIcon'
import SunIconAir from '@bitrix24/b24icons-vue/outline/SunIcon'
import MoonIcon from '@bitrix24/b24icons-vue/main/MoonIcon'
import MoonIconAir from '@bitrix24/b24icons-vue/outline/MoonIcon'
import OpenIn50Icon from '@bitrix24/b24icons-vue/actions/OpenIn50Icon'
import type { DropdownMenuItem, NavigationMenuItem } from '@bitrix24/b24ui-nuxt'

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
    icon: MoonIcon,
    onSelect() {
      mode.value = 'dark'
    }
  },
  {
    label: 'light',
    code: 'light',
    icon: SunIcon,
    onSelect() {
      mode.value = 'light'
    }
  },
  {
    label: 'edge-dark',
    code: 'edgeDark',
    icon: MoonIconAir,
    onSelect() {
      mode.value = 'edgeDark'
    }
  },
  {
    label: 'edge-lark',
    code: 'edgeLight',
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

const { setLoading } = useSidebarLayout()
const makeLoading = async () => {
  return new Promise<void>((res) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      res()
    }, 2_000)
  })
}

/**
 * @todo remove this
 */
const demoTop: NavigationMenuItem[] = [
  {
    label: 'Sales',
    type: 'trigger' as NavigationMenuItem['type'],
    active: true
  },
  {
    label: 'Active',
    type: 'trigger' as NavigationMenuItem['type'],
    avatar: {
      src: '/avatar/employee.png'
    }
  },
  {
    label: 'Conversion',
    type: 'label' as NavigationMenuItem['type'],
    icon: MoonIconAir
  },
  {
    label: 'Current',
    type: 'trigger' as NavigationMenuItem['type'],
    active: true,
    badge: 3
  },
  {
    label: 'Negotiations',
    type: 'trigger' as NavigationMenuItem['type'],
    active: true,
    badge: 3
  },
  {
    label: 'Sales Pipeline',
    type: 'trigger' as NavigationMenuItem['type'],
    avatar: {
      src: '/avatar/employee.png'
    },
    children: [
      {
        label: 'level 1.1',
        description: 'Initial contact with potential clients',
        active: false
      },
      {
        label: 'level 1.2',
        description: 'Client potential assessment',
        avatar: {
          src: '/avatar/employee.png'
        },
        active: true
      },
      {
        label: 'level 1.3',
        description: 'Deal terms discussion',
        icon: SunIconAir,
        active: true,
        children: [
          {
            label: 'level 1.3.1',
            description: 'Initial contact with potential clients',
            active: false
          },
          {
            label: 'level 1.3.2',
            description: 'Client potential assessment',
            avatar: {
              src: '/avatar/employee.png'
            },
            active: true
          },
          {
            label: 'level 1.3.3',
            description: 'Deal terms discussion',
            icon: SunIconAir,
            active: true
          }
        ]
      }
    ]
  }
]
</script>

<template>
  <B24App :toaster="(appConfig.toaster as any)">
    <B24SidebarLayout
      :use-light-content="route.path !== '/'"
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
                  Vue::Playground
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
              variant="pill"
              orientation="vertical"
            />
          </template>
        </B24SidebarBody>
        <B24SidebarFooter>
          <B24SidebarSection>
            <template
              v-for="(item, indexItem) in usePageMeta.menuList"
              :key="indexItem"
            >
              <B24Link
                class="text-sm mb-2 flex flex-row items-center justify-between"
                :to="item.to"
                :target="item.target"
              >
                <div>{{ item.label }}</div>
                <OpenIn50Icon class="size-4" />
              </B24Link>
            </template>
          </B24SidebarSection>
        </B24SidebarFooter>
      </template>

      <template #navbar>
        <B24NavbarSection>
          <B24NavigationMenu
            :items="demoTop"
            variant="pill"
            orientation="horizontal"
          />
        </B24NavbarSection>
        <B24NavbarSpacer />
        <B24NavbarSection class="flex-row items-center justify-start gap-0.5">
          <B24Button
            label="reLoad"
            size="sm"
            loading-auto
            @click="makeLoading"
          />
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

      <template v-if="route.path !== '/'" #content-top>
        <ProseH2 class="font-semibold mb-0">
          {{ usePageMeta.getPageTitle() }}
        </ProseH2>
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
