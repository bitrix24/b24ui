<script setup lang="ts">
import B24Icon from '@bitrix24/b24icons-vue/main/B24Icon'

const route = useRoute()
const router = useRouter()
const appConfig = useAppConfig()
const { components, groups, items } = useNavigation()
const { colorList, colorModel, syncColorModePreference, toggleDarkMode } = useThemeMode()

useHead({
  title: 'Bitrix24 UI - Playground',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Explore and test all Bitrix24 UI components in an interactive environment' }
  ],
  htmlAttrs: {
    lang: 'en',
    dir: computed(() => appConfig.dir)
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
        mode="modal"
        class="bg-(--ui-color-bg-content-secondary)"
        resizable
        collapsible
        :toggle="{ size: 'sm', class: 'ring-(--ui-color-divider-default)' }"
      >
        <template #header="{ collapsed }">
          <NuxtLink to="/" class="text-(--b24ui-typography-label-color) inline-flex" aria-label="Home">
            <Logo v-if="!collapsed" class="h-5 w-auto shrink-0 text-(--b24ui-typography-label-color)" />
            <B24Icon v-else class="size-10 text-[#2fc6f6] mx-auto" />
          </NuxtLink>
        </template>

        <template #default="{ collapsed }">
          <div v-if="!collapsed" class="ms-4 flex items-center">
            <B24Tooltip :content="{ side: 'bottom' }" text="Switch color mode" :kbds="['shift', 'D']">
              <B24RadioGroup
                v-model="colorModel"
                :items="colorList"
                size="xs"
                orientation="horizontal"
                variant="table"
                indicator="hidden"
                @change="syncColorModePreference"
              />
            </B24Tooltip>
          </div>

          <B24DashboardSearchButton
            :collapsed="collapsed"
            class="ms-4"
          />

          <B24NavigationMenu
            :collapsed="collapsed"
            :items="items"
            orientation="vertical"
            tooltip
            popover
          />

          <B24Separator type="dashed" />

          <B24NavigationMenu
            :collapsed="collapsed"
            :items="components"
            orientation="vertical"
            tooltip
            popover
          />
        </template>
      </B24DashboardSidebar>

      <B24DashboardPanel
        :b24ui="{
          body: [
            !route.path.startsWith('/components') && 'justify-center items-center',
            route.path.startsWith('/components') && 'mt-15',
            route.path.startsWith('/components/scroll-area') && 'p-0!'
          ]
        }"
      >
        <template #body>
          <NuxtPage />
        </template>
      </B24DashboardPanel>

      <B24DashboardSearch :groups="groups" :fuse="{ resultLimit: 100 }" />
    </B24DashboardGroup>
  </B24App>
</template>
