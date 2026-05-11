# Component Structure

## File Location

Components live in `src/runtime/components/` with PascalCase naming (e.g., `Button.vue`, `InputMenu.vue`).

## Standard Component Template

```vue
<script lang="ts">
// 1. Type imports first (always separate)
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../types/tv'

// 2. Theme import
import theme from '#build/b24ui/component-name'

// 3. Type definition
type ComponentName = ComponentConfig<typeof theme, AppConfig, 'componentName'>

// 4. Props interface with JSDoc defaults
export interface ComponentNameProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * @defaultValue 'primary'
   */
  color?: ComponentName['variants']['color']
  /**
   * @defaultValue 'md'
   */
  size?: ComponentName['variants']['size']
  class?: any
  b24ui?: ComponentName['slots']
}

// 5. Slots interface - always pass b24ui for customization
//    Return type is VNode[], slots are optional with `?`
export interface ComponentNameSlots {
  default?(props: { b24ui: ComponentName['b24ui'] }): VNode[]
}
</script>

<script setup lang="ts">
// 6. Regular imports (separate from type imports)
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'

// 7. Raw props (use withDefaults only when you actually need a runtime default)
const _props = defineProps<ComponentNameProps>()
const slots = defineSlots<ComponentNameSlots>()

// 8. Theme-aware proxy: resolves explicit > <B24Theme :props> > withDefaults
//    > app.config.b24ui.<name>.defaultVariants. The `b24ui` prop is deep-merged
//    automatically, so reach for `props.b24ui?.<slot>` in the template.
//    `theme.defaultVariants` is NOT in this chain — it only feeds `tv()`
//    class resolution.
const props = useComponentProps('componentName', _props)

// 9. App config
// 10. Computed UI - always computed for reactivity
// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ 
  extend: tv(theme),
  ...(appConfig.b24ui?.componentName || {})
})({
  color: props.color,
  size: props.size
}))
</script>

<template>
  <!-- 11. data-slot on every element, always read props as `props.x` -->
  <Primitive :as="props.as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <slot :b24ui="b24ui" />
  </Primitive>
</template>
```

## Reka UI Components

For components wrapping Reka UI primitives (example: `Collapsible.vue`):

```vue
<script lang="ts">
import type { CollapsibleRootProps, CollapsibleRootEmits } from 'reka-ui'
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/collapsible'
import type { ComponentConfig } from '../types/tv'

type Collapsible = ComponentConfig<typeof theme, AppConfig, 'collapsible'>

export interface CollapsibleProps extends Pick<CollapsibleRootProps, 'defaultOpen' | 'open' | 'disabled' | 'unmountOnHide'> {
  as?: any
  class?: any
  b24ui?: Collapsible['slots']
}

export interface CollapsibleEmits extends CollapsibleRootEmits {}

export interface CollapsibleSlots {
  default?(props: { open: boolean }): VNode[]
  content?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useForwardProps } from '../composables/useForwardProps'
import { tv } from '../utils/tv'

const _props = withDefaults(defineProps<CollapsibleProps>(), {
  unmountOnHide: true
})
const emits = defineEmits<CollapsibleEmits>()
const slots = defineSlots<CollapsibleSlots>()

// Theme-aware proxy. `props` deep-merges `b24ui` and resolves <B24Theme :props> defaults.
const props = useComponentProps('collapsible', _props)

const appConfig = useAppConfig() as Collapsible['AppConfig']

// Pick from `props` (the proxy) so theme-supplied values flow through.
// Use the local `useForwardProps` — reka-ui's `useForwardProps` /
// `useForwardPropsEmits` filter root props by `vm.vnode.props ∪ withDefaults`
// and would strip <B24Theme :props> values.
const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultOpen', 'open', 'disabled', 'unmountOnHide'), emits)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.collapsible || {}) })())
</script>

<template>
  <CollapsibleRoot v-slot="{ open }" v-bind="rootProps" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <CollapsibleTrigger v-if="!!slots.default" as-child>
      <slot :open="open" />
    </CollapsibleTrigger>

    <CollapsibleContent data-slot="content" :class="b24ui.content({ class: props.b24ui?.content })">
      <slot name="content" />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
```

## Generic Components

For components with typed items (Accordion, Select, Table):

```vue
<script lang="ts">
import type { IconComponent } from '../types'

export interface AccordionItem {
  label?: string
  icon?: IconComponent
  content?: string
  value?: string
  disabled?: boolean
  [key: string]: any
}

export interface AccordionProps<T extends AccordionItem = AccordionItem> {
  items?: T[]
  // ...
}
</script>

<script setup lang="ts" generic="T extends AccordionItem">
const props = withDefaults(defineProps<AccordionProps<T>>(), {
  type: 'single',
  collapsible: true
})
</script>
```

## Form Components

For inputs that integrate with UForm:

```vue
<script setup lang="ts">
import { useFormField } from '../composables/useFormField'
import { useFieldGroup } from '../composables/useFieldGroup'

defineOptions({ inheritAttrs: false })

// Pass raw `_props` (not the proxy) so the wrapping `<B24FormField>` /
// `<B24FieldGroup>` keep precedence over `<B24Theme :props>` / `withDefaults` /
// `app.config` defaults. Their internal fallback is `props?.x ?? injected.x`,
// so handing them the proxy would leak theme defaults into "explicit prop"
// and silently override the wrapper.
const {
  id, name, size: formFieldSize, color, highlight, disabled, 
  ariaAttrs, emitFormBlur, emitFormInput, emitFormChange 
} = useFormField<InputProps>(_props, { deferInputValidation: true })

const { orientation, size: fieldGroupSize } = useFieldGroup<InputProps>(_props)

const inputSize = computed(() => fieldGroupSize.value || formFieldSize.value)

// In `tv()` calls, fall back to `props.X` (the proxy) so `<B24Theme :props>`
// applies when there is no wrapping FormField/FieldGroup. Without `?? props.X`,
// theme size/color/highlight is silently dropped on bare inputs.
//
// Final precedence: explicit > closer-context (form/group) > <B24Theme :props>
//                   > withDefaults > app.config > tv defaults
// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.input || {}) })({
  color: color.value ?? props.color,
  size: inputSize.value ?? props.size,
  highlight: highlight.value ?? props.highlight
}))
</script>

<template>
  <input
    :id="id"
    :name="name"
    :disabled="disabled"
    v-bind="{ ...$attrs, ...ariaAttrs }"
    @blur="emitFormBlur"
    @input="emitFormInput"
    @change="emitFormChange"
  >
</template>
```

The same `?? props.X` pattern applies to `useAvatarGroup` (`size`) and any other context composable whose contract is `props?.x ?? injected.x`. The composable itself stays untouched — the fallback lives at the `tv()` call site so the wrapper-vs-theme precedence is explicit and reviewable.

## Components with Icons

```vue
<script setup lang="ts">
import type { IconComponent } from '../types'
import { useComponentIcons } from '../composables/useComponentIcons'

const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props)
</script>

<template>
  <Component
    :is="leadingIconName"
    v-if="isLeading && leadingIconName"
    data-slot="leadingIcon"
    :class="b24ui.leadingIcon({ class: uiProp?.leadingIcon })"
  />
</template>
```

## Components with Embedded Avatar

Components that render a leading visual which can be either a plain icon **or** a `B24Avatar` (`Button`, `ChatMessage`, `Badge`, `Input`, `Select`, `Tabs`, `Countdown`, `PageCard`, `PageCardGroup`) follow a single canonical template. The icon path takes precedence — `avatar` is the fallback when no icon is set:

```vue
<script lang="ts">
import type { AvatarProps } from '../types'

export interface ComponentNameProps {
  /** @IconComponent */
  icon?: IconComponent
  /** Rendered as `B24Avatar` when `icon` is not set. */
  avatar?: AvatarProps
  // ...
}
</script>

<script setup lang="ts">
import B24Avatar from './Avatar.vue'
</script>

<template>
  <Component
    :is="props.icon"
    v-if="props.icon"
    data-slot="leadingIcon"
    :class="b24ui.leadingIcon({ class: props.b24ui?.leadingIcon })"
  />
  <B24Avatar
    v-else-if="!!props.avatar"
    :size="((props.b24ui?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])"
    v-bind="props.avatar"
    data-slot="leadingAvatar"
    :class="b24ui.leadingAvatar({ class: props.b24ui?.leadingAvatar })"
  />
</template>
```

**Attribute order matters.** Vue applies later bindings on top of earlier ones:

| Position | Why |
|---|---|
| `:size="…"` **before** `v-bind="props.avatar"` | `props.avatar.size` (user-supplied) can override the theme-derived size |
| `:class="…"` **after** `v-bind="props.avatar"` | The wrapper class slot always wins over any `class` key inside `props.avatar` |

The `leadingAvatarSize` slot is a **value slot**, not a CSS class — see [theme-structure.md](./theme-structure.md#value-slots-avatar-size-badge-size-) for the "base must be empty when size variant supplies the value" rule. Forgetting it collapses the avatar to 0×0.

### Item-Based Components (PageCardGroup-style)

For components driven by an `items` array where each item can carry either an `icon` field or an `avatar` field (`PageCardGroup`):

```ts
export interface PageCardGroupItem {
  /** Plain icon — wins over `avatar` when both are set. */
  icon?: IconComponent
  /** Full `B24Avatar` config. Used only when `icon` is not set. */
  avatar?: Partial<AvatarProps>
  // ...
}

export interface PageCardGroupProps {
  /** Group-level Avatar defaults. Per-item `avatar` field merges on top. */
  avatar?: Partial<AvatarProps>
  // ...
}
```

```ts
function getItemIcon(item: PageCardGroupItem): IconComponent | undefined {
  return get(item, props.iconKey!) as IconComponent | undefined
}

function getItemAvatar(item: PageCardGroupItem): AvatarProps | undefined {
  // Top-level icon wins — Avatar mode disabled when both are set on the item.
  if (getItemIcon(item)) return undefined

  const itemAvatar = item.avatar
  if (!itemAvatar && !props.avatar) return undefined

  return {
    ...props.avatar,   // group defaults
    ...itemAvatar,     // per-item overrides win
    alt: itemAvatar?.alt ?? (get(item, props.labelKey!) as string | undefined)
  } as AvatarProps
}
```

Hand the resolved values to the inner `PageCard` (which owns the icon/avatar rendering branch):

```vue
<B24PageCard
  :icon="getItemIcon(item)"
  :avatar="getItemAvatar(item)"
  :b24ui="innerCardUI"
/>
```

**Merge order is `{ ...group, ...item }` — per-item values win.** This is hidden state: if every item already carries `avatar.color`, the group `:avatar.color` is invisible. Document the order on the prop and, in the playground, split controls so the per-item palette and the group umbrella color don't silently override each other (e.g. disable the group color picker while a per-item palette is on).

### Size Sync (Plain Icon and Avatar)

When the same component renders both branches (plain icon AND avatar), both must scale from the same `size` variant. Otherwise the plain-icon path looks tiny next to the avatar circle. Define a `leadingIcon` size override alongside `leadingAvatarSize`:

```ts
// src/theme/page-card-group.ts
size: {
  sm: { leadingIcon: 'size-7 shrink-0',  leadingAvatarSize: 'sm' }, // ~28 px
  md: { leadingIcon: 'size-8 shrink-0',  leadingAvatarSize: 'md' }, // ~32 px
  lg: { leadingIcon: 'size-10 shrink-0', leadingAvatarSize: 'lg' }  // ~40 px
}
```

Forward both to the child through `innerCardUI`:

```ts
const innerCardUI = computed(() => ({
  // ...
  leadingIcon: b24ui.value.leadingIcon({ class: props.b24ui?.leadingIcon }),
  leadingAvatar: b24ui.value.leadingAvatar({ class: props.b24ui?.leadingAvatar }),
  leadingAvatarSize: (props.b24ui?.leadingAvatarSize as string) || b24ui.value.leadingAvatarSize()
}))
```

### Verification Checklist

The 0×0 bug is invisible until you read the rendered DOM. Verify, don't eyeball:

- [ ] Inline-snapshot test for each `size` variant — assert the Avatar root has `class="… size-N …"` and the plain-icon SVG has `class="… size-N …"`
- [ ] Snapshot test that toggling `item.icon` ↔ `item.avatar` actually switches the leading visual
- [ ] `nuxt prepare` after editing `src/theme/*.ts` — otherwise `.nuxt/b24ui/*` is stale and runtime reads the old slot values
- [ ] `nuxt typecheck` against every consumer that imports the theme (`docs/`, `playgrounds/demo`, `playgrounds/nuxt`) — root `vue-tsc` cannot resolve `#build` and silently passes

## Exposing Refs

```vue
<script setup lang="ts">
const inputRef = useTemplateRef('inputRef')

defineExpose({
  inputRef
})
</script>
```

## Theme Defaults

`useComponentProps` is the primary integration with `<B24Theme>`. The proxy resolves the priority chain **explicit prop > nearest `<B24Theme :props>` > `withDefaults` > `app.config.b24ui.<name>.defaultVariants`** for every prop — including ones driving template logic that `tv().defaultVariants` can't reach (`<component :is>`, `v-if`, computed conditionals). `theme.defaultVariants` is intentionally NOT in the proxy chain — it only feeds `tv()` class resolution. If a prop value is consumed in template logic, it must come from one of the proxy-resolved sources (typically `withDefaults`):

```vue
<template>
  <component :is="props.variant === 'list' ? 'div' : Label" />
</template>
```

Notes:
- The proxy passes through to `_props` for explicitly set props, so `withDefaults` fallbacks stay lower priority than `<B24Theme>` overrides.
- The `b24ui` prop is deep-merged (slot classes layered on top of theme overrides). All other props are explicit-wins.
- **Always read props as `props.x` in templates and `<script setup>`.** Bare prop names (`{{ label }}`, `v-if="arrow"`) resolve to `_props` and bypass the proxy, so `<B24Theme :props>` defaults won't apply. The `bitrix24-ui/no-bare-prop-refs` ESLint rule autofixes this.
- Pass the **raw** `_props` (not the proxy) to context composables — `useFormField`, `useFieldGroup`, `useAvatarGroup`. Their internal fallback is `props?.x ?? injected.x`, so the wrapping `<B24FormField>` / `<B24FieldGroup>` / `<B24AvatarGroup>` should beat `<B24Theme :props>` / `withDefaults` / `app.config` defaults (closer context wins). **Then always fall back to the proxy in `tv()` calls** — `size: formSize.value ?? props.size`, `color: color.value ?? props.color`, `highlight: highlight.value ?? props.highlight`. Without `?? props.X`, `<B24Theme :props>` is silently dropped when no closer context wraps the component. Final chain: `explicit > closer-context > B24Theme > withDefaults > app.config > tv defaults`. `useComponentIcons` has no injection chain, so pass the proxy `props` directly.
- Reka primitives' `useForwardProps` / `useForwardPropsEmits` filter root props by `vm.vnode.props ∪ withDefaults` and would strip theme-supplied values. Import `useForwardProps` from `composables/useForwardProps.ts` instead — same `(source, emits?)` signature, proxy-aware.

## Key Patterns

| Pattern | Usage |
|---|---|
| `useComponentProps(name, _props)` | Theme-aware proxy — default for new components |
| `useForwardProps(source, emits?)` (local) | Forward Reka UI props/emits without filtering theme defaults |
| `withDefaults` | Runtime default values |
| `defineOptions({ inheritAttrs: false })` | When spreading `$attrs` to inner element |
| `reactivePick` | Pick keys off `props` (the proxy) before forwarding |
| `createReusableTemplate` | Complex template reuse (Table, Modal) |
| `useTemplateRef` | Template refs (Vue 3.5+) |
| `toRef(() => props.x)` | Reactive prop access |

## Export Types

Add to `src/runtime/types/index.ts`:

```ts
export * from '../components/ComponentName.vue'
```

## Playground and Demo Registration

Every component must be reachable from both playground sidebars, otherwise reviewers cannot open it. After creating a demo page, register its slug in the matching `useNavigation.ts`.

| Page file | Navigation file |
|---|---|
| `playgrounds/nuxt/app/pages/components/<name>.vue` | `playgrounds/nuxt/app/composables/useNavigation.ts` |
| `playgrounds/demo/app/pages/components/<name>.vue` | `playgrounds/demo/app/composables/useNavigation.ts` |

In each `useNavigation.ts`, add the kebab-case slug to the `components` array (alphabetical, matching the file name):

```ts
const components = [
  // ...
  'page-card',
  'page-card-group', // <-- new entry
  'page-columns',
  // ...
]
```

Both arrays must stay in sync. Forgetting either side leaves an orphan page that 404s from the sidebar.

## Register in `ThemeDefaults`

The `ThemeDefaults` interface in `src/runtime/composables/useComponentProps.ts` powers autocomplete inside `<B24Theme :props="{ componentName: { … } }">`. The CLI scaffolder (`bitrix24-ui make component`) auto-inserts the entry; only do this manually if you skipped the CLI:

```ts
export interface ThemeDefaults {
  // ... existing entries
  componentName?: Partial<ComponentTypes.ComponentNameProps>
}
```

The key is the component name in camelCase (matches the `#build/b24ui` registry). The value is `Partial<XProps>`. This is a flat literal interface (not a mapped type) because Volar only surfaces inner-prop autocomplete for interface members, not mapped-type members, in template inline objects.
