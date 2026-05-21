---
title: Card
description: Render the content within a card component comprising a header, body, and footer section.
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Card.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/card
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/card
---

## Usage

Use the `header`, `default` and `footer` slots to add content to the Card.

::component-code
---
prettier: true
hide:
  - class
props:
  class: 'w-full'
slots:
  header: |

    <Placeholder class="h-8" />

  default: |

    <Placeholder class="h-32" />

  footer: |

    <Placeholder class="h-8" />
---

#header
:placeholder{class="h-8"}

#default
:placeholder{class="h-32"}

#footer
:placeholder{class="h-8"}
::

### Title

Use the `title` prop to set the title of the Card's header.

::component-code
---
prettier: true
ignore:
  - class
props:
  title: 'Card with title'
  class: 'w-full'
slots:
  default: |

    <Placeholder class="h-32" />
---

#default
:placeholder{class="h-32"}
::

### Description

Use the `description` prop to set the description of the Card's header.

::component-code
---
prettier: true
ignore:
  - title
  - class
props:
  title: 'Card with description'
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  class: 'w-full'
slots:
  default: |

    <Placeholder class="h-32" />
---

#default
:placeholder{class="h-32"}
::

### Variant

Use the `variant` prop to change the variant of the Card.

::component-code
---
prettier: true
hide:
  - class
props:
  variant: outline
  class: 'w-full'
slots:
  header: |

    <Placeholder class="h-8" />

  default: |

    <Placeholder class="h-32" />

  footer: |

    <Placeholder class="h-8" />
---

#header
:placeholder{class="h-8"}

#default
:placeholder{class="h-32"}

#footer
:placeholder{class="h-8"}
::

## Examples

### Sales dynamics widget

Real-world example: a CRM dashboard widget assembled from `Card` (with the `filled-copilot` variant for the purple accent), `Button`, `Tooltip` and a small CSS grid for the metrics rows. The highlighted "Conversion" row is just a translucent overlay with `bg-white/15` over the same card.

::component-example
---
collapse: true
name: 'card-sales-dynamics-example'
---
::

### Channel detail panel

Composed entity sidebar built entirely from standard components: `Card` (with `divide-y` body for automatic section dividers), a square `Avatar`, an `AvatarGroup` with overflow counter, `Switch` toggle rows, `Badge` counters and `Empty` section placeholders. Use it as a starting point for chat channel info panels or CRM record details.

::component-example
---
collapse: true
name: 'card-channel-panel-example'
---
::

Generate this layout with your AI assistant. The prompt asks the assistant to confirm the entity type and which sections you need before writing any code:

::prompt
---
description: Build a Bitrix24-style entity detail sidebar from standard components.
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
You are a Bitrix24 UI expert. Help me build an entity detail sidebar (info panel) using only standard `@bitrix24/b24ui-nuxt` components, with minimal custom styling.

Before writing any code, ask me clarifying questions and wait for my answers:
- What entity is this panel for (chat channel, CRM contact/deal, project, something else)?
- Which header info should it show (avatar shape, title, subtitle, member group)?
- Which toggle settings do I need (e.g. notifications, auto-delete) and their default state?
- Which info rows and counters should appear (and which need a badge)?
- Which content sections do I need (e.g. Media & Files, Tasks, Meetings) and what is their empty state?

Once I confirm, build it with these conventions:
- Wrap everything in a `B24Card` with `class="w-full max-w-xs overflow-hidden"` and `:b24ui="{ body: 'p-0 flex flex-col gap-0 divide-y divide-default' }"` so each child section is auto-divided
- Square the channel avatar with `B24Avatar :b24ui="{ root: 'rounded-xl' }"`; show members with `B24AvatarGroup :max="N"` plus one extra child to render the `+1` counter
- For toggle rows, put the icon outside and use `B24Switch` with the `label` prop for accessibility, reversing layout via `:b24ui="{ root: 'flex-1 flex-row-reverse justify-between items-center', wrapper: 'ms-0' }"`
- Use `B24Badge ... square` for numeric counters on info rows
- Use `B24Empty` for section empty states, flattened with `:b24ui="{ root: 'ring-0 rounded-none py-3' }"`
- Use semantic text tokens (`text-label`, `text-description`, `text-dimmed`) and `<h3>` for section headings
::

## Prompt

::prompt
---
description: Render a CRM dashboard widget with a few metrics and a highlighted KPI row.
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
On a CRM dashboard, render a "Repeat sales dynamics" widget summarising deal volume and value. The card carries a copilot accent and a highlighted row at the bottom for the conversion KPI.

Requirements:
- Use `B24Card` with `variant="filled-copilot"`. The `#header` slot holds the title, two-line description and a top-right pill `B24Button` (`rounded`, `color="air-tertiary-no-accent"`, `:trailing-icon="RepeatIcon"`) that switches the date range
- The body is a small CSS grid with three columns (`1fr_auto_auto`) — first row carries the column headers ("Count" / "Amount"), then one row per metric. Each row sits on `bg-white/5 rounded-xl` so it reads as a row over the copilot fill
- Render the highlighted KPI row with `bg-white/15 ring-1 ring-white/20` for contrast. Pair the label with a small `Info1Icon` inside a `B24Tooltip` for the description
- The `#footer` slot holds two `air-tertiary-no-accent` buttons aligned to opposite sides (`Configure` left, `Feedback` right) with leading icons (`SettingsIcon`, `FeedbackIcon`)
- Drive the values from `rows: { label, count, amount }[]` and an optional `highlight: { label, count, amount, info }`. Keep amounts pre-formatted strings to avoid coupling with a money formatter
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
