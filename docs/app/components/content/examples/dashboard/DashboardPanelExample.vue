<template>
  <B24DashboardPanel resizable>
    <template #header>
      <B24DashboardNavbar title="Inbox">
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
