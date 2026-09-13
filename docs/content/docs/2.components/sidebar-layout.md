---
title: SidebarLayout
description: You incorporate a sidebar in the slider and CRM entity tab embedding. Overall, it's stylish, trendy, and youthful
category: deprecated
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/SidebarLayout.vue
---

::warning
This component is `deprecated` and will be removed in version `3.0.0`
::

Build layouts with the [DashboardSidebar](/docs/components/dashboard-sidebar/), [DashboardPanel](/docs/components/dashboard-panel/) and [DashboardGroup](/docs/components/dashboard-group/) components instead. For a standalone collapsible sidebar without the dashboard shell, use [Sidebar](/docs/components/sidebar/).

## Deprecated sub-components

`SidebarLayout` came with a set of building blocks. They are all still exported and still work, and they are all being removed in `3.0.0` together with it. None of them has its own documentation page — this section exists so that code using them leads somewhere.

| Deprecated | Replacement |
| ---------- | ----------- |
| `B24Navbar` | [DashboardNavbar](/docs/components/dashboard-navbar/) |
| `B24NavbarSection` | [DashboardNavbar](/docs/components/dashboard-navbar/) slots (`#left`, `#right`, `#trailing`) |
| `B24NavbarDivider` | [Separator](/docs/components/separator/) |
| `B24NavbarSpacer` | a flex spacer of your own, or the DashboardNavbar slots |
| `B24SidebarHeader` | [DashboardSidebar](/docs/components/dashboard-sidebar/) `#header` slot |
| `B24SidebarBody` | [DashboardSidebar](/docs/components/dashboard-sidebar/) `#default` slot |
| `B24SidebarFooter` | [DashboardSidebar](/docs/components/dashboard-sidebar/) `#footer` slot |
| `B24SidebarSection` | [NavigationMenu](/docs/components/navigation-menu/) with `orientation="vertical"` |
| `B24SidebarHeading` | [NavigationMenu](/docs/components/navigation-menu/) item labels |
| `B24SidebarSpacer` | a flex spacer of your own |

::note
Nothing here changes before `3.0.0` — this is a heads-up, not a break. If you are starting something new, start on the Dashboard components.
::
