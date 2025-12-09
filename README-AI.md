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
    - [B24FieldGroup — grouped button-like elements](#b24fieldgroup--grouped-button-like-elements)
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
    - [B24Toast — toasts](#b24toast--toasts)
    - [Sidebar: B24SidebarLayout and parts](#sidebar-b24sidebarlayout-and-parts)
    - [Content \& Prose](#content--prose)
    - [Alert / Advice — alerts and tips](#alert--advice--alerts-and-tips)
    - [Calendar — calendar](#calendar--calendar)
    - [Link — link](#link--link)
  - [Composables (core)](#composables-core)
    - [useToast](#usetoast)
    - [useOverlay](#useoverlay)
    - [defineShortcuts](#defineshortcuts)
    - [useLocale / defineLocale](#uselocale--definelocale)
    - [useConfetti](#useconfetti)
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

## Using icons

We provide access to icons via the module `@bitrix24/b24icons-vue`.

Example
```vue
<script setup lang="ts">
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
</script>

<template>
<RocketIcon class="size-[15px]" />
</template>
```

The list of icons is in the file `node_modules/@bitrix24/b24icons-vue/dist/metadata.json`.

The data format is `{ list: string[] }`. Each line of the `list` array is written in the format `some-type:SomeNameIcon`.

The icon needs to be imported according to the following rule:

```ts
import SomeNameIcon from '@bitrix24/b24icons-vue/some-type/SomeNameIcon'
```

The text will further mention the `IconComponent` type. It means that the imported icon needs to be substituted into `props`.

Example
```vue
<script setup lang="ts">
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
</script>

<template>
<B24Avatar :icon="RocketIcon" />
</template>
```

## About theme variants

- Most visual props (`color`, `size`, `accent`, `indicator`, `overlayBlur`, etc.) are derived from a theme (imported from `#build/b24ui/<component>`).
- To get the exhaustive set of allowed values, read `theme.variants.<key>` for a component (see demo at `/playgrounds/demo/app/pages/components/button.vue`).
- Typical sets:
  - color: `air-*` families (e.g., `air-primary`, `air-secondary-no-accent`, `air-primary-success`, `air-primary-alert`, `air-primary-warning`, `air-primary-copilot`) and more depending on the component.
  - size: commonly `xs | sm | md | lg | xl` (exact set depends on component and theme).
  - accent: enumerations specific to the component.

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
  - booleans: loading, block, rounded, active, loadingAuto, useDropdown, useWait, useClock, normalCase

- FieldGroup
  - orientation: horizontal, vertical
  - size: xss, xs, sm, md, lg, xl
  - noSplit: true|false

- Badge
  - color: air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary, air-secondary-alert, air-secondary-accent, air-secondary-accent-1, air-secondary-accent-2, air-tertiary, air-selection; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - size: xss, xs, sm, md, lg, xl
  - square: true|false
  - inverted: true|false
  - useLink: true|false
  - useClose: true|false

- Input
  - size: xss, xs, sm, md, lg, xl
  - color: air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - type: hidden, text, password, email, search, tel, url, date, datetime-local, month, week, time, file
  - booleans: required, autofocus, rounded, noPadding, noBorder, underline, loading, highlight
  - placeholder: string
  - tag: string
  - tagColor: Badge color variant

- InputNumber
  - inherits Input variants

- InputMenu
  - inherits Input variants
  - adds:
    - items: InputMenuItem[] | InputMenuItem[][]
    - multiple: boolean
    - addNew: boolean

- Textarea
  - inherits Input variants
  - specific: autoresize (boolean)

- Select
  - inherits Input variants
  - adds:
    - items: SelectItem[] | SelectItem[][]
    - multiple: boolean

- SelectMenu
  - inherits Select variants
  - specific: 
    - items: SelectMenuItem[] | SelectMenuItem[][]
  - adds:
    - addNew: boolean

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

- Range
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
  - legend: string
  - text: string

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
  - src: string
  - icon: IconComponent

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
  - inverted: boolean
  - title: string
  - description: string

- Advice
  - angle: top, bottom
  - description: string
  - icon: IconComponent
  - avatar: AvatarProps

- DropdownMenu
  - items: DropdownMenuItem[] | DropdownMenuItem[][]

- NavigationMenu
  - orientation: horizontal, vertical
  - items: NavigationMenuItem[] | NavigationMenuItem[][]

- Modal
  - title: string
  - description: string
  - overlayBlur: auto, on, off
  - transition: boolean
  - fullscreen: boolean

- Slideover
  - title: string
  - description: string
  - overlayBlur: auto, on, off
  - side: bottom (preferably), right, left, top 
  - transition: boolean

- Tooltip
  - text: string

- Toast
  - color: air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - orientation: horizontal, vertical
  - title: boolean
  - description: string
  - icon: IconComponent
  - avatar: AvatarProps

- TableWrapper
  - size: xs, sm, md, lg
  - rounded: boolean
  - zebra: boolean
  - pinRows: boolean
  - pinCols: boolean
  - rowHover: boolean
  - bordered: boolean

- Chip
  - text: string | number
  - color: air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary, air-secondary-accent, air-secondary-accent-1, air-tertiary; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - size: sm, md, lg
  - position: top-right, bottom-right, top-left, bottom-left
  - inverted: boolean
  - inset: boolean
  - standalone: boolean
  - hideZero: boolean

- Calendar
  - color: air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning; deprecated: default, danger, success, warning, primary, secondary, collab, ai
  - size: xs, sm, md, lg

- SidebarLayout
  - inner: boolean
  - offContentScrollbar: boolean
  - useLightContent: boolean
  - loading: boolean

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
- onClick?: `(event: MouseEvent) => void | Promise<void>`
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
  rounded
  :block="false"
  :loading-auto="true"
  :use-wait="false"
  use-clock
  use-dropdown
  to="/tasks"
  active-class="italic"
  inactive-class="opacity-80"
  :b24ui="{ baseLine: 'justify-center min-w-48', leadingIcon: 'text-(--ui-color-copilot-accent-primary)' }"
  @click="() => new Promise(res => setTimeout(res, 800))"
/>
```

---

### B24FieldGroup — grouped button-like elements

Provides `orientation`, `size`, and `noSplit` to child buttons via provide/inject.

Example:

```vue
<B24FieldGroup orientation="horizontal" size="md">
  <B24Button label="One" />
  <B24Button label="Two" />
  <B24Button label="Three" />
</B24FieldGroup>

<B24FieldGroup orientation="horizontal" size="md">
  <B24Input class="w-40" name="search" placeholder="Search..." aria-label="Search" />
  <B24Button label="Action" loading-auto @click="someAction" />
</B24FieldGroup>
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
  v-model.trim.number.nullify="login"
  id="login"
  name="login"
  placeholder="Login"
  color="air-primary"
  size="md"
  rounded
  :underline="false"
  :no-border="false"
  :no-padding="false"
  tag="Login"
  tag-color="air-primary"
  :highlight="hasError"
  autocomplete="off"
  :disabled="false"
  autofocus
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
- tag?: string
- tagColor?: BadgeProps['color']
- trailingIcon?: IconComponent — open icon (default chevron)
- selectedIcon?: IconComponent — selected item icon (default check)
- content?: popper/content props
- portal?: boolean | string | HTMLElement
- valueKey?: string (default 'value'), labelKey?: string (default 'label')
- items?: Array<SelectItem | SelectItem[]> — primitives or objects: { label?, value?, type?: 'label'|'separator'|'item', icon?, avatar?, chip?, disabled?, onSelect?, class?, b24ui? }
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
  v-model="selectedValues"
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
  :portal="true"
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
  required
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
  v-model="priority"
  legend="Priority"
  :items="[
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'med', description: 'Default' },
    { label: 'High', value: 'high', disabled: true }
  ]"
  color="air-primary"
  size="md"
  orientation="vertical"
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

- label({ label })
- hint({ hint })
- description({ description })
- help({ help })
- error({ error })
- default({ error })

Example:

```vue
<B24Form @submit="onSubmit">
  <B24FormField name="email" label="Email" required hint="Work email">
    <template #default="{ error }">
      <B24Input
        v-model.trim="email"
        type="email"
        :highlight="!!error"
        placeholder="name@company.com"
      />
    </template>
  </B24FormField>
  <B24Button type="submit" color="air-primary" loading-auto>Submit</B24Button>
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
<B24Avatar text="AB" chip size="lg" />
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
- `onCloseClick?: (event: MouseEvent) => void | Promise<any>
- icon/avatar/leading, class?, b24ui?

Slots: leading, default, trailing

Example:

```vue
<B24Badge
  :icon="InfoIcon"
  label="New"
  color="air-primary"
  size="sm"
  use-link
  use-close
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
    <div class="p-[12px]">Custom body for: {{ item.label }}</div>
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

### B24Separator — separator

A horizontal or vertical separator with optional label, icon, or avatar.

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
<B24Separator orientation="vertical" decorative class="h-8" />
```

---

### B24Skeleton — skeleton loader

Accessible loading placeholder.

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

<B24Countdown :seconds="30" use-circle />
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
  <table>
  <colgroup>
        <col>
        <col class="min-w-[200px]">
      </colgroup>
    <thead>
      <tr>
        <th>Name</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alice</td>
        <td>Owner</td>
      </tr>
      <tr>
        <td>Bob</td>
        <td>Editor</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th />
        <td>Deal Name</td>
      </tr>
    </tfoot>
  </table>
</B24TableWrapper>
```

---

### B24Kbd — keyboard key

Renders a key label; used inside Tooltip and menus.

Key props:

- as?: any = 'kbd'
- value?: string — key name (e.g., 'meta', 'ctrl', 'alt', 'win', 'command', 'shift', 'control', 'option', 'enter', 'delete', 'backspace', 'escape', 'tab', 'capslock', 'arrowup', 'arrowright', 'arrowdown', 'arrowleft', 'pageup', 'pagedown', 'home', 'end' )
- accent?: theme.variants.accent
- size?: theme.variants.size (sm/md/lg depends on theme)
- class?

Example:

```vue
Find <div class="inline-flex items-center justify-center gap-[4px]"><B24Kbd value="meta" /> <B24Kbd value="k" /></div>
```

---

### B24DropdownMenu — dropdown menu

Slots: trigger (default asChild) and content (via `B24DropdownMenuContent`).

Example:

```vue
<B24DropdownMenu
  :items="dropdownMenuItems"
>
  <B24Button label="Open menu" use-dropdown />
</B24DropdownMenu>
```

---

### B24NavigationMenu — navigation menu

Hierarchical menu built on Reka NavigationMenu and Accordion. Props: items[], hover/click delays, disabled, type/collapsible, unmountOnHide.

```vue
<B24NavigationMenu
  :items="navigationMenuItems"
  orientation="horizontal"
/>
```

---

### B24Navbar and sections

- `B24Navbar` — container
- `B24NavbarSection`, `B24NavbarDivider`, `B24NavbarSpacer` — sectioning/dividers in the header.

---

### B24Progress — progress bar

Example:

```vue
<B24Progress
  :value="60"
  :max="100"
  color="air-primary"
/>
```

---

### B24Range — range slider

Props: min/max/step, inverted, minStepsBetweenThumbs; name/disabled; size/color.

Example:

```vue
<B24Range
  v-model="value"
  :min="0"
  :max="100"
  :step="1"
/>
```

---

### B24Switch — switch

Boolean toggle.

Example:

```vue
<B24Switch
  v-model="enabled"
  color="air-primary"
/>
```

---

### B24Tabs — tabs

Slots for tab list and panels.

```vue
<B24Tabs
  v-model="active"
  :items="[
    {
      label: 'Account',
      description: 'Make changes to your account here. Click save when you\'re done.',
      icon: UserIcon,
      slot: 'account'
    },
    {
      label: 'Password',
      description: 'Change your password here. After saving, you\'ll be logged out.',
      icon: Shield2ContourIcon,
      slot: 'password'
    }
  ]"
  :items="items"
  class="w-full"
>
  <template #account="{ item }">
    <ProseP accent="less" class="mb-4 text-md">
      {{ item.description }}
    </ProseP>
  </template>
  <template #password="{ item }">
    <ProseP accent="less" small class="mb-4">
      {{ item.description }}
    </ProseP>
  </template>
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

Example:

```vue
<B24Popover :b24ui="{ content: 'p-[10px]' }">
  <B24Button label="Open" />

  <template #content>
    <ProseP>
      Some text
    </ProseP>
  </template>
</B24Popover>
```
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
- close?: boolean | Partial<ButtonProps>
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
<B24Modal
  title="Title"
  description="Description"
>
  <B24Button color="air-primary">Open</B24Button>
  <template #body>
    <ProseP>Modal content</ProseP>
  </template>
  <template #footer="{ close }">
    <div class="flex flex-row gap-[10px]">
      <B24Button color="air-primary" @click="save">Save</B24Button>
      <B24Button color="air-tertiary" @click="close">Cancel</B24Button>
    </div>
  </template>
</B24Modal>
```

---

### B24Slideover — side panel

Like `B24Modal` but slides in from a side.

```vue
<B24Slideover :open="open" @update:open="v => open = v">
  <template #body>
    <ProseP>Content</ProseP>
  </template>
  <template #footer="{ close }">
    <div class="w-1/5 flex justify-start" />
      <div class="w-full flex flex-row justify-center gap-[10px]">
        <B24Button label="Send" color="air-primary" @click="send" />
        <B24Button label="Cancel" color="air-tertiary" @click="close" />
      </div>
      <div class="w-1/5 flex justify-end">
        <B24Button label="Full version" size="sm" color="air-tertiary-no-accent" @click="someAction" />
      </div>
  </template>
</B24Slideover>
```

---

### B24Toast — toasts

- `B24Toast` — a toast item (usually use `useToast` instead).

Example (via composable):

```ts
const toast = useToast()
toast.add({ title: 'Success', description: 'Saved', color: 'air-primary-success' })
```

---

### Sidebar: B24SidebarLayout and parts

- `B24SidebarLayout` — main layout with header/body/footer/sections.
- Parts: `B24Sidebar`, `B24SidebarHeader`, `B24SidebarBody`, `B24SidebarFooter`, `B24SidebarSection`, `B24SidebarHeading`, `B24SidebarSpacer`.

Example:

```vue
<B24SidebarLayout>
  <template #sidebar>
    <B24SidebarHeader>
      <!-- Navigation header -->
      <div class="h-full flex items-center relative my-0 ps-[25px] pe-xs rtl:pe-[25px]">
        <ProseH4 class="font-(--ui-font-weight-medium) mb-0">SideBar</ProseH4>
      </div>
    </B24SidebarHeader>
    <B24SidebarBody>
      <!-- Navigation elements -->
      <B24SidebarSection>
        <B24NavigationMenu
          :items="[{ label: 'Page 1', type: 'trigger', active: true }, { label: 'Page 2', type: 'trigger' }]"
          orientation="vertical"
        />
      </B24SidebarSection>

      <B24SidebarSpacer />
      <B24SidebarSection>
        <B24NavigationMenu
          :items="[{ label: 'Page 3', type: 'trigger' }, { label: 'Page 4', type: 'trigger' }]"
          orientation="vertical"
        />
      </B24SidebarSection>
    </B24SidebarBody>
    <B24SidebarFooter>
      <!-- Navigation footer -->
      <B24SidebarSection>
        <B24Link
          class="text-(length:--ui-font-size-sm) mb-2 flex flex-row items-center justify-between"
          to="https://bitrix24.github.io/b24ui/"
          target="_blank"
        >
          <div>@bitrix24/b24ui</div>
          <GoToLIcon class="size-4" />
        </B24Link>
        <B24Button
          block
          label="Use our Vue starter"
          color="air-boost"
          size="sm"
          :icon="RocketIcon"
          to="https://bitrix24.github.io/b24ui/"
          target="_blank"
        />
      </B24SidebarSection>
    </B24SidebarFooter>
  </template>

  <template #navbar>
    <!-- Your navigation bar -->
    <B24NavbarSection class="hidden sm:inline-flex">
      <B24NavigationMenu
        :items="[{ label: 'Page 1', type: 'trigger', active: true }, { label: 'Page 2', type: 'trigger' }]"
        orientation="horizontal"
      />
    </B24NavbarSection>
    <B24NavbarSpacer />
    <B24NavbarSection class="flex-row items-center justify-start gap-4">
      <B24DropdownMenu
        arrow
        :items="[{ label: 'Value 1' }, { label: 'Value 2' }]"
      >
        <B24Button
          color="air-secondary-accent"
          size="xs"
          rounded
          use-dropdown
          label="Action"
        />
      </B24DropdownMenu>
      <B24Switch
        v-model="checkedUseLightContent"
        size="xs"
      />
      <B24Button
        label="Reload"
        color="air-secondary-accent"
        rounded
        size="xs"
        loading-auto
        @click="handleAction"
      />
    </B24NavbarSection>
  </template>

  <template #content-top>
    <div class="w-full flex flex-col gap-[20px]">
      <div class="backdrop-blur-sm backdrop-brightness-110 px-[15px] py-[10px] flex flex-col items-start justify-between gap-[20px]">
        <div class="w-full flex flex-row items-center justify-between gap-[20px]">
          <div class="flex-1 flex flex-row items-center justify-end gap-[12px]">
            <B24Avatar
              :icon="BusinesProcessStagesIcon"
              alt="Workflows"
              size="xl"
              :b24ui="{
                root: 'bg-(--ui-color-primary-alt)',
                icon: 'size-[36px] text-(--ui-color-palette-white-base)'
              }"
            />
            <div class="flex-1">
              <!-- Page Title -->
              <ProseH1 class="text-(--b24ui-typography-label-color) leading-[29px] font-(--ui-font-weight-light)">
                Some title
              </ProseH1>
            </div>
          </div>
          <div class="flex-1 hidden sm:flex flex-row items-center justify-end gap-[12px]">
            <B24DropdownMenu
              :items="[{ label: 'Value 1' }, { label: 'Value 2' }]"
              arrow
              :content="{ side: 'bottom', align: 'center' }"
            >
              <B24Button size="sm" :icon="MoreMIcon" color="air-secondary-accent" />
            </B24DropdownMenu>
          </div>
        </div>
        <div>
          <MockSidebarLayoutMenu orientation="horizontal" />
        </div>
      </div>

      <!-- Page SubTitle -->
      <ProseH2 class="font-(--ui-font-weight-semi-bold) mb-0">
        Some sub-title
      </ProseH2>
    </div>
  </template>

  <template #content-actions>
    <!-- Actions on page -->
    <B24Button
      color="air-secondary-accent"
      label="Action"
      loading-auto
      @click="handleAction"
    />
  </template>

  <!-- Main content -->
  <div>
    <ProseP>Your main content goes here</ProseP>
  </div>

  <template #content-bottom>
    <!-- Bottom of page -->
    <ProseP small accent="less-more" class="px-[22px] pb-[2px]">
      Footer or additional information
    </ProseP>
  </template>
</B24SidebarLayout>
```

---

### Content & Prose

- Prose components (`ProseH1/H2/...`, `ProseP`, `ProseA`, `ProseTable`, etc.) — styled content tags.

---

### Alert / Advice — alerts and tips

Simple information blocks with slots and color/size variants.

Example:

```vue
<B24Alert
  :icon="SignIcon"
  :title="title"
  :description="description"
  :color="air-primary"
  inverted
/>
<B24Advice :description="description" :avatar="{ src: '/b24ui/avatar/assistant.png' }" />
<B24Advice :avatar="{ src: '/b24ui/avatar/assistant.png' }">
  <ProseP>Typically, instructions on how to add a SAML application and add the ACS URL and SP Entity ID can be found in the Microsoft Azure technical documentation. </ProseP>
  <B24Link to="https://github.com/bitrix24/b24ui/" target="_blank" is-action>
    Read more
  </B24Link>
</B24Advice>
<B24Advice angle="top" :avatar="{ src: '/b24ui/avatar/employee.png' }">
  <div class="flex flex-col items-start justify-between gap-1.5">
    <ProseH3>
      Reference information
    </ProseH3>
    <ProseP>Typically, instructions on how to add a SAML application and add the ACS URL and SP Entity ID can be found in the Microsoft Azure technical documentation.</ProseP>
    <div class="mt-2 flex flex-row flex-wrap items-start justify-between gap-2">
      <B24Button size="xs" color="air-primary" label="some action 1" />
      <B24Button size="xs" color="air-secondary" label="some action 2" />
      <B24Button size="xs" color="air-tertiary-no-accent" :icon="DotsIcon" />
    </div>
  </div>
</B24Advice>
```

---

### Calendar — calendar

Date/range picker.

```vue
<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate } from '@internationalized/date'

const value = shallowRef(new CalendarDate(2012, 4, 12))
</script>

<template>
  <B24Calendar v-model="value" />
</template>
```

---

### Link — link

Low-level link, used by `B24Button`. Props mirror routing / target / activeClass.

```vue
<B24Link to="/" target="_blank">Home</B24Link>
<B24Link is-action to="https://bitrix24.github.io/b24ui/components/link.html" target="_blank">
  Link action
</B24Link>
<B24Link is-action>
  Button action
</B24Link>
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
toast.add({ title: 'Saved', description: 'Changes applied', color: 'air-primary-success' })
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
  'meta_k': () => openCommandPalette(),
  'escape': () => closeAllOverlays()
})
```

### useLocale / defineLocale

Internationalization helpers.

### useConfetti

Trigger confetti animation.

```ts
import { useConfetti } from '@bitrix24/b24ui-nuxt'

const confetti = useConfetti()
confetti.fire()
```

## Patterns and Best Practices

- Always wrap apps that use overlays/tooltips/toasts with `B24App`.
- For complex inputs, use `B24FormField` for correct ARIA wiring and error messages.
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
