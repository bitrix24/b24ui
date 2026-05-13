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
