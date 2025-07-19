<script setup lang="ts">
import usePageMeta from '../../playground/app/composables/usePageMeta'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, computed } from 'vue'
import { useColorMode, useTextDirection } from '@vueuse/core'
import AlignRightIcon from '@bitrix24/b24icons-vue/outline/AlignRightIcon'
import AlignLeftIcon from '@bitrix24/b24icons-vue/outline/AlignLeftIcon'
import SunIcon from '@bitrix24/b24icons-vue/main/SunIcon'
import SunIconAir from '@bitrix24/b24icons-vue/outline/SunIcon'
import MoonIcon from '@bitrix24/b24icons-vue/main/MoonIcon'
import MoonIconAir from '@bitrix24/b24icons-vue/outline/MoonIcon'
import OpenIn50Icon from '@bitrix24/b24icons-vue/actions/OpenIn50Icon'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'
import type { DropdownMenuItem, NavigationMenuItem, SidebarLayoutInstance } from '@bitrix24/b24ui-nuxt'

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
    label: 'edge-light',
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

const checkedUseLightContent = ref(true)
</script>

<template>
  <B24App :toaster="(appConfig.toaster as any)">
    <B24SidebarLayout
      ref="currentSidebarRef"
      title="root"
      :use-light-content="checkedUseLightContent"
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

            <B24Button
              block
              label="Use our Vue starter"
              color="air-primary-success"
              size="sm"
              loading-auto
              :icon="RocketIcon"
              to="https://bitrix24.github.io/b24ui/guide/installation-vue.html#use-our-vue-starter"
              target="_blank"
            />
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
          <B24Switch v-model="checkedUseLightContent" size="xs" />
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
          <B24DropdownMenu
            use-dropdown
            :items="itemsForColorMode"
          >
            <B24Tooltip :content="{ side: 'bottom' }" :text="`Switch to next mode`" :kbds="['shift', 'D']">
              <B24Button
                :icon="colorModeIcon"
                :aria-label="`Switch to next mode`"
                color="air-secondary-accent"
                size="xs"
                rounded
                :label="mode"
              />
            </B24Tooltip>
          </B24DropdownMenu>
          <div class="hidden lg:flex flex-row flex-nowrap items-center justify-center gap-0.5">
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
