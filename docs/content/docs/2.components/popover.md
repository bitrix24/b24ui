---
title: Popover
description: A non-modal popup window for showing messages or gathering user input.
category: overlay
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Popover.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/popover
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/popover
  - label: Popover
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/popover
---

## Usage

Use a [Button](/docs/components/button/) or any other component in the default slot of the Popover.

Then, use the `#content` slot to add the content displayed when the Popover is open.

::component-code
---
prettier: true
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

### Mode

Use the `mode` prop to change the mode of the Popover. Defaults to `click`.

::tip
In `hover` mode, set the `enable-touch` prop to let users toggle the Popover by tapping the trigger on touch devices, or use the `click` mode for triggers meant to be tapped.
::

::component-code
---
prettier: true
items:
  mode:
    - click
    - hover
props:
  mode: 'hover'
  enableTouch: true
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

::note
When using the `hover` mode, the Reka UI [`HoverCard`](https://reka-ui.com/docs/components/hover-card) component is used instead of the [`Popover`](https://reka-ui.com/docs/components/popover).
::

### Delay

When using the `hover` mode, you can use the `open-delay` and `close-delay` props to control the delay before the Popover is opened or closed.

::component-code
---
prettier: true
ignore:
  - mode
props:
  mode: 'hover'
  openDelay: 500
  closeDelay: 300
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

### Content

Use the `content` prop to control how the Popover content is rendered, like its `align` or `side` for example.

::component-code
---
prettier: true
items:
  content.align:
    - start
    - center
    - end
  content.side:
    - right
    - left
    - top
    - bottom
props:
  content:
    align: center
    side: bottom
    sideOffset: 8
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

### Arrow

Use the `arrow` prop to display an arrow on the Popover.

::component-code
---
prettier: true
ignore:
  - arrow
props:
  arrow: true
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

### Modal

Use the `modal` prop to control whether the Popover blocks interaction with outside content. Defaults to `false`.

::component-code
---
prettier: true
ignore:
  - title
props:
  modal: true
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

### Dismissible

Use the `dismissible` prop to control whether the Popover is dismissible when clicking outside of it or pressing escape. Defaults to `true`.

::note
A `close:prevent` event will be emitted when the user tries to close it.
::

::component-example
---
name: 'popover-dismissible-example'
---
::

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::component-example
---
name: 'popover-open-example'
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts/), you can toggle the Popover by pressing :kbd{value="O"}.
::

### With command palette

You can use a [CommandPalette](/docs/components/command-palette/) component inside the Popover's content.

::component-example
---
collapse: true
name: 'popover-command-palette-example'
---
::

### With following cursor

You can make the Popover follow the cursor when hovering over an element using the [`reference`](https://reka-ui.com/docs/components/tooltip#trigger) prop:

::component-example
---
name: 'popover-cursor-example'
---
::

### With anchor slot

You can use the `#anchor` slot to position the Popover against a custom element.

::warning
This slot only works when `mode` is `click`.
::

::component-example
---
collapse: true
name: 'popover-anchor-slot-example'
---
::

### Entity info card

Real-world example: an account or deal summary shown in a hover popover, assembled from [`Card`](/docs/components/card/), [`Avatar`](/docs/components/avatar/), [`Separator`](/docs/components/separator/), [`Button`](/docs/components/button/), [`Link`](/docs/components/link/) and [`DescriptionList`](/docs/components/description-list/) — no custom styling beyond the avatar accent.

::component-example
---
collapse: true
name: 'popover-entity-info-example'
---
::

::prompt
---
description: Build an entity-info popover for any record or object.
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
Lean on the `b24-ui-nuxt` skill (see `references/recipes/overlays.md` → "Info popover (entity summary)") to build a compact entity-info popover that sits on top of an entity name in running text. The popover should tease the underlying record: a colored avatar, the entity title, a one-line caption, a primary CTA, a separator, and a label/value list with one or two values rendered as their own component (link, badge, time).

Before writing any code, gather the missing context:
- Which entity does the popover describe (e.g. user, account, order, ticket, project, product, event)? That decides the avatar icon and the design-token accent (`alert`, `success`, `warning`, `copilot`).
- What's the trigger — a `B24Link` mid-paragraph (hover) or a discrete control (click)?
- Which fields belong on the card: title, caption (a short status line such as count, stage, or role), CTA label + target, plus 2-4 label/value pairs (owner, created-at, status, category, location, etc.)?
- Do any values need their own component (link, badge, time)? If yes, plan to use the global `#description` slot with `v-if="item.slot === '<key>'"` instead of replacing the whole `<dt>/<dd>` pair via a per-item slot.
- Locale, dark-mode preview, and any analytics events to fire when the popover opens or the CTA is clicked.

Once those answers are in, assemble the popover from stock components only (`B24Popover`, `B24Avatar`, `B24Button`, `B24Separator`, `B24DescriptionList`, `B24Link`) and reach for the `:b24ui` prop to:
- pin the layout to a single column inside the narrow card and zero the row dividers,
- match the recipe's compact rhythm (`p-6`, `gap-4.5`, `w-65`, `size="sm"` button),
- recolor the avatar through design tokens — never inline hex values.

Use semantic typography utilities (`text-label`, `text-description`) for the title and caption, and keep all copy in the requested locale.
::

### Sales dynamics widget

A real-world example of pairing a Popover with a stats card. The widget itself is documented on the [Card](/docs/components/card/#sales-dynamics-widget) page; here it sits inside `B24Popover` so a trigger button reveals it on demand.

::component-example
---
collapse: true
name: 'popover-sales-dynamics-example'
---
::

::prompt
---
description: Wrap the Sales dynamics widget in a Popover so a trigger button or link reveals it on demand.
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
Take the Sales dynamics widget recipe (see `references/recipes/overlays.md` → "Stats widget (KPI summary)") and surface it through `B24Popover` so a button or in-line link reveals the metrics on demand — useful in dashboard rows, list cells or running text where the full card would be too heavy.

Before writing any code, gather the missing context:
- What's the trigger — a `B24Button` (discrete control, typically `mode="click"`) or a `B24Link is-action` mid-paragraph (typically `mode="hover"`)?
- Does the popover need to follow the cursor, attach to a custom `#anchor`, or stay anchored to the trigger?
- Should the popover stay open while the user interacts with the widget? If the widget's own `Configure` / `Feedback` buttons must work without closing, keep `dismissible` on its default (true) but ensure click handlers don't bubble to the popover root.
- What's the data shape behind the rows (and the optional highlight row), and where does it come from — props on the page, a store, or an async fetch?
- Locale and analytics: track popover opens and CTA clicks separately, since this is a "peek" surface, not the canonical metrics page.

Once those answers are in, assemble the popover from stock components only:
- Strip the popover's content chrome with `:b24ui="{ content: 'p-0 bg-transparent border-0 shadow-none' }"` so the widget paints its own surface (it carries the gradient, rounded corners and shadow internally).
- Place the trigger in the default slot (`B24Button` or `B24Link is-action` — never both in the same popover); set `mode` to match the trigger affordance.
- Render the widget itself inside `#content` exactly as documented in the recipe — the `edge-dark` root, the purple radial gradient (`--ui-color-copilot-bg-content-3 → -2 → -1`), the `style-filled-boost` highlight row and the three `air-secondary-accent` action buttons.
- For an inline link trigger, anchor the popover with `:content="{ side: 'bottom', sideOffset: 8 }"` so the widget hovers below the link without clipping the surrounding paragraph.

Keep all copy in the requested locale and surface the data through the same shape (`title`, `totalLine`, `todayLine`, `rangeLabel`, `rows`, `highlight`) used by the standalone recipe.
::

## API

### Props

:component-props

### Slots

:component-slots

::note
The `close` function is only available when `mode` is set to `click` because Reka UI exposes this for [`Popover`](https://reka-ui.com/docs/components/popover#close-using-slot-props) but not for [`HoverCard`](https://reka-ui.com/docs/components/hover-card).
::

### Emits

:component-emits

## Theme

:component-theme
