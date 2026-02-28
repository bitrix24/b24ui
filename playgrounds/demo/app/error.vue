<script setup lang="ts">
import type { NuxtError } from '#app'

const { components, groups, items } = useNavigation()

defineProps<{
  error: NuxtError
}>()

provide('components', components)
</script>

<template>
  <B24App>
    <B24DashboardGroup unit="px">
      <B24DashboardSidebar class="bg-(--ui-color-bg-content-secondary)">
        <template #header>
          <NuxtLink to="/" class="text-(--b24ui-typography-label-color) inline-flex" aria-label="Home">
            <Logo class="h-5 w-auto" />
          </NuxtLink>

          <div class="flex items-center ms-auto">
            <B24ColorModeButton />
          </div>
        </template>

        <B24DashboardSearchButton />

        <B24NavigationMenu :items="items" orientation="vertical" />

        <B24Separator type="dashed" />

        <B24NavigationMenu :items="components" orientation="vertical" />
      </B24DashboardSidebar>

      <B24DashboardPanel>
        <B24DashboardNavbar class="border-b-0" />

        <B24Error :error="error" />
      </B24DashboardPanel>

      <B24DashboardSearch :groups="groups" :fuse="{ resultLimit: 100 }" />
    </B24DashboardGroup>
  </B24App>
</template>
