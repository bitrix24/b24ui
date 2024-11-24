<script setup lang="ts">
import { splitByCase, upperFirst } from 'scule'
import { useColorMode } from '#imports'

const router = useRouter()
const appConfig = useAppConfig()
const colorMode = useColorMode()

defineOptions({ inheritAttrs: false })

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const components = [
  'skeleton'
]

const items = components.map(component => ({ label: upperName(component), to: `/components/${component}` }))

function upperName(name: string) {
  return splitByCase(name).map(p => upperFirst(p)).join('')
}

const isCommandPaletteOpen = ref(false)

function onSelect(item: any) {
  router.push(item.to)
}

defineShortcuts({
  meta_k: () => isCommandPaletteOpen.value = true
})
</script>

<template>
  <template v-if="!$route.path.startsWith('/__bitrix24_ui__')">
    <B24App :toaster="appConfig.toaster">
      <div class="h-screen w-screen overflow-hidden flex flex-col lg:flex-row min-h-0 bg-[var(--ui-bg)]" vaul-drawer-wrapper>
        <B24NavigationMenu :items="items" orientation="vertical" class="hidden lg:flex border-e border-[var(--ui-border)] overflow-y-auto w-48 p-4" />
        <B24NavigationMenu :items="items" orientation="horizontal" class="lg:hidden border-b border-[var(--ui-border)] [&>div]:min-w-min overflow-x-auto" />

        <div class="fixed top-15 lg:top-3 right-4 flex items-center gap-2">
          <ClientOnly v-if="!colorMode?.forced">
            <B24utton
              :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
              color="neutral"
              variant="ghost"
              :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
              @click="isDark = !isDark"
            />

            <template #fallback>
              <div class="size-8" />
            </template>
          </ClientOnly>
        </div>

        <div class="flex-1 flex flex-col items-center justify-around overflow-y-auto w-full py-14 px-4">
          <NuxtPage />
        </div>

        <B24Modal v-model:open="isCommandPaletteOpen" class="sm:h-96">
          <template #content>
            <B24CommandPalette placeholder="Search a component..." :groups="[{ id: 'items', items }]" :fuse="{ resultLimit: 100 }" @update:model-value="onSelect" @update:open="value => isCommandPaletteOpen = value" />
          </template>
        </B24Modal>
      </div>
    </B24App>
  </template>
  <template v-else>
    <NuxtPage />
  </template>
</template>

<style>
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";

@theme {
  --font-sans: 'Public Sans', sans-serif;

  --color-green-50: #EFFDF5;
  --color-green-100: #D9FBE8;
  --color-green-200: #B3F5D1;
  --color-green-300: #75EDAE;
  --color-green-400: #00DC82;
  --color-green-500: #00C16A;
  --color-green-600: #00A155;
  --color-green-700: #007F45;
  --color-green-800: #016538;
  --color-green-900: #0A5331;
  --color-green-950: #052E16;
}
</style>
