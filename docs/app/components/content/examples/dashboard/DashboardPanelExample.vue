<template>
  <B24DashboardPanel resizable>
    <template #header>
      <B24DashboardNavbar title="Inbox" class="bg-(--ui-color-design-outline-bg-alt) backdrop-blur-md">
        <template #leading>
          <B24DashboardSidebarCollapse />
        </template>
      </B24DashboardNavbar>
    </template>

    <template #body>
      <Placeholder class="h-full" />
    </template>
  </B24DashboardPanel>
</template>
