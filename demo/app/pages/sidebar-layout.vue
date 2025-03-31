<script setup lang="ts">
useHead({
  title: 'SidebarLayout'
})

definePageMeta({
  layout: false
})
</script>

<template>
  <NuxtLayout name="clear">
    <B24SidebarLayout>
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
          <B24SidebarSection class-name="max-lg:hidden">
            Body 2
          </B24SidebarSection>
        </B24SidebarBody>
        <B24SidebarFooter>
          <B24SidebarSection>
            Footer
          </B24SidebarSection>
        </B24SidebarFooter>
      </template>

      <template #navbar>
        <B24NavbarSpacer />
        <B24NavbarSection>
          Nav
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
    </B24SidebarLayout>
  </NuxtLayout>
</template>
