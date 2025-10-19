<script setup lang="ts">
import { computed, ref } from 'vue'
import { useColorMode } from '#imports'
import { useTextDirection } from '@vueuse/core'
import usePageMeta from '~/composables/usePageMeta'
import AlignRightIcon from '@bitrix24/b24icons-vue/outline/AlignRightIcon'
import AlignLeftIcon from '@bitrix24/b24icons-vue/outline/AlignLeftIcon'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'

const appConfig = useAppConfig()
const dir = useTextDirection()
const colorMode = useColorMode()
const { isSidebarLayoutUseLightContent, isSidebarLayoutClearContent, checkedUseLightContent } = useRouteCheck()

const modeContext = ref<string>((appConfig?.colorModeTypeLight || 'light') as string)

useHead({
  title: 'Bitrix24 UI - Playground',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Explore and test all Bitrix24 UI components in an interactive environment' }
  ],
  htmlAttrs: {
    lang: 'en',
    dir: computed(() => appConfig.dir as 'ltr' | 'rtl'),
    class: computed(() => [modeContext.value])
  }
})

const route = useRoute()
const router = useRouter()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark: boolean) {
    colorMode.preference = _isDark ? 'dark' : 'light'
    modeContext.value = _isDark ? 'dark' : appConfig.colorModeTypeLight
  }
})

function toggleMode() {
  isDark.value = !isDark.value
}

function toggleDir() {
  dir.value = dir.value === 'ltr' ? 'rtl' : 'ltr'
}

function toggleModeContext() {
  colorMode.preference = modeContext.value === 'dark' ? 'dark' : 'light'
}

const getLightContent = computed(() => {
  const result = {
    pageWrapper: '',
    containerWrapper: ''
  }

  if (route.path === '/') {
    result.pageWrapper = 'lg:mt-[22px]'
  }

  if (!isSidebarLayoutUseLightContent.value) {
    return result
  }

  result.containerWrapper = isDark.value ? 'dark' : 'light'

  return result
})

defineShortcuts({
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

const { groups } = useNavigation()
</script>

<template>
  <B24DashboardGroup>
    <!-- // @see playgrounds/nuxt/app/assets/css/main.css -->
    <B24SidebarLayout
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
              <NuxtLink to="/" class="mt-0 text-(--ui-color-design-selection-content)" aria-label="Home">
                <ProseH4 class="font-(--ui-font-weight-medium) mb-0">
                  Playground
                </ProseH4>
              </NuxtLink>
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
            <MockSidebarLayoutSideFooter framework="nuxt" />
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
          <B24DashboardSearchButton size="sm" rounded :collapsed="false" :kbds="[{ value: 'meta', size: 'sm' }, { value: 'K', size: 'sm' }]" />
          <B24Tooltip :content="{ side: 'bottom' }" text="Switch color mode" :kbds="['shift', 'D']">
            <B24ColorModeSelect rounded size="sm" class="w-[100px]" :content="{ align: 'end', side: 'bottom' }" />
          </B24Tooltip>
          <B24RadioGroup
            v-model="modeContext"
            class="hidden lg:inline-flex"
            :items="['dark', 'light', 'edge-dark', 'edge-light']"
            size="xs"
            orientation="horizontal"
            variant="table"
            indicator="hidden"
            @change="toggleModeContext"
          />
          <B24Switch
            v-model="checkedUseLightContent"
            :disabled="isSidebarLayoutClearContent"
            size="sm"
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
                  <ProseH2 class="font-(--ui-font-weight-semi-bold) mb-0">
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

    <B24DashboardSearch :groups="groups" :fuse="{ resultLimit: 100 }" :color-mode="false" />
  </B24DashboardGroup>
</template>
