<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const route = useRoute()
const { mobileLinks } = useHeader()
const { navigationByCategory } = useNavigation(navigation!)
</script>

<template>
  <B24NavigationMenu orientation="vertical" :items="mobileLinks" class="-mx-2.5" />

  <template v-if="route.path.startsWith('/docs/')">
    <B24Separator type="dashed" class="mt-4 mb-6" />

    <div class="flex flex-col gap-2 mb-5.5">
      <FrameworkTabs />
    </div>

    <B24NavigationMenu
      :navigation="navigationByCategory"
      highlight
    />
  </template>
</template>
