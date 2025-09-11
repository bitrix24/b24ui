<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

useHead({
  bodyAttrs: {
    // 'dark' | 'light' | 'edge-dark' | 'edge-light'
    class: `edge-dark`
  }
})

const route = useRoute()

const slots = defineSlots()

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const { navigationMenuByCategory } = useNavigation(navigation!)
</script>

<template>
  <B24SidebarLayout
    :use-light-content="true"
  >
    <template #sidebar>
      <B24SidebarHeader>
        <div class="h-full flex items-center relative my-0 ps-[25px] pe-xs rtl:pe-[25px]">
          <div class="flex flex-row flex-nowrap items-center justify-start gap-[6px]">
            <LogoWithVersion />
          </div>
        </div>
      </B24SidebarHeader>
      <B24SidebarBody>
        <ClientOnly>
          <B24NavigationMenu
            :key="route.path"
            :items="navigationMenuByCategory"
            orientation="vertical"
          />
        </ClientOnly>
      </B24SidebarBody>
      <B24SidebarFooter>
        <B24SidebarSection>
          <ExtLinks />
        </B24SidebarSection>
      </B24SidebarFooter>
    </template>
    <template #navbar>
      <Header />
    </template>

    <template v-if="slots['header']" #content-top>
      <slot name="header" />
    </template>

    <template v-if="slots['right']" #content-right>
      <slot name="right" />
    </template>

    <slot />

    <template #content-bottom>
      <Footer />
    </template>
  </B24SidebarLayout>
</template>
