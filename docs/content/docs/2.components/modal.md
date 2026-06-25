---
title: Modal
description: A popup window for showing messages or gathering user input.
category: overlay
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Modal.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/modal
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/modal
  - label: Dialog
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/dialog
---

## Usage

Use a [Button](/docs/components/button/) or any other component in the default slot of the Modal.

Then, use the `#content` slot to add the content displayed when the Modal is open.

::component-code
---
prettier: true
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#content
:placeholder{class="h-48"}
::

You can also use the `#header`{lang="ts-type"}, `#body`{lang="ts-type"} and `#footer`{lang="ts-type"} slots to customize the Modal's content.

### Title

Use the `title` prop to set the title of the Modal's header.

::component-code
---
prettier: true
props:
  title: 'Modal with title'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

### Description

Use the `description` prop to set the description of the Modal's header.

::component-code
---
prettier: true
ignore:
  - title
props:
  title: 'Modal with description'
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

### Close

Use the `close` prop to customize or hide the close button (with `false` value) displayed in the Modal's header.

You can pass any property from the [Button](/docs/components/button/) component to customize it.

::component-code
---
prettier: true
ignore:
  - title
  - close.color
props:
  title: 'Modal with close button'
  close:
    color: air-secondary-accent-2
    class: 'rounded-full'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

::tip
The close button is not displayed if the `#content` slot is used as it's a part of the header.
::

### Close Icon

Use the `close-icon` prop to customize the close button [Icon](https://bitrix24.github.io/b24icons/icons/).

::component-code
---
prettier: true
ignore:
  - title
  - closeIcon
cast:
  closeIcon: 'RocketIcon'
props:
  title: 'Modal with close button'
  closeIcon: 'RocketIcon'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

### Transition

Use the `transition` prop to control whether the Modal is animated or not. Defaults to `true`.

::component-code
---
prettier: true
ignore:
  - title
props:
  transition: false
  title: 'Modal without transition'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

### Overlay

Use the `overlay` prop to control whether the Modal has an overlay or not. Defaults to `true`.

::component-code
---
prettier: true
ignore:
  - title
props:
  overlay: false
  title: 'Modal without overlay'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

### Overlay blur

If you want to disable background blur, you should use the `overlayBlur` prop.

The `overlayBlur` prop has 3 options:

- `auto`: (default) when the user has **not requested** [reduced motion](https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion)
- `on`: always use blur
- `off`: do not use blur

::component-code
---
prettier: true
ignore:
  - title
  - overlay
items:
  overlayBlur:
    - auto
    - on
    - off
props:
  overlay: true
  overlayBlur: 'auto'
  title: 'Overlay blur'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

### Modal

Use the `modal` prop to control whether the Modal blocks interaction with outside content. Defaults to `true`.

::note
When `modal` is set to `false`, the overlay is automatically disabled and outside content becomes interactive.
::

::component-code
---
prettier: true
ignore:
  - title
props:
  modal: false
  title: 'Modal interactive'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

### Dismissible

Use the `dismissible` prop to control whether the Modal is dismissible when clicking outside of it or pressing escape. Defaults to `true`.

::note
A `close:prevent` event will be emitted when the user tries to close it.
::

::tip
You can combine `modal: false` with `dismissible: false` to make the Modal's background interactive without closing it.
::

::component-code
---
prettier: true
ignore:
  - title
props:
  dismissible: false
  modal: true
  title: 'Modal non-dismissible'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

### Scrollable

Use the `scrollable` prop to make the Modal's content scrollable within the overlay.

::warning
As the overlay is needed for scrolling, `modal: false` is not compatible and `overlay: false` only removes the background.
::

::component-code
---
prettier: true
ignore:
  - title
props:
  scrollable: true
  overlay: true
  title: 'Modal scrollable'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-full" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-screen"}
::

::caution
There's a [known issue](https://reka-ui.com/docs/components/dialog#scrollable-overlay) where clicking on the scrollbar may unintentionally close the dialog on some operating systems.
::

### Fullscreen

Use the `fullscreen` prop to make the Modal fullscreen.

::component-code
---
prettier: true
ignore:
  - title
  - fullscreen
props:
  fullscreen: true
  title: 'Modal fullscreen'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-full" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-full"}
::

### Unmount

Use the `unmount-on-hide` prop to prevent the Modal's content from being unmounted when it is closed. Defaults to `true`.

::component-code
---
prettier: true
ignore:
  - title
props:
  unmountOnHide: false
  title: 'Modal'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-48"}
::

::note
You can inspect the DOM to see the Modal's content being rendered even while it is closed.
::

::tip
When the `portal` prop is set to `false`, the content is also rendered on the server. This is useful to render an open Modal during SSR without a flash on page load, or to expose its content for SEO.
::

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::component-example
---
name: 'modal-open-example'
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts/), you can toggle the Modal by pressing :kbd{value="O"}.
::

::tip
This allows you to move the trigger outside of the Modal or remove it entirely.
::

### Programmatic usage

You can use the [`useOverlay`](/docs/composables/use-overlay/) composable to open a Modal programmatically.

::warning
Make sure to wrap your app with the [`App`](/docs/components/app/) component which uses the [`OverlayProvider`](https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/OverlayProvider.vue) component.
::

First, create a modal component that will be opened programmatically:

::component-example
---
prettier: true
name: 'modal-example'
preview: false
---
::

::note
We are emitting a `close` event when the modal is closed or dismissed here. You can emit any data through the `close` event, however, the event must be emitted in order to capture the return value.
::

Then, use it in your app:

::component-example
---
name: 'modal-programmatic-example'
---
::

::tip
You can close the modal within the modal component by emitting `emit('close')`.
::

### Nested modals

You can nest modals within each other.

::component-example
---
name: 'modal-nested-example'
---
::

### With footer slot

Use the `#footer` slot to add content after the Modal's body.

::component-example
---
name: 'modal-footer-slot-example'
---
::

### Marketing / promo composition

Compose a promo/upgrade modal from existing components — no new component needed. The body uses a responsive 2-column flex (heading + description on the left, a feature card on the right), the footer pairs a primary CTA with a tertiary "remind me later" action. The decorative background is a Tailwind gradient utility passed through `b24ui.body`.

::component-example
---
collapse: true
name: 'modal-marketing-example'
---
::

::prompt
---
description: Build a marketing / promo modal for any business or app.
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
You are helping me build a marketing / promo modal in an app that uses `@bitrix24/b24ui-nuxt`. Load the `b24-ui-nuxt` skill and follow the **Marketing / promo modal** recipe in `skills/b24-ui-nuxt/references/recipes/overlays.md`.

Goal: a focused, single-purpose modal for any marketing activity — trial ending, plan upsell, seasonal offer, feature launch, re-engagement campaign — with one primary CTA and one dismiss action, that nudges the user without blocking the main workflow.

Before writing any code, ask me clarifying questions about:
- the activity itself — what is being promoted (offer, plan, feature, event), the value proposition in one sentence, and any quantified benefit worth highlighting;
- the audience — which user segment, role, or lifecycle stage the modal targets;
- the trigger and re-show cadence — page load, route guard, dismiss-aware banner, scheduled campaign window;
- the primary action — where the CTA leads (in-app flow, deep link, external page) and any permissions or feature flags required;
- the dismiss action — its copy, whether it just closes or snoozes for N days, and whether ESC / overlay click also dismiss;
- copy and locale — tone, language, and whether i18n keys are required from day one;
- analytics — which events to fire (`promo_shown`, `promo_dismissed`, `promo_clicked`) and which user roles count;
- constraints — accessibility, dark-mode preview, mobile viewport priority.

Once we agree on those, compose the modal from existing b24ui components only (do not introduce a new component), paint the brand boost gradient on `b24ui.content`, pin the CTA row to the bottom of the body, and keep any side card as a short teaser of headline benefits — not a feature matrix.
::

### Sales dynamics widget

A real-world example of surfacing a stats card behind a Modal. The widget itself is documented on the [Card](/docs/components/card/#sales-dynamics-widget) page; here it sits inside `B24Modal` so a trigger button opens it as a focused overlay — handy when the page chrome is busy and the dashboard needs a peek surface without a navigation jump.

::component-example
---
collapse: true
name: 'modal-sales-dynamics-example'
---
::

::prompt
---
description: Wrap the Sales dynamics widget in a Modal so a trigger button opens it as a focused overlay.
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
Take the Sales dynamics widget recipe (see `references/recipes/overlays.md` → "Stats widget (KPI summary)") and surface it through `B24Modal` so a button or in-page link opens the metrics as a focused overlay — useful when the surrounding dashboard is too busy to host the full card inline.

Before writing any code, gather the missing context:
- What's the trigger — a `B24Button` (discrete control), a `B24Link is-action` mid-paragraph, or a programmatic open via `useOverlay`?
- Should the modal be dismissible by ESC / overlay click, or only via the widget's own actions (in which case `:dismissible="false"`)?
- Does the modal need to block the page (default `modal: true`) or float as a non-modal overlay (`modal: false`) so the user can still scroll the dashboard behind it?
- Should the widget's own `Configure` / `Feedback` buttons close the modal, navigate away, or stay open while triggering side-effects?
- What's the data shape behind the rows (and the optional highlight row), and where does it come from — props on the page, a store, or an async fetch fired only when the modal opens?
- Locale and analytics: track modal opens and CTA clicks separately, since this is a "peek" surface, not the canonical metrics page.

Once those answers are in, assemble the modal from stock components only:
- Strip the modal's content chrome with `:b24ui="{ content: 'sm:max-w-md bg-transparent shadow-none border-0', body: 'p-0' }"` so the widget paints its own surface (it carries the gradient, rounded corners and shadow internally).
- Disable the built-in close (`:close="false"`) so the X doesn't clash with the widget's header — the modal is dismissed by ESC, overlay click, or one of the widget's footer buttons.
- Place the trigger in the default slot (`B24Button` or `B24Link is-action` — never both in the same modal) and put the widget itself inside `#body`.
- Render the widget exactly as documented in the recipe — the `edge-dark` root, the purple radial gradient (`--ui-color-copilot-bg-content-3 → -2 → -1`), the `style-filled-boost` highlight row and the three `air-secondary-accent` action buttons.

Keep all copy in the requested locale and surface the data through the same shape (`title`, `totalLine`, `todayLine`, `rangeLabel`, `rows`, `highlight`) used by the standalone recipe.
::

### With command palette

You can use a [CommandPalette](/docs/components/command-palette/) component inside the Modal's content.

::component-example
---
collapse: true
name: 'modal-command-palette-example'
---
::

::note
This example uses `useLazyFetch` with `immediate: false` to only fetch data when the Modal opens.
::

## API

### Props

:component-props

### Slots

:component-slots

### Emits

:component-emits

## Theme

:component-theme
