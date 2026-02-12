<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import { reactive, ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRouter, useRoute } from 'vue-router'
import { useNavigation } from '../../nuxt/app/composables/useNavigation'
import { useThemeMode, type LightThemeClass } from '../../nuxt/app/composables/useThemeMode'
import { useTextDirection } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const appConfig = useAppConfig()
const dir = useTextDirection()

appConfig.toaster = reactive({
  position: 'top-right' as const,
  duration: 5000,
  max: 5,
  expand: true
})

const {
  modeContext,
  syncColorModePreference,
  toggleDarkMode,
  themeItems
} = useThemeMode((appConfig?.colorModeTypeLight || 'light') as LightThemeClass)

useHead({
  title: 'Bitrix24 UI - Playground Vue',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Explore and test all Bitrix24 UI components in an interactive environment' }
  ],
  htmlAttrs: {
    lang: 'en',
    dir: computed(() => appConfig.dir as 'ltr' | 'rtl')
  }
})

const { groups, components } = useNavigation()
provide('components', components)

const searchTerm = ref('')
const input = useTemplateRef('input')

const contains = (value: string, search: string) => value.toLowerCase().includes(search.toLowerCase())

const filteredGroups = computed(() => {
  if (!searchTerm.value) {
    return groups.value
  }

  return groups.value.map((group) => {
    if (!group.id.includes('component')) {
      return group
    }

    return {
      ...group,
      items: group.items.filter(item => contains(String(item.label), searchTerm.value))
    }
  })
})

function toggleDir() {
  dir.value = dir.value === 'ltr' ? 'rtl' : 'ltr'
}

const getLightContent = computed(() => {
  return {
    sidebarSlideoverContainer: 'z-3',
    pageWrapper: 'px-0 lg:px-(--content-area-shift)',
    containerWrapperInner: 'flex flex-col lg:gap-4 lg:pt-lg'
  }
})

defineShortcuts({
  'ctrl_arrowleft': () => {
    if (route.path === '/') {
      return
    }
    router.push('/')
  },
  'shift_L': () => {
    toggleDir()
  },
  'shift_D': () => {
    toggleDarkMode()
  },
  '/': {
    usingInput: false,
    handler: () => {
      input?.value?.inputRef?.focus()
    }
  }
})
</script>

<template>
  <B24App :toaster="(appConfig.toaster as any)">
    <B24DashboardGroup>
      <!-- // @see nuxt/vue/src/assets/css/main.css -->
      <B24SidebarLayout
        :use-light-content="false"
        :b24ui="getLightContent"
      >
        <template #sidebar>
          <B24SidebarHeader>
            <div class="h-full flex items-center gap-x-sm relative my-0 ps-6 pe-xs rtl:pe-6">
              <B24Tooltip
                class="mt-1"
                :content="{ side: 'bottom', align: 'start' }"
                text="Go home"
                :kbds="['ctrl', 'arrowleft']"
              >
                <RouterLink to="/" class="mt-0 text-(--ui-color-design-selection-content)" aria-label="Home">
                  <ProseH3 class="font-(--ui-font-weight-medium) mb-0">
                    Playground
                  </ProseH3>
                </RouterLink>
              </B24Tooltip>
            </div>
            <div class="mt-4 ps-6 pe-xs rtl:pe-6 pb-3">
              <B24Input ref="input" v-model="searchTerm" placeholder="Filter..." class="group">
                <template #trailing>
                  <B24Kbd value="/" dd-class="ring-(--ui-color-design-plain-na-content-secondary) bg-transparent text-muted" />
                </template>
              </B24Input>
            </div>
          </B24SidebarHeader>
          <B24SidebarBody>
            <template v-for="group in filteredGroups" :key="group.id">
              <B24NavigationMenu
                v-if="group.items.length > 0"
                :items="[
                  ...(group.label ? [{ label: group.label, type: 'label' as NavigationMenuItem['type'] }] : []),
                  ...group.items
                ]"
                orientation="vertical"
              />
            </template>
          </B24SidebarBody>
          <B24SidebarFooter>
            <B24SidebarSection>
              <MockSidebarLayoutSideFooter framework="vue" />
            </B24SidebarSection>
          </B24SidebarFooter>
        </template>

        <template #navbar>
          <B24Tooltip
            class="lg:hidden inline-flex"
            :content="{ side: 'bottom', align: 'start' }"
            text="Go home"
            :kbds="['ctrl', 'arrowleft']"
          >
            <RouterLink to="/" class="mt-0 text-(--ui-color-design-selection-content)" aria-label="Home">
              <ProseH1 class="font-(--ui-font-weight-medium) mb-0">
                Playground
              </ProseH1>
            </RouterLink>
          </B24Tooltip>
          <B24NavbarSpacer />
          <B24NavbarSection class="flex-row items-center justify-start gap-4">
            <B24DashboardSearchButton size="sm" rounded :collapsed="false" :kbds="[{ value: 'meta', size: 'sm' }, { value: 'K', size: 'sm' }]" />
            <B24Tooltip :content="{ side: 'bottom' }" text="Switch color mode" :kbds="['shift', 'D']">
              <B24ColorModeSwitch />
            </B24Tooltip>
            <B24RadioGroup
              v-model="modeContext"
              class="hidden lg:inline-flex"
              :items="themeItems"
              size="xs"
              orientation="horizontal"
              variant="table"
              indicator="hidden"
              @change="syncColorModePreference"
            />
          </B24NavbarSection>
        </template>

        <Suspense>
          <RouterView />
        </Suspense>
      </B24SidebarLayout>

      <B24DashboardSearch :groups="groups" :fuse="{ resultLimit: 100 }" :color-mode="false" />
    </B24DashboardGroup>
  </B24App>
</template>
