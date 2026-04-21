# Component Selection

Decision matrices for choosing the right component. A list of all components is provided on the [documentation page](https://bitrix24.github.io/b24ui/raw/docs/components.md)

## Overlays

| Need | Component | Docs | Why |
|------|-----------|------|-----|
| Confirmation dialog, focused task, form | `B24Modal` | [modal.md](https://bitrix24.github.io/b24ui/raw/docs/components/modal.md) | Blocks page interaction, centered, draws focus |
| Detail panel, settings, secondary content | `B24Slideover` | [slideover.md](https://bitrix24.github.io/b24ui/raw/docs/components/slideover.md) | Slides from edge, doesn't feel as interruptive as modal |
| Mobile-first bottom sheet | `B24Drawer` | [drawer.md](https://bitrix24.github.io/b24ui/raw/docs/components/drawer.md) | Natural mobile pattern, swipe to dismiss |
| Contextual info attached to a trigger | `B24Popover` | [popover.md](https://bitrix24.github.io/b24ui/raw/docs/components/popover.md) | No backdrop, positioned relative to trigger |
| Simple hover hint | `B24Tooltip` | [tooltip.md](https://bitrix24.github.io/b24ui/raw/docs/components/tooltip.md) | Non-interactive, hover/focus only |

### Rules
- Use `B24Modal` for destructive confirmations ("Are you sure you want to delete?")
- Use `B24Slideover` for detail views in dashboards (email preview, user profile)
- Use `B24Drawer` for mobile navigation or action sheets
- Modal and Slideover support `mode="drawer"` for automatic mobile drawer behavior
- For programmatic overlays, use `useOverlay()` instead of `v-model:open`
- Never put interactive content (buttons, links) inside `B24Tooltip`

## Navigation

| Need | Component | Docs | Why |
|------|-----------|------|-----|
| Primary site/app navigation | `B24NavigationMenu` | [navigation-menu.md](https://bitrix24.github.io/b24ui/raw/docs/components/navigation-menu.md) | Horizontal (header) or vertical (sidebar) |
| Switch between views on same page | `B24Tabs` | [tabs.md](https://bitrix24.github.io/b24ui/raw/docs/components/tabs.md) | Content stays on page, no route change needed |
| Show current location in hierarchy | `B24Breadcrumb` | [breadcrumb.md](https://bitrix24.github.io/b24ui/raw/docs/components/breadcrumb.md) | Nested page structures |
| Search + keyboard-driven navigation | `B24CommandPalette` | [command-palette.md](https://bitrix24.github.io/b24ui/raw/docs/components/command-palette.md) | Power users, global search |
| Contextual actions on a trigger element | `B24DropdownMenu` | [dropdown-menu.md](https://bitrix24.github.io/b24ui/raw/docs/components/dropdown-menu.md) | Right-click menus, action buttons |
| Step-by-step process | `B24Stepper` | [stepper.md](https://bitrix24.github.io/b24ui/raw/docs/components/stepper.md) | Multi-step forms, wizards |

### Rules
- Use `B24NavigationMenu` with `orientation="vertical"` in sidebars, default horizontal in headers
- Use `B24Tabs` when switching views that don't need their own URL
- Use route-based navigation (`to` prop) when views should have shareable URLs
- `B24CommandPalette` is typically opened via `Cmd+K` shortcut — use `defineShortcuts` to wire it up

## Inputs

| Need | Component | Docs | Why |
|------|-----------|------|-----|
| Small fixed list (< 10 items) | `B24Select` | [select.md](https://bitrix24.github.io/b24ui/raw/docs/components/select.md) | Native-like, simple, lightweight |
| Searchable list, multiple selection, groups | `B24SelectMenu` | [select-menu.md](https://bitrix24.github.io/b24ui/raw/docs/components/select-menu.md) | Rich dropdown with search, multi-select, grouped items |
| Autocomplete / combobox (type + select) | `B24InputMenu` | [input-menu.md](https://bitrix24.github.io/b24ui/raw/docs/components/input-menu.md) | User can type freely AND pick from suggestions |
| Free text entry | `B24Input` | [input.md](https://bitrix24.github.io/b24ui/raw/docs/components/input.md) | Plain text, email, password, search |
| Multi-line text | `B24Textarea` | [textarea.md](https://bitrix24.github.io/b24ui/raw/docs/components/textarea.md) | With `autoresize` and `maxrows` |
| Numeric value with +/- controls | `B24InputNumber` | [input-number.md](https://bitrix24.github.io/b24ui/raw/docs/components/input-number.md) | Min/max/step constraints |
| Date selection | `B24InputDate` | [input-date.md](https://bitrix24.github.io/b24ui/raw/docs/components/input-date.md) | Calendar dropdown, supports ranges |
| Time selection | `B24InputTime` | [input-time.md](https://bitrix24.github.io/b24ui/raw/docs/components/input-time.md) | Hour/minute picker, 12/24 hour |
| Tags / multi-value free text | `B24InputTags` | [input-tags.md](https://bitrix24.github.io/b24ui/raw/docs/components/input-tags.md) | Chip-style input with max limit |
| Verification code | `B24PinInput` | [pin-input.md](https://bitrix24.github.io/b24ui/raw/docs/components/pin-input.md) | Fixed-length code entry |
| Boolean toggle | `B24Switch` | [switch.md](https://bitrix24.github.io/b24ui/raw/docs/components/switch.md) | On/off, enable/disable |
| Boolean checkbox | `B24Checkbox` | [checkbox.md](https://bitrix24.github.io/b24ui/raw/docs/components/checkbox.md) | Single option with label |
| Multiple choices from a list | `B24CheckboxGroup` | [checkbox-group.md](https://bitrix24.github.io/b24ui/raw/docs/components/checkbox-group.md) | Multiple selection, vertical or horizontal |
| Single choice from a list (visible) | `B24RadioGroup` | [radio-group.md](https://bitrix24.github.io/b24ui/raw/docs/components/radio-group.md) | All options visible, one selected |
| Range value | `B24Slider` | [range.md](https://bitrix24.github.io/b24ui/raw/docs/components/range.md) | Min/max with visual track |
| Color value | `B24ColorPicker` | [color-picker.md](https://bitrix24.github.io/b24ui/raw/docs/components/color-picker.md) | Hex/RGB/HSL picker |
| File upload | `B24FileUpload` | [file-upload.md](https://bitrix24.github.io/b24ui/raw/docs/components/file-upload.md) | Button or drop area variants |

### Rules
- Use `B24AuthForm` for login/signup pages — handles fields, social providers, validation, and layout out of the box *(документация отсутствует, см. `B24Form`)*
- Use `B24Select` for short, known lists (country, status, role)
- Use `B24SelectMenu` when the list is long or needs search
- Use `B24InputMenu` when the user might want to type a value that's not in the list
- Wrap all form inputs in `B24FormField` for labels, descriptions, hints, and validation errors
- Group related inline inputs with `B24FieldGroup`

## Feedback

| Need | Component | Docs | Why |
|------|-----------|------|-----|
| Ephemeral notification after action | `useToast()` | [use-toast.md](https://bitrix24.github.io/b24ui/raw/docs/composables/use-toast.md) | Auto-dismisses, stacks, non-blocking |
| Inline persistent message | `B24Alert` | [alert.md](https://bitrix24.github.io/b24ui/raw/docs/components/alert.md) | Stays visible, in-page context |
| App-wide announcement | `B24Banner` | [banner.md](https://bitrix24.github.io/b24ui/raw/docs/components/banner.md) | Sticky top bar, dismissible |
| Loading state | `B24Skeleton` | [skeleton.md](https://bitrix24.github.io/b24ui/raw/docs/components/skeleton.md) | Placeholder shimmer while loading |
| Progress indicator | `B24Progress` | [progress.md](https://bitrix24.github.io/b24ui/raw/docs/components/progress.md) | Determinate or indeterminate progress |

### Rules
- Use `useToast()` for action feedback: "Item saved", "Email sent", "Error occurred"
- Use `B24Alert` for contextual warnings in forms or sections
- Use `B24Banner` for site-wide messages (maintenance, new feature)
- Never use a toast for information the user needs to act on — use an alert or modal instead

## Layout containers

| Need | Component | Docs | Why |
|------|-----------|------|-----|
| Grouped content with header/body/footer | `B24Card` | [card.md](https://bitrix24.github.io/b24ui/raw/docs/components/card.md) | Bordered/shadow container with slots |
| Rich content card with icon, badge, links | `B24PageCard` | [page-card.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-card.md) | Extended card for grids — supports icon, badge, highlight, links |
| Marketing page section | `B24PageSection` | [page-section.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-section.md) | Full-width section with headline, title, features |
| Feature grid | `B24PageGrid` + `B24PageCard` | [page-grid.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-grid.md) | Multi-column card grid |
| Centered content wrapper | `B24Container` | [container.md](https://bitrix24.github.io/b24ui/raw/docs/components/container.md) | Max-width container |
| Collapsible section | `B24Collapsible` | [collapsible.md](https://bitrix24.github.io/b24ui/raw/docs/components/collapsible.md) | Animated expand/collapse |
| Accordion (multiple collapsibles) | `B24Accordion` | [accordion.md](https://bitrix24.github.io/b24ui/raw/docs/components/accordion.md) | FAQ, grouped collapsible content |

### Rules
- Don't overuse `B24Card` — plain content with spacing is often better than wrapping everything in cards
- Use `B24PageCard` instead of `B24Card` when you need icon, badge, highlight, or links — it's designed for feature grids and landing pages
- Use `B24PageSection` for marketing/landing page sections, not for app UI
- Use `B24Container` inside `B24DashboardPanel` body for consistent content width
