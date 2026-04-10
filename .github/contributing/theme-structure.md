# Theme Structure

Theme files define component styling using Tailwind Variants.

## File Location

Themes live in `src/theme/` with kebab-case naming (e.g., `button.ts`, `input-menu.ts`).

## Static Theme (Simple Components)

For components without dynamic colors:

```ts
export default {
  slots: {
    root: 'w-full',
    item: 'border-b border-default last:border-b-0',
    trigger: 'flex items-center gap-1.5 font-medium text-sm py-3.5',
    content: 'overflow-hidden',
    body: 'text-sm pb-3.5'
  },
  variants: {
    disabled: {
      true: {
        trigger: 'cursor-not-allowed opacity-30'
      }
    }
  }
}
```

## Reusing Variants

Import shared variants from other themes:

```ts
import type { ModuleOptions } from '../module'
import { fieldGroupVariant } from './field-group'

export default (options: Required<ModuleOptions>) => ({
  slots: { ... },
  variants: {
    ...fieldGroupVariant,
    // Additional variants
  }
})
```

## Semantic Colors

Always use semantic colors, never Tailwind palette colors:

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

### Text Colors
- `text-dimmed` - Placeholders, hints
- `text-muted`- Low-emphasis text
- `text-description`- Body text, description
- `text-legend`- Subtitles
- `text-label`- Headings, emphasis

### Background Colors
- `bg-default`- Primary background
- `bg-elevated`- Elevated surface (cards, dropdowns)
- `bg-accented`- Subtle accent background

### Border Colors
- `border-default` - Standard borders
- `border-muted` - Low-emphasis borders
- `border-accented` - Accent borders

## Conditional Transitions

Add transitions:

```ts
slots: {
  base: [
    'rounded-md font-medium transition-colors'
  ]
}
```

## Animations

Common animation classes:
```ts
// Accordion expand/collapse
content: 'motion-safe:data-[state=open]:animate-[accordion-down_200ms_ease-out] motion-safe:data-[state=closed]:animate-[accordion-up_200ms_ease-out]'

// Modal fade/scale
overlay: 'motion-safe:data-[state=open]:animate-[fade-in_200ms_ease-out] motion-safe:data-[state=closed]:animate-[fade-out_200ms_ease-in]'
content: 'motion-safe:data-[state=open]:animate-[scale-in_200ms_ease-out] motion-safe:data-[state=closed]:animate-[scale-out_200ms_ease-in]'

// Loading spinner
leadingIcon: 'animate-spin'
```

## Compound Variants

Apply styles when multiple conditions match:

```ts
compoundVariants: [
  // Color + variant
  {
    color: 'air-primary',
    class: 'bg-primary'
  },
  
  // Size + boolean
  {
    size: 'sm',
    square: true,
    class: 'p-1'
  },
  
  // Multiple slots
  {
    loading: true,
    leading: true,
    class: {
      leadingIcon: 'animate-spin'
    }
  },
  
  // Array of variants
  {
    color: ['air-primary', 'air-primary-alert'],
    class: 'focus-visible:ring-2 focus-visible:ring-primary'
  }
]
```

## Slot Naming Conventions

| Slot | Usage |
|------|-------|
| `root` | Outermost wrapper |
| `base` | Main interactive element |
| `leading` / `trailing` | Icon/content containers |
| `leadingIcon` / `trailingIcon` | Icon elements |
| `label` | Text label |
| `content` | Main content area |
| `overlay` | Background overlay |
| `header` / `body` / `footer` | Structural sections |
