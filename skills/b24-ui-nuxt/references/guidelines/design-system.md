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
| air-primary-no-accent | High-emphasis surface with no colour signal |
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
<B24Card :b24ui="{ header: 'bg-muted', body: 'p-8' }" />
```

Rules for `b24ui` overrides:
- **Prefer `defaultVariants`** over slot class overrides when possible (e.g., changing default button color/size).
- **Don't duplicate default classes** — check the generated theme file first to see what's already there.

### Global config

Change a component's theme for every instance.

```ts
// app/app.config.ts (Nuxt)
export default defineAppConfig({
  b24ui: {
    button: {
      slots: { base: 'font-bold' },
      defaultVariants: { size: 'lg' }
    }
  }
})
```

```ts
// vite.config.ts (Vue) — same object, passed to the plugin
bitrix24UIPluginVite({
  b24ui: {
    button: {
      slots: { base: 'font-bold' },
      defaultVariants: { size: 'lg' }
    }
  }
})
```

Prefer `defaultVariants` over slot classes whenever a variant already expresses the change.

### Replace instead of merge

Classes from the `b24ui` prop, the `class` prop, `B24Theme` and global config are **merged onto** the component defaults. To replace them, set the slot to a function — it receives the default classes so you can keep part of them.

```vue
<B24Button :b24ui="{ label: () => 'text-base font-bold' }" label="Button" />
```

```ts
// app/app.config.ts — applies to every instance
export default defineAppConfig({
  b24ui: {
    button: {
      slots: {
        label: () => 'text-base font-bold'
      }
    }
  }
})
```

**Where you write it changes what it replaces:**
- In **global config** it replaces the slot's *own* classes — `variants` and `compoundVariants` still merge on top.
- In the **`b24ui` / `class` props and `B24Theme`** it runs after variants resolve, so it replaces everything, variants included.

Reach for this when merging cannot win — `tailwind-merge` only resolves conflicts inside a class group, so an override that has to drop unrelated defaults (layout, transitions, ring utilities) needs the function form.

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
<B24Theme :b24ui="{ button: { base: 'rounded-full' } }">
  <B24Button label="Rounded" />
  <B24Button label="Also rounded" />
</B24Theme>
```

Slot names go **directly** under the component name here — `{ button: { base: … } }`. This is *not* the global-config shape, which nests them under `slots`. Writing `{ button: { slots: { base: … } } }` on `B24Theme` is silently ignored — no error, the defaults just stay.

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

### Popup height

| Variable | Default | Applies to |
|---|---|---|
| `--max-height-popup-list` | `40rem` | `B24Select`, `B24SelectMenu`, `B24InputMenu` result lists |
| `--max-height-popup-menu` | `40vh` | `B24DropdownMenu`, `B24ContextMenu`, editor suggestion menus |

Ceilings, not fixed heights — the popup still shrinks to the space the popper
has. Separate on purpose: a list is bounded in absolute units, a menu against
the viewport.

```css
@theme {
  --max-height-popup-list: 56rem;
}
```

## CSS variables

Bitrix24 UI exposes CSS variables you can override in `main.css`:

```css
:root {
  --b24ui-container-width: 90rem;
  --b24ui-header-height: 3.625rem;
}
```
