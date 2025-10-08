<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

useHead({
  htmlAttrs: { class: `edge-dark` }
})

const slots = defineSlots()
const route = useRoute()

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const { navigationMenuByCategory } = useNavigation(navigation!)
</script>

<template>
  <B24SidebarLayout
    :use-light-content="true"
  >
    <template #sidebar>
      <B24SidebarHeader>
        <LogoWithVersion />
      </B24SidebarHeader>
      <B24SidebarBody>
        <div class="ps-[20px] pe-xs rtl:ps-xs rtl:pe-[20px] flex flex-row flex-nowrap items-center justify-start gap-[6px]">
          <FrameworkTabs />
        </div>
        <B24NavigationMenu
          :key="route.path"
          :items="navigationMenuByCategory"
          orientation="vertical"
          :b24ui="{ linkLeadingBadge: '-top-[4px] left-auto -right-[50px]  bg-blue-500' }"
        />
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
