# Navigation

Patterns for headers, sidebars, breadcrumbs, and tab navigation.

## Header with mobile menu

`B24Header` default slot is desktop nav, `#body` is the mobile menu. Without `#body`, mobile users have no navigation.

```vue
<B24Header>
  <template #title>
    <Logo class="h-6 w-auto" />
  </template>

  <B24NavigationMenu :items="items" />

  <template #right>
    <B24ColorModeButton />
    <B24Button label="Sign in" />
  </template>

  <template #body>
    <B24NavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
  </template>
</B24Header>
```

## Sidebar navigation (dashboard)

See [dashboard layout](../layouts/dashboard.md) for the full sidebar pattern with `B24DashboardSidebar` + `B24NavigationMenu`. Key points:
- Pass `:collapsed="collapsed"` to `B24NavigationMenu` inside collapsible sidebars
- Use `NavigationMenuItem[][]` (nested arrays) for separate nav groups
- Use `#footer` slot for user menu with `B24DropdownMenu`

## Tab navigation (within a page)

```vue
<script setup lang="ts">
const items = [{
  label: 'Overview',
  slot: 'overview' as const
}, {
  label: 'Activity',
  slot: 'activity' as const
}, {
  label: 'Members',
  slot: 'members' as const
}]
</script>

<template>
  <B24Tabs :items="items">
    <template #overview>
      <!-- Overview content -->
    </template>
    <template #activity>
      <!-- Activity feed -->
    </template>
    <template #members>
      <!-- Members list -->
    </template>
  </B24Tabs>
</template>
```

