<template>
  <B24DashboardNavbar title="Inbox">
    <template #leading>
      <B24DashboardSidebarCollapse />
    </template>

    <template #trailing>
      <B24Badge label="4" />
    </template>

    <template #right>
      <B24FieldGroup>
        <B24Button label="All" />
        <B24Button label="Unread" />
      </B24FieldGroup>
    </template>
  </B24DashboardNavbar>
</template>
