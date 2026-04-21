# Design System

## Semantic colors

Bitrix24 UI uses semantic colors. Never use raw Tailwind palette colors in components — always use these semantic names.

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

### Choosing colors for components

- **Primary action** on a page (submit, save, confirm) → `color="air-primary"`
- **Secondary actions** (cancel, back, alternative) → `color="air-secondary-no-accent"`
- **Destructive actions** (delete, remove) → `color="air-primary-alert"`
- **Status indicators** → match the semantic meaning: `air-primary-success`, `air-primary-warning`, `air-primary-alert`, `air-primary`
- **Navigation and chrome** → `color="air-secondary-no-accent"`

## Semantic utility classes

Use these everywhere instead of raw palette colors:

### Text
- `text-dimmed` – Lowest priority text: placeholders, disabled states, inactive UI elements.
- `text-muted` – Low-emphasis text: hints, helper messages, secondary metadata.
- `text-description` – Default readable text: body content, paragraphs, descriptions.
- `text-legend` – Text for subtitles and legends: explanatory labels, chart keys, group titles.
- `text-label` – Text for headings and emphasis: form labels, section titles, call-to-action words.

### Backgrounds
- `bg-default` — page background
- `bg-muted` — subtle backgrounds (hover states, alternating rows)
- `bg-elevated` — raised surfaces (cards, dropdowns)
- `bg-accented` — accent backgrounds (active states, selected items)

### Borders
- `border-default` — standard borders
- `border-muted` — subtle borders (dividers, separators)
- `border-accented` — accent borders (active states)

### Rules

- **One solid primary button per view** — everything else should be lower weight
- **Destructive buttons** use `color="air-primary-alert"`

## Customizing components

### `b24ui` prop

Override theme **slots** on a single instance — wins over global config.

```vue
<И24Card :b24ui="{ header: 'bg-muted', body: 'p-8' }" />
```

Rules for `b24ui` overrides:
- **Prefer `defaultVariants`** over slot class overrides when possible (e.g., changing default button color/size).
- **Don't duplicate default classes** — check the generated theme file first to see what's already there.

### `class` prop

Override the **root** (or `base`) slot only — simpler than `b24ui` for single-slot changes.

```vue
<B24Button class="font-bold" />
```

### Finding slot names

Read the generated theme file for any component:
- **Nuxt**: `.nuxt/b24ui/<component>.ts`
- **Vue**: `node_modules/.b24ui-nuxt/b24ui/<component>.ts`

These files show every available slot name, variant combination, and default class.

### `B24Theme` (scoped overrides)

Override theme for a section of the component tree without affecting the rest of the app. Renders no DOM element — uses `provide`/`inject`:

```vue
<B24Theme :b24ui="{ button: { slots: { base: 'rounded-full' } } }">
  <B24Button label="Rounded" />
  <B24Button label="Also rounded" />
</B24Theme>
```

### Tree-shaking with `experimental.componentDetection`

Enable automatic component detection to only generate CSS for components you actually use:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  b24ui: {
    experimental: {
      componentDetection: true
    }
  }
})
```

For dynamic components (e.g., `<component :is="...">`), pass an array of component names to guarantee they're included:

```ts
componentDetection: ['Modal', 'Dropdown', 'Popover']
```

## CSS `@theme` customization

Customize Tailwind design tokens in `main.css`:

### Breakpoints

```css
@theme {
  --breakpoint-3xl: 1920px;
}
```

## CSS variables

Bitrix24 UI exposes CSS variables you can override in `main.css`:

```css
:root {
  --b24ui-container-width: 90rem;
  --b24ui-header-heights: 3.625rem;
}
```
