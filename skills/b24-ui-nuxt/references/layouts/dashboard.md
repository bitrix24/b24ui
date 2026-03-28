# Dashboard Layout

Build app interfaces with resizable sidebars, multi-panel layouts, and toolbars.

## Component tree

```
B24App
└── NuxtLayout (dashboard)
    └── B24DashboardGroup
        ├── B24DashboardSidebar
        │   ├── #header (logo, search button)
        │   ├── #default (navigation) — receives { collapsed } slot prop
        │   └── #footer (user menu)
        └── NuxtPage
            └── B24DashboardPanel
                ├── #header → B24DashboardNavbar + B24DashboardToolbar
                ├── #body (scrollable content)
                └── #footer (optional)
```

## Layout

```vue [layouts/dashboard.vue]
<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Home',
  icon: 'i-lucide-house',
  to: '/dashboard'
}, {
  label: 'Inbox',
  icon: 'i-lucide-inbox',
  to: '/dashboard/inbox'
}, {
  label: 'Users',
  icon: 'i-lucide-users',
  to: '/dashboard/users'
}, {
  label: 'Settings',
  icon: 'i-lucide-settings',
  to: '/dashboard/settings'
}])
</script>

<template>
  <B24DashboardGroup>
    <B24DashboardSidebar collapsible resizable>
      <template #header="{ collapsed }">
        <B24DashboardSearchButton :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">
        <B24NavigationMenu
          :items="items"
          orientation="vertical"
          :b24ui="{ link: collapsed ? 'justify-center' : undefined }"
        />
      </template>

      <template #footer="{ collapsed }">
        <B24Button
          :icon="collapsed ? 'i-lucide-log-out' : undefined"
          :label="collapsed ? undefined : 'Sign out'"
          color="neutral"
          variant="ghost"
          block
        />
      </template>
    </B24DashboardSidebar>

    <slot />
  </B24DashboardGroup>
</template>
```

## Page

```vue [pages/dashboard/index.vue]
<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })
</script>

<template>
  <B24DashboardPanel>
    <template #header>
      <B24DashboardNavbar title="Home">
        <template #right>
          <B24Button icon="i-lucide-plus" label="New" />
        </template>
      </B24DashboardNavbar>
    </template>

    <template #body>
      <!-- Page content -->
    </template>
  </B24DashboardPanel>
</template>
```

## Key components

### DashboardGroup

Root layout wrapper. Manages sidebar state and persistence.

| Prop | Default | Description |
|---|---|---|
| `storage` | `'cookie'` | State persistence: `'cookie'`, `'localStorage'`, `false` |
| `storage-key` | `'dashboard'` | Storage key name |
| `unit` | `'pixels'` | Size unit: `'pixels'` or `'percentages'` |

### DashboardSidebar

Resizable, collapsible sidebar. Must be inside `DashboardGroup`.

| Prop | Default | Description |
|---|---|---|
| `resizable` | `false` | Enable resize by dragging |
| `collapsible` | `false` | Enable collapse when dragged to edge |
| `side` | `'left'` | `'left'` or `'right'` |
| `mode` | `'slideover'` | Mobile menu mode: `'modal'`, `'slideover'`, `'drawer'` |

Slots receive `{ collapsed }` prop. Control state: `v-model:collapsed`, `v-model:open` (mobile).

### DashboardPanel

Content panel with `#header`, `#body` (scrollable), `#footer`, and `#default` (raw) slots.

| Prop | Default | Description |
|---|---|---|
| `id` | `—` | Unique ID (required for multi-panel) |
| `resizable` | `false` | Enable resize by dragging |

### DashboardNavbar / DashboardToolbar

Navbar has `#left`, `#default`, `#right` slots and a `title` prop. Toolbar has the same slots for filters/actions below the navbar.

## Multi-panel (list-detail)

```vue [pages/dashboard/inbox.vue]
<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })
</script>

<template>
  <B24DashboardPanel id="inbox-list" resizable>
    <template #header>
      <B24DashboardNavbar title="Inbox" />
    </template>
    <template #body>
      <!-- Email list -->
    </template>
  </B24DashboardPanel>

  <B24DashboardPanel id="inbox-detail" class="hidden lg:flex">
    <template #header>
      <B24DashboardNavbar title="Message" />
    </template>
    <template #body>
      <!-- Email content -->
    </template>
  </B24DashboardPanel>
</template>
```

## With toolbar

```vue
<B24DashboardPanel>
  <template #header>
    <B24DashboardNavbar title="Users" />

    <B24DashboardToolbar>
      <template #left>
        <B24Input icon="i-lucide-search" placeholder="Search..." />
      </template>
      <template #right>
        <B24Select :items="['All', 'Active', 'Inactive']" />
      </template>
    </B24DashboardToolbar>
  </template>
</B24DashboardPanel>
```

## With search

```vue [layouts/dashboard.vue]
<template>
  <B24DashboardGroup>
    <B24DashboardSidebar>
      <template #header>
        <B24DashboardSearchButton />
      </template>
      <!-- ... -->
    </B24DashboardSidebar>

    <slot />

    <B24DashboardSearch :groups="searchGroups" />
  </B24DashboardGroup>
</template>
```

## Right sidebar

```vue
<B24DashboardGroup>
  <B24DashboardSidebar collapsible resizable>
    <!-- Left sidebar -->
  </B24DashboardSidebar>

  <slot />

  <B24DashboardSidebar side="right" resizable>
    <!-- Right sidebar -->
  </B24DashboardSidebar>
</B24DashboardGroup>
```
