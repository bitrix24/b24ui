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

### Analytics widget composition :badge{label="Soon" class="align-text-top"}

Compose a KPI / metrics widget from a single `B24Card` plus stock components — no new component needed. The header carries a title with two-line subtitle and a date-range action; the body lays out a small data table (column headers + 2-3 rows) with the highlighted "headline metric" row at the bottom; the footer pairs neutral "configure" and "feedback" actions. The decorative background is the brand boost radial gradient passed through `b24ui.root`, with white text everywhere on top of it.

::component-example
---
collapse: true
name: 'card-sales-analytics-example'
---
::

::prompt
---
description: Build an analytics / KPI widget card for any business or app.
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
You are helping me build an analytics / KPI widget in an app that uses `@bitrix24/b24ui-nuxt`. Load the `b24-ui-nuxt` skill and follow the **Analytics widget** recipe in `skills/b24-ui-nuxt/references/recipes/analytics-widgets.md`.

Goal: a focused card that surfaces 2-4 metrics for a given time range — repeat sales dynamics, support workload, conversion funnel, marketing campaign performance, etc. — with a date-range selector in the header and "configure" / "feedback" actions in the footer, while keeping the headline metric visually prominent.

Before writing any code, ask me clarifying questions about:
- the activity itself — what is being measured (deals, tickets, sessions, signups, revenue), the time grain, and the headline metric to highlight;
- which 2-3 supporting rows belong in the body and what columns describe them (count, amount, share, change, target);
- the date-range control — preset list, custom range picker, or a simple "Last 30 days" chip; and whether changing it refetches data live;
- the source of the numbers — whether the widget receives them as props, fetches them itself (`useAsyncData`, `$fetch`), or subscribes to a store;
- where the "Configure" and "Feedback" actions lead — modal, slideover, drawer, or external URL — and which user roles see them;
- copy and locale — tone, language, and currency / number formatting (`Intl.NumberFormat`);
- visual variants — should the widget have a muted variant for less-critical dashboards, and does it need a loading / empty / error state from day one;
- accessibility — keyboard reachability of all actions, tooltip targets, and contrast on the saturated gradient.

Once we agree on those, compose the widget from existing b24ui components only (do not introduce a new component): paint the brand boost gradient on `b24ui.root`, render the data rows as a `grid` (do not reach for `B24Table` for a 3-row teaser), and use semi-transparent white surfaces (`bg-white/10`, `bg-white/20`) plus white text (`text-white`, `text-white/80`) so the content stays legible on the gradient.
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
