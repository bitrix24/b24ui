<script setup lang="ts">
import usePageMeta from '../../playground/app/composables/usePageMeta'
import RightAlignIcon from '@bitrix24/b24icons-vue/editor/RightAlignIcon'
import LeftAlignIcon from '@bitrix24/b24icons-vue/editor/LeftAlignIcon'
import SunIcon from '@bitrix24/b24icons-vue/main/SunIcon'
import SunIconAir from '@bitrix24/b24icons-vue/outline/SunIcon'
import MoonIcon from '@bitrix24/b24icons-vue/main/MoonIcon'
import MoonIconAir from '@bitrix24/b24icons-vue/outline/MoonIcon'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, computed } from 'vue'
import { useColorMode, useTextDirection } from '@vueuse/core'
import HomeIcon from '@bitrix24/b24icons-vue/main/HomeIcon'

const appConfig = useAppConfig()
const mode = useColorMode({
  modes: {
    dark: 'dark --ui-context-content-dark',
    light: 'light --ui-context-content-light',
    lightEdge: 'light --ui-context-edge-light',
    darkEdge: 'dark --ui-context-edge-dark'
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

function toggleMode() {
  switch (mode.value) {
    case 'dark':
      mode.value = 'light'
      break
    case 'light':
      mode.value = 'darkEdge'
      break
    case 'darkEdge':
      mode.value = 'lightEdge'
      break
    case 'lightEdge':
      mode.value = 'dark'
      break
    default:
      mode.value = 'dark'
      break
  }
}

const colorModeIcon = computed(() => {
  switch (mode.value) {
    case 'dark': return MoonIcon
    case 'light': return SunIcon
    case 'darkEdge': return MoonIconAir
    case 'lightEdge': return SunIconAir
    default: return MoonIcon
  }
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
      :use-light-content="route.path !== '/'"
    >
      <template #sidebar>
        <B24SidebarHeader>
          <B24SidebarSection class="flex-row ps-[18px]">
            <B24Tooltip :content="{ side: 'left' }" :text="`Switch to next mode`" :kbds="['shift', 'D']">
              <B24Button
                :icon="colorModeIcon"
                :aria-label="`Switch to next mode`"
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
          <ProseH3 class="mt-3 ps-2xl pe-xs">
            Vue::Playground
          </ProseH3>
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
        <B24SidebarFooter
          class="border-t border-base-950/5 dark:border-white/5"
        >
          <B24NavigationMenu
            :items="usePageMeta.menuList"
            class="w-full"
            variant="link"
            orientation="vertical"
            :b24ui="{
              link: 'text-sm text-base-500',
              linkLabelExternalIcon: 'h-3'
            }"
          />
        </B24SidebarFooter>
      </template>

      <template #navbar>
        <B24NavbarSpacer />
        <B24NavbarSection>
          <B24Tooltip :content="{ side: 'left' }" :text="`Switch to next mode`" :kbds="['shift', 'D']">
            <B24Button
              :icon="colorModeIcon"
              :aria-label="`Switch to next mode`"
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
