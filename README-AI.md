# Bitrix24 UI Kit — AI Reference

This guide is for AI agents and developers generating UIs with the Bitrix24 UI Kit for Nuxt/Vue. It covers:

- Installation and initialization (Nuxt and Vite + Vue)
- A catalog of components and composables with props, slots, and rich examples
- Theming conventions and patterns for overlays and toasts

Note on variants: Most visual options (colors, sizes, states) come from theme variants. The exact sets are generated at build time and may differ per theme. Typical values are shown; to enumerate the exact values at runtime, read theme.variants for each component.


## Table of Contents

- [Bitrix24 UI Kit — AI Reference](#bitrix24-ui-kit--ai-reference)
  - [Table of Contents](#table-of-contents)
  - [Initialization and Setup](#initialization-and-setup)
    - [Install](#install)
    - [Nuxt (recommended)](#nuxt-recommended)
    - [Vue + Vite](#vue--vite)
    - [Naming conventions](#naming-conventions)
  - [About theme variants](#about-theme-variants)
  - [Theme Variants — Enumerated Values](#theme-variants--enumerated-values)
  - [Components](#components)
    - [B24App — root provider](#b24app--root-provider)
    - [B24Button — button/link](#b24button--buttonlink)
    - [B24ButtonGroup — grouped buttons](#b24buttongroup--grouped-buttons)
    - [B24Input — text input](#b24input--text-input)
    - [B24Textarea — textarea](#b24textarea--textarea)
    - [B24InputNumber — numeric input](#b24inputnumber--numeric-input)
    - [B24Select — select](#b24select--select)
    - [B24SelectMenu / B24InputMenu — ready-made menu patterns](#b24selectmenu--b24inputmenu--ready-made-menu-patterns)
    - [B24Checkbox — checkbox](#b24checkbox--checkbox)
    - [B24RadioGroup — radio group](#b24radiogroup--radio-group)
    - [B24Form \& B24FormField — form and field](#b24form--b24formfield--form-and-field)
    - [B24Avatar / B24AvatarGroup — avatar and group](#b24avatar--b24avatargroup--avatar-and-group)
    - [B24Badge — badge](#b24badge--badge)
    - [B24Accordion / B24Collapsible — accordion/collapsible](#b24accordion--b24collapsible--accordioncollapsible)
    - [B24Chip — chip](#b24chip--chip)
    - [B24Container — layout container](#b24container--layout-container)
    - [B24Separator — separator](#b24separator--separator)
    - [B24Skeleton — skeleton loader](#b24skeleton--skeleton-loader)
    - [B24Countdown — countdown](#b24countdown--countdown)
    - [B24DescriptionList — description list](#b24descriptionlist--description-list)
    - [B24TableWrapper — table wrapper (content)](#b24tablewrapper--table-wrapper-content)
    - [B24Kbd — keyboard key](#b24kbd--keyboard-key)
    - [B24DropdownMenu — dropdown menu](#b24dropdownmenu--dropdown-menu)
    - [B24NavigationMenu — navigation menu](#b24navigationmenu--navigation-menu)
    - [B24Navbar and sections](#b24navbar-and-sections)
    - [B24Progress — progress bar](#b24progress--progress-bar)
    - [B24Range — range slider](#b24range--range-slider)
    - [B24Switch — switch](#b24switch--switch)
    - [B24Tabs — tabs](#b24tabs--tabs)
    - [B24Tooltip — tooltip](#b24tooltip--tooltip)
    - [B24Popover — popover](#b24popover--popover)
    - [B24Modal — modal dialog](#b24modal--modal-dialog)
    - [B24Slideover — side panel](#b24slideover--side-panel)
    - [B24Toast / B24Toaster — toasts](#b24toast--b24toaster--toasts)
    - [Sidebar: B24SidebarLayout and parts](#sidebar-b24sidebarlayout-and-parts)
    - [Content \& Prose](#content--prose)
    - [Alert / Advice — alerts and tips](#alert--advice--alerts-and-tips)
    - [Calendar — calendar](#calendar--calendar)
    - [Link — link](#link--link)
  - [Composables (core)](#composables-core)
    - [useToast](#usetoast)
    - [useOverlay](#useoverlay)
    - [defineShortcuts](#defineshortcuts)
    - [useKbd](#usekbd)
    - [useLocale / defineLocale](#uselocale--definelocale)
    - [useConfetti](#useconfetti)
    - [usePortal](#useportal)
  - [Patterns and Best Practices](#patterns-and-best-practices)
  - [Links](#links)
  - [Exhaustiveness note on variant values](#exhaustiveness-note-on-variant-values)


## Initialization and Setup

Nuxt and plain Vite + Vue are supported.

### Install

- Install the UI Kit and the icons package.
- pnpm/yarn/npm/bun are supported.

```bash
pnpm add @bitrix24/b24ui-nuxt @bitrix24/b24icons-vue
# or
yarn add @bitrix24/b24ui-nuxt @bitrix24/b24icons-vue
# or
npm i @bitrix24/b24ui-nuxt @bitrix24/b24icons-vue
# or
bun add @bitrix24/b24ui-nuxt @bitrix24/b24icons-vue
```

### Nuxt (recommended)

1. Add the module to nuxt.config.ts

```ts
export default defineNuxtConfig({
  modules: ['@bitrix24/b24ui-nuxt']
})
```

1. Add styles in your CSS

```css
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";
```

1. Wrap your app with `B24App` (e.g., in `app.vue`)

```vue
<template>
  <B24App>
    <NuxtPage />
  </B24App>
</template>
```

Notes:

- Components that use overlays/toasts/tooltips (e.g., Toast, Tooltip, Modal/Slideover programmatically) require `B24App` to provide overlay/toast providers.
- Consider installing VS Code Tailwind CSS IntelliSense and configure it to pick up classes in the `b24ui` prop.

### Vue + Vite

1. Enable the plugin in `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import bitrix24UIPluginVite from '@bitrix24/b24ui-nuxt/vite'

export default defineConfig({
  plugins: [vue(), bitrix24UIPluginVite()]
})
```

1. Register the plugin in `main.ts` and the router (if used):

```ts
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import b24UiPlugin from '@bitrix24/b24ui-nuxt/vue-plugin'
import App from './App.vue'

const app = createApp(App)
const router = createRouter({ routes: [], history: createWebHistory() })

app.use(router)
app.use(b24UiPlugin)
app.mount('#app')
```

1. Add styles to your CSS:

```css
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";
```

### Naming conventions

- All components are exported with the `B24` prefix (e.g., `B24Button`, `B24Input`, `B24Modal`).
- Many components accept a `b24ui` prop — an object with class hooks for internal parts (tailwind-variants slots). This enables targeted styling.
- Icons come from `@bitrix24/b24icons-vue`.


## About theme variants

- Most visual props (`color`, `size`, `depth`, `variant`, `indicator`, `overlayBlur`, etc.) are derived from a theme (imported from `#build/b24ui/<component>`).
- To get the exhaustive set of allowed values, read `theme.variants.<key>` for a component (see demo at `/playgrounds/demo/app/pages/components/button.vue`).
- Typical sets:
  - color: `air-*` families (e.g., `air-primary`, `air-secondary-no-accent`, `air-primary-success`, `air-primary-alert`, `air-primary-warning`, `air-primary-copilot`) and more depending on the component.
  - size: commonly `xs | sm | md | lg | xl` (exact set depends on component and theme).
  - variant/indicator: enumerations specific to the component.

  [Docs](docs/components/calendar.md)
  - size: commonly `xs | sm | md | lg | xl` (exact set depends on component and theme).
  - variant/indicator: enumerations specific to the component.


  [Docs](docs/components/link.md)

## Theme Variants — Enumerated Values

This section lists the concrete enum keys found in the default theme files under `src/theme/*.ts`. Values marked as deprecated exist for compatibility with the old theme and should be avoided in new code.

- Shared tokens
  - Sizes (by component):
    - Button, Badge, Tabs, FormField: xss, xs, sm, md, lg, xl
    - Input, Select: xss, xs, sm, md, lg, xl
    - Switch, Progress, Range: xs, sm, md, lg
    - Avatar: 3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl
    - AvatarGroup uses the same labels and adjusts overlap per size
    - DescriptionList: sm, md
    - Content/TableWrapper: xs, sm, md, lg
  - Orientations: horizontal, vertical (where applicable)
  - Accents: default, accent, less (for components that expose accent)

- Button
  - color: air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-secondary, air-secondary-alert, air-secondary-accent, air-secondary-accent-1, air-secondary-accent-2, air-secondary-no-accent, air-tertiary, air-tertiary-accent, air-tertiary-no-accent, air-selection, air-boost; deprecated: default, danger, success, warning, primary, secondary, collab, ai, link
  - size: xss, xs, sm, md, lg, xl
  - depth (deprecated): light, normal, dark
  - booleans: block, rounded, leading, active, useLabel, useDropdown, useWait, useClock, loading, normalCase, isAir

- ButtonGroup
  - orientation: horizontal, vertical
  - size: xss, xs, sm, md, lg, xl
  - noSplit: true|false

- Badge
  - color: air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary, air-secondary-alert, air-secondary-accent, air-secondary-accent-1, air-secondary-accent-2, air-tertiary, air-selection; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - size: xss, xs, sm, md, lg, xl
  - square: true|false; inverted: true|false; leading: true|false; useLink: true|false; useClose: true|false

- Input
  - size: xss, xs, sm, md, lg, xl
  - color: air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - type: file
  - booleans: rounded, noPadding, noBorder, underline, leading, trailing, loading, highlight

- Textarea
  - inherits Input variants; specific: autoresize (boolean)

- Select
  - size: xss, xs, sm, md, lg, xl
  - colorItem (for items): air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning; deprecated: default, danger, success, warning, primary, secondary, collab, ai

- Checkbox
  - color: air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - variant: list, card
  - indicator: start, end, hidden
  - size: xs, sm, md, lg
  - booleans: required, disabled, checked

- RadioGroup
  - color: air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - variant: list, card, table
  - orientation: horizontal, vertical
  - indicator: start, end, hidden
  - size: xs, sm, md, lg
  - booleans: disabled, required

- Tabs
  - variant: link
  - orientation: horizontal, vertical
  - size: xss, xs, sm, md, lg, xl

- Range (Slider)
  - color: air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - size: xs, sm, md, lg
  - orientation: horizontal, vertical
  - disabled: boolean

- Progress
  - animation: loading, carousel, carousel-inverse, swing, elastic
  - color: air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - size: xs, sm, md, lg
  - orientation: horizontal, vertical
  - inverted: boolean

- DescriptionList
  - size: sm, md
  - orientation: horizontal, vertical
  - title: boolean

- Separator
  - accent: default, accent, less
  - orientation: horizontal, vertical
  - size: thin, thick
  - type: solid, dashed, dotted, double

- Skeleton
  - accent: default, accent, less

- Kbd
  - accent: default, accent, less
  - size: sm, md, lg

- Avatar
  - size: 3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl

- AvatarGroup
  - size: 3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl

- Switch
  - color: air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - size: xs, sm, md, lg
  - booleans: checked, unchecked, loading, required, disabled

- Alert
  - color: air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary, air-secondary-alert, air-secondary-accent, air-secondary-accent-1, air-secondary-accent-2, air-tertiary; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - size: sm, md
  - orientation: horizontal, vertical
  - title: boolean; inverted: boolean

- Advice
  - angle: top, bottom

- DropdownMenu
  - color (items): air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - active: boolean; loading: boolean

- NavigationMenu
  - orientation: horizontal, vertical
  - active: boolean; disabled: boolean; level: boolean; collapsed: boolean

- Modal
  - overlayBlur: auto, on, off
  - transition: boolean
  - fullscreen: boolean
  - scrollbarThin: boolean

- Slideover
  - overlayBlur: auto, on, off
  - side: right, left, top, bottom
  - transition: boolean

- Tooltip
  - kbdsSize: sm (for embedded B24Kbd); kbdsAccent: default

- Popover
  - no explicit variants in theme (style via slots)

- Toast
  - color: air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - orientation: horizontal, vertical
  - title: boolean

- Content/TableWrapper
  - size: xs, sm, md, lg
  - rounded: boolean
  - zebra: boolean
  - pinRows: boolean
  - pinCols: boolean
  - rowHover: boolean
  - bordered: boolean
  - scrollbarThin: boolean

- Chip
  - color: air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary, air-secondary-accent, air-secondary-accent-1, air-tertiary; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - size: sm, md, lg
  - position: top-right, bottom-right, top-left, bottom-left
  - inverted: boolean; inset: boolean; standalone: boolean; hideZero: boolean; oneDigit: boolean

- Calendar
  - color: air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - size: xs, sm, md, lg

- InputMenu
  - size: xss, xs, sm, md, lg, xl
  - colorItem (items): air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - multiple: boolean; addNew: boolean

- SelectMenu
  - inherits Select variants; adds addNew: boolean

- SidebarLayout
  - inner: boolean
  - offContentScrollbar: boolean
  - useSidebar: boolean
  - useLightContent: boolean
  - loading: boolean
  - useNavbar: boolean

- Sidebar, SidebarHeader, SidebarBody, SidebarFooter, Navbar, NavbarSection, NavbarDivider, Popover
  - no enumerated variants (style configured via slots)

## Components

Below are key components with their main props, slots, and usage examples. If a prop takes values from `theme.variants`, refer to the theme section above.

Note: many components share icon-related props from a common pattern:

- icon?: IconComponent — leading icon
- avatar?: AvatarProps — leading avatar
- loading?: boolean — loading state (spinner/indicator)
- trailing?: boolean — if true, move icon to the right
- trailingIcon?: IconComponent — right-side icon

Form components also integrate with `B24FormField` for id/name/aria wiring.

---

### B24App — root provider

Wraps the app and wires overlay/toast/tooltip providers and global config.

Example:

```vue
<B24App>
  <RouterView />
</B24App>
```

---

### B24Button — button/link

Action or navigation. Can act as a link (forwards `Link` props).

Key props:

- label?: string — text or use default slot
- color?: theme.variants.color — e.g., `air-primary`, `air-secondary-no-accent`
- activeColor?: theme.variants.color — active-state color
- depth?: theme.variants.depth — visual depth
- activeDepth?: theme.variants.depth — active-state depth
- size?: theme.variants.size — size
- rounded?: boolean — rounded corners
- block?: boolean — full width
- loading?: boolean — external loading state
- loadingAuto?: boolean — auto loading while awaiting @click Promise
- normalCase?: boolean — disable uppercase transform
- useWait?: boolean — hourglass loader icon
- useClock?: boolean — clock loader icon
- useDropdown?: boolean — show right chevron
- onClick?: `(event: MouseEvent) => void | Promise<void> | Array<any>`
- Link props: subset of `B24Link` (e.g., `to`, `target`, `rel`)
- activeClass?/inactiveClass?: string — link state classes
- class?: any — extra classes for the root
- b24ui?: object with internal part keys (base, baseLine, label, leadingIcon, etc.)

Slots:

- leading — custom leading content (icon/avatar)
- default — main content
- trailing — custom trailing content

Example:

```vue
<B24Button
  :icon="MyActionIcon"
  :avatar="{ src: '/path/user.png', alt: 'User', size: 'sm' }"
  label="Create task"
  color="air-primary"
  :active-color="'air-primary-alert'"
  size="md"
  :rounded="true"
  :block="false"
  :loading-auto="true"
  :use-wait="false"
  :use-clock="true"
  :use-dropdown="true"
  to="/tasks"
  active-class="italic"
  inactive-class="opacity-80"
  :b24ui="{ baseLine: 'justify-center min-w-48', leadingIcon: 'text-ai-500' }"
  @click="() => new Promise(res => setTimeout(res, 800))"
/>
```

---

### B24ButtonGroup — grouped buttons

Provides `orientation`, `size`, and `noSplit` to child buttons via provide/inject.

Example:

```vue
<B24ButtonGroup orientation="horizontal" size="md">
  <B24Button label="One" />
  <B24Button label="Two" />
  <B24Button label="Three" />
</B24ButtonGroup>
```

---

### B24Input — text input

Text input with leading/trailing icon/avatar, tag label, and focus highlight.

Key props:

- as?: any — root tag (default div)
- id?, name?
- type?: HTMLInputElement['type'] — default 'text'
- placeholder?: string
- color?: theme.variants.color — ring highlight
- size?: theme.variants.size
- noPadding?: boolean — remove inner padding
- noBorder?: boolean — remove borders/rings
- underline?: boolean — bottom border only
- rounded?: boolean — rounded corners
- required?: boolean
- autocomplete?: 'on'|'off'|...
- autofocus?: boolean, autofocusDelay?: number
- disabled?: boolean
- tag?: string — small label over input
- tagColor?: BadgeProps['color']
- highlight?: boolean
- v-model modelValue?: string|number|null with modifiers string/number/trim/lazy/nullify
- defaultValue?: AcceptableValue
- class?, b24ui?

Slots:

- leading — left area (icon/avatar)
- default — extra content
- trailing — right area (icon)

Example:

```vue
<B24Input
  id="login"
  name="login"
  placeholder="Login"
  color="air-primary"
  size="md"
  :rounded="true"
  :underline="false"
  :no-border="false"
  :no-padding="false"
  :tag="'Login'"
  :tag-color="'air-primary'"
  :highlight="hasError"
  v-model.trim.number.nullify="login"
  autocomplete="off"
  :disabled="false"
  :autofocus="true"
  :autofocus-delay="100"
>
  <template #leading>
    <MyUserIcon />
  </template>
  <template #trailing>
    <MyStatusIcon />
  </template>
</B24Input>
```

---

### B24Textarea — textarea

Props mirror `B24Input` (no type). Supports leading/trailing, size, color, rounded, noBorder/underline/noPadding, v-model.

Example:

```vue
<B24Textarea
  placeholder="Description"
  color="air-primary"
  size="md"
  :rounded="true"
  v-model.trim="descr"
/>
```

---

### B24InputNumber — numeric input

Number input with steppers/formatting.

Key props (via Reka NumberField):

- modelValue?, defaultValue?
- min?, max?, step?, stepSnapping?
- formatOptions? — Intl.NumberFormatOptions
- disableWheelChange?, invertWheelChange?
- id?, name?, required?, disabled?, readonly?
- color/size/rounded/noBorder/underline/noPadding and shared props like Input via FormField

Example:

```vue
<B24InputNumber
  v-model.number="amount"
  :min="0"
  :max="100"
  :step="1"
  :format-options="{ maximumFractionDigits: 0 }"
  color="air-primary"
  size="md"
  />
```

---

### B24Select — select

Single or multiple selection. Supports groups, label/separator, icons/avatars/chips in items.

Key props:

- placeholder?: string
- color?: theme.variants.color, size?: theme.variants.size
- noPadding?, noBorder?, underline?, rounded?
- tag?: string, tagColor?: BadgeProps['color']
- trailingIcon?: IconComponent — open icon (default chevron)
- selectedIcon?: IconComponent — selected item icon (default check)
- content?: popper/content props
- arrow?: boolean | { width, height, ... }
- portal?: boolean | string | HTMLElement
- valueKey?: string (default 'value'), labelKey?: string (default 'label')
- items?: Array<SelectItem | SelectItem[]> — primitives or objects: { label?, value?, type?: 'label'|'separator'|'item', icon?, avatar?, color?, chip?, disabled?, onSelect?, class?, b24ui? }
- defaultValue?, v-model:modelValue?
- multiple?: boolean
- highlight?: boolean
- autofocus?, autofocusDelay?
- class?, b24ui?

Slots:

- leading, default (trigger text), trailing — trigger slots
- item, item-leading, item-label, item-trailing — item slots
- content-top, content-bottom — custom content above/below the list

Example:

```vue
<B24Select
  :items="[
    { type: 'label', label: 'Team' },
    { label: 'Marketing', value: 'mkt', icon: MarketingIcon },
    { label: 'Sales', value: 'sales', avatar: { src: '/avatars/sales.png' } },
    { type: 'separator' },
    { label: 'AI', value: 'ai', chip: { color: 'ai', text: 'AI' } }
  ]"
  placeholder="Choose department"
  color="air-primary"
  size="md"
  :rounded="true"
  :multiple="true"
  value-key="value"
  label-key="label"
  :content="{ side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }"
  :arrow="{ width: 20, height: 10 }"
  :portal="true"
  v-model="selectedValues"
>
  <template #leading="{ open }">
    <MyFilterIcon :class="open ? 'rotate-180' : ''" />
  </template>
  <template #item-trailing>
    <!-- custom right slot -->
  </template>
</B24Select>
```

---

### B24SelectMenu / B24InputMenu — ready-made menu patterns

Prebuilt UX for dropdown menus on inputs. Props mirror Select/Input with menu additions. See `/docs/components/select-menu.md` and `/docs/components/input-menu.md`.

---

### B24Checkbox — checkbox

Boolean control with optional indeterminate.

Key props:

- as?: any — container (default div, for variant=list)
- label?: string, description?: string
- color?: theme.variants.color
- variant?: theme.variants.variant — e.g., 'list' | 'inline' (see theme)
- size?: theme.variants.size
- indicator?: theme.variants.indicator — indicator position ('start'|'end')
- required?, disabled?, name?, id?, value?, defaultValue?
- class?, b24ui?

Slots:

- label({ label }) — custom label
- description({ description }) — custom description

Example:

```vue
<B24Checkbox
  v-model="checked"
  label="Accept terms"
  description="Required"
  color="air-primary"
  size="md"
  indicator="start"
  :required="true"
/>
```

---

### B24RadioGroup — radio group

Choose one option.

Key props:

- as?: any
- legend?: string — group heading
- items?: Array<{ label?, description?, disabled?, value?, class?, b24ui? } | string | number>
- valueKey?: string = 'value', labelKey?: string = 'label', descriptionKey?: string = 'description'
- size?: theme.variants.size, variant?: theme.variants.variant, color?: theme.variants.color
- orientation?: 'vertical'|'horizontal'
- indicator?: theme.variants.indicator — radio circle position
- v-model:modelValue?, defaultValue?
- name?, required?
- class?, b24ui?

Slots:

- legend — header slot
- label({ item, modelValue }) — item label
- description({ item, modelValue }) — item description

Example:

```vue
<B24RadioGroup
  legend="Priority"
  :items="[
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'med', description: 'Default' },
    { label: 'High', value: 'high', disabled: true }
  ]"
  color="air-primary"
  size="md"
  orientation="vertical"
  v-model="priority"
/>
```

---

### B24Form & B24FormField — form and field

- `B24FormField` renders label/description/hint/help/error and binds ARIA to a child control.
- `B24Form` integrates fields and manages submit/validation (see `/docs/components/form.md`).

B24FormField props:

- as?: any
- name?: string — field name (for mapping errors)
- errorPattern?: RegExp — match error by pattern
- label?, description?, help?, error?, hint?
- size?: theme.variants.size, required?: boolean
- eagerValidation?: boolean — start validating on input immediately
- validateOnInputDelay?: number (default 300ms)
- class?, b24ui?

B24FormField slots:

- label({ label }), hint({ hint }), description({ description }), help({ help }), error({ error }), default({ error })

Example:

```vue
<B24Form @submit="onSubmit">
  <B24FormField name="email" label="Email" :required="true" hint="Work email">
    <template #default="{ error }">
      <B24Input
        type="email"
        v-model.trim="email"
        :highlight="!!error"
        placeholder="name@company.com"
      />
    </template>
  </B24FormField>
  <B24Button type="submit" color="air-primary" :loading-auto="true">Submit</B24Button>
</B24Form>
```

---

### B24Avatar / B24AvatarGroup — avatar and group

Avatar props:

- as?: any (default span)
- src?, alt?, icon?: IconComponent, text?: string
- size?: theme.variants.size (xs/sm/md/lg... depends on theme)
- chip?: boolean | ChipProps — chip framing
- class?, style?, b24ui?

Slot: default — custom fallback

Example:

```vue
<B24Avatar src="/u.png" alt="User" size="md" />
<B24Avatar :icon="UserIcon" size="sm" />
<B24Avatar text="AB" chip :size="'lg'" />
```

---

### B24Badge — badge

Props:

- as?: any = 'span'
- label?: string|number
- color?: theme.variants.color (incl. air-* family)
- inverted?: boolean — invert color
- size?: theme.variants.size
- square?: boolean — equal paddings
- useLink?: boolean — underline on hover
- useClose?: boolean — close (×) icon
- `onCloseClick?: (event: MouseEvent) => void | Promise<any> | Array<any>`
- icon/avatar/leading, class?, b24ui?

Slots: leading, default, trailing

Example:

```vue
<B24Badge
  :icon="InfoIcon"
  label="New"
  color="air-primary"
  size="sm"
  :use-link="true"
  :use-close="true"
  @onCloseClick="() => console.log('closed')"
/>
```

---

### B24Accordion / B24Collapsible — accordion/collapsible

`B24Accordion` props:

- type: 'single'|'multiple'
- collapsible?: boolean (default true)
- unmountOnHide?: boolean (default true)
- items?: Array<{ label?, icon?, trailingIcon?, slot?, content?, value?, disabled?, class?, b24ui? }>
- trailingIcon?: IconComponent — default right icon
- labelKey?: string = 'label'
- disabled?, class?, b24ui?

Slots: leading({ item,index,open }), default({ item,... }), trailing(...), content(...), body(...), dynamic slots by `slot` name.

Example:

```vue
<B24Accordion
  :items="[
    { label: 'First', content: 'Content 1', icon: DocIcon },
    { label: 'Second', slot: 'custom', trailingIcon: ChevronIcon }
  ]"
>
  <template #custom-body="{ item }">
    <div class="p-4">Custom body for: {{ item.label }}</div>
  </template>
</B24Accordion>
```

`B24Collapsible` — wrapper for show/hide with default trigger and `#content` slot.

---

### B24Chip — chip

Can wrap content (e.g., a button) or be standalone.

Example:

```vue
<B24Chip text="1">
  <B24Button label="Button" />
</B24Chip>
```

---

### B24Container — layout container

Spacing/width wrapper, variants are theme-driven. Use for layout alignment.

---

### B24Separator — separator

A horizontal or vertical separator with optional label, icon, or avatar.

[Docs](docs/components/separator.md)

Key props:

- as?: any = 'div'
- label?: string
- icon?: IconComponent
- avatar?: AvatarProps
- accent?: theme.variants.accent — visual accent
- size?: theme.variants.size — line thickness (e.g., thin)
- type?: theme.variants.type — line style (e.g., solid)
- orientation?: 'horizontal' | 'vertical'
- decorative?: boolean — mark as decorative for a11y
- class?, b24ui?

Example:

```vue
<B24Separator label="Or" />
<B24Separator orientation="vertical" :class="'h-8'" />
```

---

### B24Skeleton — skeleton loader

Accessible loading placeholder.

[Docs](docs/components/skeleton.md)

Key props:

- as?: any = 'div'
- accent?: theme.variants.accent — intensity/accent color
- class?, b24ui?

Example:

```vue
<!-- Avatar and two lines -->
<div class="flex items-center gap-3">
  <B24Skeleton class="h-12 w-12 rounded-full" />
  <div class="space-y-2">
    <B24Skeleton class="h-4 w-[150px]" />
    <B24Skeleton class="h-4 w-[100px]" />
  </div>
</div>
```

---

### B24Countdown — countdown

Visual countdown with events, textual or circular display.

Key props:

- as?: any = 'span'
- size?: theme.variants.size
- seconds?: number | string — total seconds to count
- showMinutes?: boolean = true — show mm:ss instead of seconds
- useCircle?: boolean = false — circular progress ring
- interval?: number = 1000 — tick interval (ms)
- needStartImmediately?: boolean = true — autostart
- emitEvents?: boolean = true — emit lifecycle events
- now?: () => number — supply custom time source
- class?, b24ui?

Emits: start, progress(CountdownData), end, abort

Slots:

- leading — icon/avatar before label
- default({ formatTime, days, hours, minutes, seconds, totalSeconds, ... })

Example:

```vue
<B24Countdown :seconds="90" @end="notifyDone">
  <template #default="{ formatTime }">
    <span class="tabular-nums">{{ formatTime }}</span>
  </template>
</B24Countdown>

<B24Countdown :seconds="30" :use-circle="true" />
```

---

### B24DescriptionList — description list

Structured label/description pairs with optional leading icon/avatar and inline actions.

Key props:

- legend?: string — heading above the list
- text?: string — intro paragraph
- items?: Array<{ label?, description?, icon?, avatar?, actions?, orientation?: 'vertical'|'horizontal', class?, b24ui?, slot? }>
- labelKey?: string = 'label'
- descriptionKey?: string = 'description'
- size?: theme.variants.size
- class?, b24ui?

Slots:

- legend, text, footer
- content-top/content/content-bottom — per-item wrappers
- leading({ item, index }) — icon/avatar area
- label({ item, index }) — label
- description({ item, index }) — description
- actions({ item, index }) — inline actions

Example:

```vue
<B24DescriptionList
  legend="Task"
  :items="[
    { icon: InfoIcon, label: 'Owner', description: 'John Smith' },
    { avatar: { src: '/u.png' }, label: 'Assignee', description: 'Mary' , actions: [{ label: 'Change' }]},
    { label: 'Status', description: 'In progress', orientation: 'horizontal' }
  ]"
/>
```

---

### B24TableWrapper — table wrapper (content)

Wrapper for tables with scrollbars, zebra, pinning, and borders. Lives under content theme.

Key props:

- as?: any = 'div'
- size?: theme.variants.size
- rounded?: boolean
- zebra?: boolean — striped rows
- pinRows?: boolean — sticky header/footer rows
- pinCols?: boolean — sticky first/last columns
- rowHover?: boolean
- bordered?: boolean
- scrollbarThin?: boolean = true
- class?, b24ui?

Example:

```vue
<B24TableWrapper zebra bordered rounded>
  <table class="w-full text-left">
    <thead>
      <tr><th class="p-2">Name</th><th class="p-2">Role</th></tr>
    </thead>
    <tbody>
      <tr><td class="p-2">Alice</td><td class="p-2">Owner</td></tr>
      <tr><td class="p-2">Bob</td><td class="p-2">Editor</td></tr>
    </tbody>
  </table>
</B24TableWrapper>
```

---

### B24Kbd — keyboard key

Renders a key label; used inside Tooltip and menus.

Key props:

- as?: any = 'kbd'
- value?: string — key name (e.g., '⌘K', 'Esc')
- accent?: theme.variants.accent
- size?: theme.variants.size
- class?

Example:

```vue
Find <B24Kbd value="⌘K" />
```

---

### B24DropdownMenu — dropdown menu

Slots: trigger (default asChild) and content (via `B24DropdownMenuContent`).

Example:

```vue
<B24DropdownMenu>
  <template #default>
    <B24Button label="Open menu" use-dropdown />
  </template>
  <B24DropdownMenuContent>
    <!-- menu items -->
  </B24DropdownMenuContent>
</B24DropdownMenu>
```

---

### B24NavigationMenu — navigation menu

Hierarchical menu built on Reka NavigationMenu and Accordion. Props: items[], hover/click delays, disabled, type/collapsible, unmountOnHide.

---

### B24Navbar and sections

- `B24Navbar` — container
- `B24NavbarSection`, `B24NavbarDivider`, `B24NavbarSpacer` — sectioning/dividers in the header.

---

### B24Progress — progress bar

Example:

```vue
<B24Progress :value="60" :max="100" color="air-primary" />
```

---

### B24Range — range slider

Props: min/max/step, inverted, minStepsBetweenThumbs; name/disabled; size/color.

Example:

```vue
<B24Range :min="0" :max="100" :step="1" />
```

---

### B24Switch — switch

Boolean toggle.

Example:

```vue
<B24Switch v-model="enabled" color="air-primary" />
```

---

### B24Tabs — tabs

Slots for tab list and panels.

```vue
<B24Tabs v-model="tab">
  <!-- tabs and panels -->
</B24Tabs>
```

---

### B24Tooltip — tooltip

Example:

```vue
<B24Tooltip text="Tooltip">
  <B24Button :icon="HelpIcon" />
</B24Tooltip>
```

---

### B24Popover — popover

Use trigger and content slots; supports portal and positioning.

---

### B24Modal — modal dialog

Key props:

- title?, description?
- content?: Partial<DialogContentProps & Emits>
- overlay?: boolean
- overlayBlur?: 'auto'|'on'|'off'
- transition?: boolean
- fullscreen?: boolean
- portal?: boolean | string | HTMLElement
- `close?: boolean | Partial<ButtonProps>`
- closeIcon?: IconComponent
- dismissible?: boolean
- scrollbarThin?: boolean
- open/defaultOpen/modal (from Reka DialogRoot)
- class?, b24ui?

Slots:

- default({ open }) — trigger (asChild)
- content({ close }) — full custom content
- header({ close }), title, description, actions, close({ close, b24ui })
- body({ close }), footer({ close })

Example:

```vue
<B24Modal :dismissible="false" title="Title" description="Description" :overlay-blur="'auto'">
  <template #default="{ open }">
    <B24Button color="air-primary" @click="open">Open</B24Button>
  </template>
  <template #body="{ close }">
    <p>Modal content</p>
    <B24Button color="air-tertiary-no-accent" @click="close">Close</B24Button>
  </template>
  <template #footer="{ close }">
    <B24Button color="air-primary" @click="save">Save</B24Button>
    <B24Button color="air-tertiary-no-accent" @click="close">Cancel</B24Button>
  </template>
</B24Modal>
```

---

### B24Slideover — side panel

Like `B24Modal` but slides in from a side.

```vue
<B24Slideover :open="open" @update:open="v => open = v">
  <template #body="{ close }">
    <div class="p-4">Content</div>
    <B24Button color="air-tertiary-no-accent" @click="close">Close</B24Button>
  </template>
</B24Slideover>
```

---

### B24Toast / B24Toaster — toasts

- `B24Toaster` — the container/provider, mounted in `B24App`.
- `B24Toast` — a toast item (usually use `useToast` instead).

Example (via composable):

```ts
const toast = useToast()
const t = toast.add({ title: 'Success', description: 'Saved', color: 'success' })
setTimeout(() => toast.remove(t.id), 2000)
```

---

### Sidebar: B24SidebarLayout and parts

- `B24SidebarLayout` — main layout with header/body/footer/sections.
- Parts: `B24Sidebar`, `B24SidebarHeader`, `B24SidebarBody`, `B24SidebarFooter`, `B24SidebarSection`, `B24SidebarHeading`, `B24SidebarSpacer`.
- Composable: `useSidebarLayout()` — access loading states (isLoading/isParentLoading/isRootLoading) and setters.

Example:

```vue
<B24SidebarLayout>
  <B24SidebarHeader>Header</B24SidebarHeader>
  <B24SidebarBody>Body</B24SidebarBody>
</B24SidebarLayout>
```

---

### Content & Prose

- `B24ContentTableWrapper` — content table wrapper.
- Prose components (`B24ProseH1/H2/...`, `B24ProseP`, `B24ProseA`, `B24ProseTable`, etc.) — styled content tags.

---

### Alert / Advice — alerts and tips

Simple information blocks with slots and color/size variants.

Example:

```vue
<B24Alert color="air-primary">System message</B24Alert>
<B24Advice color="air-primary-success">Tip</B24Advice>
```

---

### Calendar — calendar

Date/range picker.

```vue
<B24Calendar v-model="date" />
```

---

### Link — link

Low-level link, used by `B24Button`. Props mirror routing / target / activeClass.

```vue
<B24Link to="/" active-class="text-ai-500">Home</B24Link>
```


## Composables (core)

### useToast

API for toasts.

- `add(toast: Partial<Toast>): Toast` — add
- `update(id, patch)`
- `remove(id)`
- `clear()`
- `toasts: Ref<Toast[]>`

Example:

```ts
const toast = useToast()
const t = toast.add({ title: 'Saved', description: 'Changes applied', color: 'success' })
setTimeout(() => toast.remove(t.id), 2000)
```

### useOverlay

Programmatic overlays (modals/slideover):

- `create(component, { defaultOpen?, props?, destroyOnClose? }) => instance`
- `instance.open(props?) => PromiseLike` with `result`
- `instance.close(value?)`
- `instance.patch(props)`
- `close(id)`, `closeAll()`, `unmount(id)`, `isOpen(id)`, `overlays`

Example:

```ts
const overlay = useOverlay()
const modal = overlay.create(MyModal, { props: { title: 'Welcome' } })
const opened = modal.open()
const result = await opened.result // wait for emit('close', payload)
```

### defineShortcuts

Register global keyboard shortcuts.

```ts
import { defineShortcuts } from '@bitrix24/b24ui-nuxt'

defineShortcuts({
  'mod+k': () => openCommandPalette(),
  'escape': () => closeAllOverlays()
})
```

### useKbd

Format keyboard combos for display.

```vue
Search <B24Kbd value="⌘K" />
```

### useLocale / defineLocale

Internationalization helpers.

### useConfetti

Trigger confetti animation.

```ts
import { useConfetti } from '@bitrix24/b24ui-nuxt'

const confetti = useConfetti()
confetti.fire({
  spread: 70,
  particleCount: 120,
  origin: { y: 0.6 }
})
```

### usePortal

Portal helpers for overlay components.


## Patterns and Best Practices

- Always wrap apps that use overlays/tooltips/toasts with `B24App`.
- For complex inputs, use `B24FormField` for correct ARIA wiring and error messages.
- Use `activeColor`/`activeClass` for link/active states.
- Leverage slots (`leading`, `trailing`, `content-*`) to match Bitrix24 UX precisely.
- For exact variant values, enumerate from `theme.variants` for each component at build/runtime.


## Links

- Docs: <https://bitrix24.github.io/b24ui/>
- Icons: <https://bitrix24.github.io/b24icons/>
- Demo playground: `/playgrounds/demo/app/`


## Exhaustiveness note on variant values

Some props are bound to theme tokens (theme variants). Get the allowed values programmatically:

```ts
import theme from '#build/b24ui/button'
const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)
```

This guarantees AI agents use only the values available in the current build theme.
