# Theming

## Semantic colors

| Color | Purpose |
|---|---|
| **Primary** | **High-emphasis elements and core states** |
| air-primary | Main CTAs, active states, and primary branding |
| air-primary-success | Positive outcomes, completed tasks, and success messages |
| air-primary-alert | Critical errors, destructive actions, and high-priority alerts |
| air-primary-copilot | Dedicated accents for AI features and assistant interactions |
| air-primary-warning | Cautions, status delays, and items requiring attention |
| **Secondary** | **Medium-emphasis and functional support** |
| air-secondary | Secondary actions, alternative buttons, and UI backgrounds |
| air-secondary-alert | Subtle error states or non-critical destructive feedback |
| air-secondary-accent | General informational highlights and system notifications |
| air-secondary-accent-1 | Additional coding for categorization or data visualization |
| air-secondary-accent-2 | Secondary coding for visual grouping and variety |
| air-secondary-no-accent | Neutral functional states without specific color meaning |
| **Tertiary & Utility** | **Low-emphasis and specialized use cases** |
| air-tertiary-accent | Subtle interactive states and faint background highlights |
| air-tertiary-no-accent | Borders, secondary text, and low-visibility dividers |
| air-selection | Selection states, focus indicators, and highlighted items |
| air-boost | High-impact marketing highlights and attention-grabbing features |

## CSS utilities

### Text

| Class | Use |
|---|---|
| `text-muted` | Low-emphasis text |
| `text-dimmed` | Placeholders, hints |
| `text-description` | Body text, description |
| `text-legend` | Subtitles |
| `text-label` | Headings, emphasis |

### Background

| Class | Use |
|---|---|---|---|
| `bg-default` | Page background |
| `bg-muted` | Subtle sections |
| `bg-elevated` | Cards, modals |
| `bg-accented` | Hover states |
| `bg-inverted` | Inverted sections |

### Border

| Class | Use |
|---|---|
| `border-default` |
| `border-muted` |
| `border-accented` |
| `border-inverted` |

### CSS variables

All customizable in `main.css`:

```css
:root {
  --b24ui-container-width: 80rem;         /* B24Container max-width */
  --b24ui-header-height: 4rem;            /* B24Header height */
}
```

## Component theme customization

### How it works

Components are styled with [Tailwind Variants](https://www.tailwind-variants.org/). The theme defines:

- **`slots`** — named style targets (e.g., `root`, `base`, `label`, `leadingIcon`)
- **`variants`** — styles applied based on props (e.g., `color`, `size`)
- **`compoundVariants`** — styles for specific prop combinations (e.g., `color: 'air-primary'`)
- **`defaultVariants`** — default prop values when none are specified

### Override priority

**`:b24ui` prop / `class` prop > theme defaults**

The `b24ui` prop overrides slots **after** variants are computed. If the `size: 'md'` variant applies `size-5` to `trailingIcon`, and you set `:b24ui="{ trailingIcon: 'size-3' }"`, the `size-3` wins.

Tailwind Variants uses [tailwind-merge](https://github.com/dcastil/tailwind-merge) under the hood so conflicting classes are resolved automatically.

### Understanding the generated theme

Every component's full resolved theme is generated at build time. Always read this file before customizing a component — it shows exactly what classes are applied where.

- **Nuxt**: `.nuxt/b24ui/<component>.ts`
- **Vue**: `node_modules/.b24ui-nuxt/b24ui/<component>.ts`

For example, the card theme:

```ts
export default {
  slots: {
    root: 'overflow-hidden rounded-(--ui-border-radius-md)',
    header: 'p-[24px] sm:px-[22px] sm:py-[15px]',
    body: 'p-[24px] sm:px-[22px] sm:py-[15px]',
    footer: 'p-[24px] sm:px-[22px] sm:py-[15px]'
  },
  variants: {
    variant: {
      'tinted': {
        root: 'bg-(--ui-color-design-tinted-bg) border border-(--ui-color-design-tinted-stroke) border-(length:--ui-design-tinted-stroke-weight) text-(--ui-color-design-tinted-content)',
        header: 'border-b border-(--ui-color-design-tinted-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-tinted-content-divider) border-t-1'
      },
      'outline': {
        root: 'bg-(--ui-color-design-outline-bg) border border-(--ui-color-design-outline-stroke) border-(length:--ui-design-outline-stroke-weight) text-(--ui-color-design-outline-content)',
        header: 'border-b border-(--ui-color-design-outline-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-outline-content-divider) border-t-1'
      }
    }
  },
  defaultVariants: {
    variant: 'outline'
  }
}
```

### Per-instance (`b24ui` prop)

Overrides slots after variant computation:

```vue
<B24Button :b24ui="{ base: 'rounded-none', trailingIcon: 'size-3 rotate-90' }" />
<B24Card :b24ui="{ root: 'bg-muted', body: 'p-8' }" />
```

### Per-instance (`class` prop)

Overrides the `root` or `base` slot:

```vue
<B24Button class="rounded-none">Square</B24Button>
```

Components without slots (e.g., `B24Container`, `B24Skeleton`, `B24Main`) only have the `class` prop.

### Theme structure patterns

**Slots-based** (most components — `slots` is an object in the generated theme):

```ts
// per instance
<B24Button :b24ui="{ base: 'font-bold' }" />
```

**Flat base** (`base` is a top-level string in the generated theme):

```ts
// per instance — class prop only
<B24Container class="max-w-lg" />
```

Always check the generated theme file to see which pattern applies.

## Dark mode

```ts
const colorMode = useColorMode()
colorMode.preference = 'dark' // 'light', 'dark', 'system'
```

```vue
<B24ColorModeButton /> <!-- Toggle -->
<B24ColorModeSelect /> <!-- Dropdown -->
```

## Brand customization playbook

Bitrix24 UI provides a native look and feel out of the box, so your app fits the environment perfectly without extra styling.
