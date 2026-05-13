# Dashboard Layout

Build app interfaces with resizable sidebars, multi-panel layouts, and toolbars.

## When to use

- Application for Bitrix24
- Admin panels, back-office UIs
- Email clients, project management tools
- Any app with a persistent sidebar and content panels
- Combine with chat or editor layouts for specialized dashboards

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
import HomeIcon from '@bitrix24/b24icons-vue/outline/HomeIcon'
import MessagesIcon from '@bitrix24/b24icons-vue/outline/MessagesIcon'
import GroupIcon from '@bitrix24/b24icons-vue/outline/GroupIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/outline/SettingsIcon'
import LogOutIcon from '@bitrix24/b24icons-vue/outline/LogOutIcon'

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Home',
  icon: HomeIcon,
  to: '/dashboard'
}, {
  label: 'Inbox',
  icon: MessagesIcon,
  to: '/dashboard/inbox'
}, {
  label: 'Users',
  icon: GroupIcon,
  to: '/dashboard/users'
}, {
  label: 'Settings',
  icon: SettingsIcon,
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
          :collapsed="collapsed"
          :items="items"
          orientation="vertical"
        />
      </template>

      <template #footer="{ collapsed }">
        <B24Button
          :icon="collapsed ? LogOutIcon : undefined"
          :label="collapsed ? undefined : 'Sign out'"
          :class="[!collapsed && 'py-2']"
          color="air-tertiary"
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
import PlusLIcon from '@bitrix24/b24icons-vue/outline/PlusLIcon'

definePageMeta({ layout: 'dashboard' })
</script>

<template>
  <B24DashboardPanel>
    <template #header>
      <B24DashboardNavbar title="Home">
        <template #leading>
          <B24DashboardSidebarCollapse />
        </template>
        <template #right>
          <B24Button :icon="PlusLIcons" label="New" />
        </template>
      </B24DashboardNavbar>
    </template>

    <template #body>
      <!-- Page content -->
    </template>
  </B24DashboardPanel>
</template>
```

### Common mistakes

- Forgetting `definePageMeta({ layout: 'dashboard' })` — the page won't use the dashboard layout without it.
- Putting content directly in `B24DashboardPanel` without using `#body` slot — content won't scroll properly.
- Not handling the `collapsed` slot prop — sidebar content should adapt when collapsed (hide labels, center icons).

## Key components

### DashboardGroup

Root wrapper. Manages sidebar state and persistence.

| Prop | Default | Purpose |
|---|---|---|
| `storage` | `'cookie'` | `'cookie'`, `'localStorage'`, `false` |
| `storage-key` | `'dashboard'` | Storage key name |
| `unit` | `'pixels'` | Size unit: `'pixels'` or `'percentages'` |

### DashboardSidebar

Resizable, collapsible sidebar. Must be inside `DashboardGroup`.

| Prop | Default | Purpose |
|---|---|---|
| `resizable` | `false` | Drag to resize |
| `collapsible` | `false` | Collapse when dragged to edge |
| `side` | `'left'` | `'left'` or `'right'` |
| `mode` | `'slideover'` | Mobile: `'modal'`, `'slideover'`, `'drawer'` |

All slots receive `{ collapsed, collapse }` — `collapsed` is the boolean state, `collapse(value)` toggles it programmatically. Use `v-model:collapsed` and `v-model:open` (mobile) for state control.

### DashboardPanel

Content panel with `#header`, `#body` (scrollable), `#footer`, and `#default` (raw, no scroll) slots.

### DashboardNavbar / DashboardToolbar

Navbar: `#leading`, `#left`, `#default`, `#right` slots + `title` prop. Use `B24DashboardSidebarCollapse` in `#leading` to toggle sidebar on mobile.
Toolbar: same slots, sits below navbar for filters/actions.

### B24NavigationMenu in sidebar

Always pass `:collapsed="collapsed"` to `B24NavigationMenu` inside a collapsible sidebar — it auto-hides labels and centers icons. Use `NavigationMenuItem[][]` (array of arrays) for separate groups (main nav + footer links).

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
<script setup lang="ts">
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'
</script>

<template>
  <B24DashboardPanel>
    <template #header>
      <B24DashboardNavbar title="Users" />
      <B24DashboardToolbar>
        <template #left>
          <B24Input :icon="SearchIcon" placeholder="Search..." />
        </template>
        <template #right>
          <B24Select :items="['All', 'Active', 'Inactive']" />
        </template>
      </B24DashboardToolbar>
    </template>
  </B24DashboardPanel>
</template>
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
