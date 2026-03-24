<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRouter, useRoute } from 'vue-router'
import { useNavigation } from '../../nuxt/app/composables/useNavigation'
import { useThemeMode } from '../../nuxt/app/composables/useThemeMode'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'

const route = useRoute()
const router = useRouter()
const appConfig = useAppConfig()
const { components, groups, items } = useNavigation()

appConfig.dir = ref('ltr')
appConfig.toaster = reactive({
  position: 'top-right' as const,
  duration: 5000,
  max: 5,
  expand: true
})

const { colorList, colorModel, syncColorModePreference, toggleDarkMode } = useThemeMode()

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

provide('components', components)

defineShortcuts({
  ctrl_arrowleft: () => {
    if (route.path === '/') {
      return
    }
    router.push('/')
  },
  shift_D: () => {
    toggleDarkMode()
  }
})
</script>

<template>
  <B24App :toaster="appConfig.toaster" :dir="appConfig.dir">
    <B24DashboardGroup unit="px" storage="local">
      <B24DashboardSidebar
        id="default"
        mode="slideover"
        collapsible
        resizable
        class="light:bg-(--ui-color-base-0)/5"
      >
        <template #header="{ collapsed }">
          <B24DashboardSidebarCollapse :icon="HamburgerMenuIcon" class="size-9 px-2" />
          <RouterLink to="/" class="text-(--b24ui-typography-label-color) inline-flex" aria-label="Home">
            <Logo v-if="!collapsed" class="h-5 w-auto shrink-0 text-(--b24ui-typography-label-color)" />
          </RouterLink>
        </template>

        <template #default="{ collapsed }">
          <div v-if="!collapsed" class="flex items-center">
            <B24Tooltip :content="{ side: 'bottom' }" text="Switch color mode" :kbds="['shift', 'D']">
              <B24RadioGroup
                v-model="colorModel"
                :items="colorList"
                class="w-full"
                size="sm"
                orientation="vertical"
                variant="table"
                indicator="hidden"
                @change="syncColorModePreference"
              />
            </B24Tooltip>
          </div>

          <B24DashboardSearchButton
            :collapsed="collapsed"
            class="opacity-70 hover:opacity-100"
          />

          <B24NavigationMenu
            :collapsed="collapsed"
            :items="items"
            orientation="vertical"
            tooltip
            popover
          />

          <B24NavigationMenu
            :collapsed="collapsed"
            :items="components"
            orientation="vertical"
            tooltip
            popover
            class="mt-auto"
          />
        </template>
      </B24DashboardSidebar>

      <B24DashboardPanel
        :b24ui="{
          body: [
            !route.path.startsWith('/components') && 'justify-center items-center',
            route.path.startsWith('/components') && 'mt-17',
            route.path.startsWith('/components/scroll-area') && 'p-0!'
          ]
        }"
      >
        <template #body>
          <Suspense>
            <RouterView />
          </Suspense>
        </template>
      </B24DashboardPanel>

      <B24DashboardSearch :groups="groups" :color-mode="false" :fuse="{ resultLimit: 100 }" />
    </B24DashboardGroup>
  </B24App>
</template>
