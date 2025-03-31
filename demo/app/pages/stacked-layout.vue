<script setup lang="ts">
useHead({
  title: 'StackedLayout'
})

definePageMeta({
  layout: false
})
</script>

<template>
  <NuxtLayout name="clear">
    <B24StackedLayout>
      <template #sidebar>
        <B24SidebarHeader>
          <ProseH3 class="text-[18px] mt-0 ps-2xl pe-xs text-blue-500">
            Title sidebar
          </ProseH3>
          <B24SidebarSection class-name="max-lg:hidden">
            Header
          </B24SidebarSection>
        </B24SidebarHeader>
        <B24SidebarBody>
          <B24SidebarSection>
            Body 1
          </B24SidebarSection>
          <B24SidebarSpacer />
          <B24SidebarSection>
            Body 2
          </B24SidebarSection>
        </B24SidebarBody>
      </template>

      <template #navbar>
        <ProseH4 class="font-bold mb-0 max-lg:hidden text-blue-500">
          Title nav
        </ProseH4>
        <B24NavbarDivider class="max-lg:hidden" />
        <B24NavbarSection>
          Nav 1
        </B24NavbarSection>
        <B24NavbarSpacer />
        <B24NavbarSection>
          Nav 2
        </B24NavbarSection>
      </template>

      <!-- Header -->
      <div class="flex flex-row items-center justify-start gap-1">
        <ProseH1 class="font-bold">
          H1
        </ProseH1>
      </div>
      <B24Separator class="mt-2 mb-4" />

      <!-- Content -->
      <Placeholder class="w-full h-[400px]" />
    </B24StackedLayout>
  </NuxtLayout>
</template>
