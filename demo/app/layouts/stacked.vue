<script setup lang="ts">
import { computed, ref } from 'vue'
import { useColorMode } from '#imports'
import { useTextDirection } from '@vueuse/core'
import usePageMeta from '~/composables/usePageMeta'
import RightAlignIcon from '@bitrix24/b24icons-vue/editor/RightAlignIcon'
import LeftAlignIcon from '@bitrix24/b24icons-vue/editor/LeftAlignIcon'
import SunIcon from '@bitrix24/b24icons-vue/main/SunIcon'
import MoonIcon from '@bitrix24/b24icons-vue/main/MoonIcon'
import HomeIcon from '@bitrix24/b24icons-vue/main/HomeIcon'

const route = useRoute()
const router = useRouter()
const colorMode = useColorMode()
const dir = useTextDirection()

useHead({
  bodyAttrs: {
    class: 'text-base-master dark:text-base-150 bg-base-50 dark:bg-base-dark font-b24-system antialiased'
  }
})

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const isLtr = computed({
  get() {
    return dir.value === 'ltr'
  },
  set() {
    dir.value = dir.value === 'rtl' ? 'ltr' : 'rtl'
  }
})

const isCommandPaletteOpen = ref(false)

// function onSelect(item: any) {
//   router.push(item.to)
// }

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
    colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light'
  }
})
</script>

<template>
  <B24StackedLayout
    :use-light-content="route.path !== '/'"
    :b24ui="{
      header: 'border-b border-base-950/5 dark:border-white/10',
      container: route.path === '/' ? 'lg:mt-4' : ''
    }"
  >
    <template #sidebar>
      <B24SidebarHeader>
        <ProseH3 class="mt-3 ps-2xl pe-xs">
          Demo
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
      <ProseH4 class="mb-0 max-lg:hidden">
        Demo
      </ProseH4>
      <B24NavigationMenu
        :items="usePageMeta.groups"
        class="w-full max-lg:hidden"
        variant="pill"
        orientation="horizontal"
        content-orientation="horizontal"
        highlight
        color="primary"
        :b24ui="{
          content: 'max-h-[600px]',
          viewport: 'overflow-y-auto scrollbar-thin scrollbar-transparent'
        }"
      />
      <B24NavbarSpacer />
      <B24NavigationMenu
        :items="usePageMeta.menuList"
        class="max-lg:hidden"
        variant="link"
        orientation="horizontal"
        :b24ui="{
          link: 'text-sm text-base-500',
          linkLabelExternalIcon: 'h-3'
        }"
      />
      <B24NavbarSection>
        <ClientOnly>
          <template v-if="!colorMode?.forced">
            <B24Tooltip :content="{ side: 'right' }" :text="`Switch to ${isDark ? 'light' : 'dark'} mode`" :kbds="['shift', 'D']">
              <B24Button
                :icon="isDark ? MoonIcon : SunIcon"
                :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
                color="link"
                depth="normal"
                size="xs"
                @click="isDark = !isDark"
              />
            </B24Tooltip>
          </template>
          <B24Tooltip :content="{ side: 'right' }" :text="`Switch to ${isLtr ? 'Right-to-left' : 'Left-to-right'} mode`" :kbds="['shift', 'L']">
            <B24Button
              :icon="isLtr ? LeftAlignIcon : RightAlignIcon"
              :aria-label="`Switch to ${isLtr ? 'Right-to-left' : 'Left-to-right'} mode`"
              color="link"
              depth="normal"
              size="xs"
              @click="isLtr = !isLtr"
            />
          </B24Tooltip>

          <div class="hidden mx-2 lg:flex flex-row flex-nowrap items-center justify-center gap-0.5">
            <B24Kbd value="ctrl" size="sm" /> <B24Kbd value="K" size="sm" />
          </div>
          <template #fallback>
            <div class="h-[26px]" />
          </template>
        </ClientOnly>
      </B24NavbarSection>
    </template>

    <!-- Header -->
    <template v-if="route.path !== '/'">
      <div class="flex flex-row items-center justify-start gap-1">
        <B24Tooltip :content="{ side: 'bottom', align: 'start' }" text="Go home" :kbds="['ctrl', 'arrowleft']">
          <B24Link to="/" class="whitespace-nowrap flex flex-row flex-nowrap items-center justify-start gap-1 truncate text-base-500">
            <HomeIcon class="size-5" /> Home
          </B24Link>
        </B24Tooltip>
        <span class="text-base-500"> / </span>
        <ClientOnly>
          <ProseH1 class="font-bold">
            {{ usePageMeta.getPageTitle() }}
          </ProseH1>
        </ClientOnly>
      </div>
      <B24Separator class="mt-2 mb-4" />
    </template>

    <!-- Content -->
    <slot />
  </B24StackedLayout>

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
