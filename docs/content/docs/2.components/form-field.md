---
title: FormField
description: A container for form elements with built-in validation and error management.
category: form
keywords:
  - field wrapper
  - form label
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/FormField.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/form-field
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/form-field
---

## Usage

Wrap any form component with a FormField. Used in a [Form](/docs/components/form/), it provides validation and error handling.

### Label

Use the `label` prop to set the label for the form control.

::component-code
---
prettier: true
props:
  label: Email
slots:
  default: |

    <B24Input placeholder="Enter your email" />
---

:b24-input{placeholder="Enter your email"}
::

::note
The label `for` attribute and the form control are associated with a unique `id` if not provided.
::

::tip{to="#label-slot"}
For a label that is more than text, use the `#label` slot.
::

When using the `required` prop, an asterisk is added next to the label.

::component-code
---
prettier: true
ignore:
  - label
props:
  label: Email
  required: true
slots:
  default: |

    <B24Input placeholder="Enter your email" />
---

:b24-input{placeholder="Enter your email"}
::

### Label slot

Use the `#label` slot when the label needs more than a string — a badge, a
counter, a short piece of state. The slot replaces the label's *content*, not
the `<label>` element around it, so whatever association the field already had
is unchanged.

::warning
Anything you put here becomes part of the control's accessible name: a badge
reading `Work` makes a screen reader announce *"Email Work"*. Mark decorative
content `aria-hidden="true"`, as below. Avoid interactive content — a link or
button inside a `<label>` both activates itself and toggles the control.
::

::component-code
---
prettier: true
props:
  name: email
slots:
  label: |

    Email
    <B24Badge label="Work" size="xs" aria-hidden="true" />

  default: |

    <B24Input placeholder="Enter your email" />
---

#label
Email :b24-badge{label="Work" size="xs" aria-hidden="true"}

#default
:b24-input{placeholder="Enter your email"}
::

The slot receives the `label` prop, so a wrapper can decorate the string
instead of replacing it — useful when the text itself comes from a schema or a
translation:

```vue
<B24FormField label="Email" name="email">
  <template #label="{ label }">
    {{ label }}
    <B24Badge label="Work" size="xs" aria-hidden="true" />
  </template>

  <B24Input placeholder="Enter your email" />
</B24FormField>
```

`hint`, `description`, `help` and `error` take a slot the same way, and each
receives the prop it replaces — so setting the prop alongside the slot keeps
the text in one place. [What is announced is what was
drawn](#what-is-announced-is-what-was-drawn) covers what each block contributes
to the control's accessible description. The `required` asterisk is drawn on
the `<label>` element, so it survives a custom `#label` slot.

::caution
`#error` goes further than the others: the error block renders whenever an
`#error` slot exists, with or without an actual error, and takes `help` with
it. [Error and help slots](#error-and-help-slots) has the working pattern.
::

### Description

Use the `description` prop to provide additional information below the label.

::component-code
---
prettier: true
ignore:
  - label
props:
  label: Email
  description: We'll never share your email with anyone else.
slots:
  default: |

    <B24Input placeholder="Enter your email" class="w-full" />
---

:b24-input{placeholder="Enter your email" class="w-full"}
::

### Description slot

Use the `#description` slot when the description needs markup — a link to the
policy the field refers to, a piece of emphasis, an inline code sample. It
replaces the content of the same `<p>` the prop fills.

The slot on its own is enough to be announced — `aria-describedby` names the
blocks that were actually drawn, whichever of the two drew them. Setting the
prop as well is still worth it: the slot receives it, so decorating the value
costs one interpolation instead of restating it. See [What is announced is what
was drawn](#what-is-announced-is-what-was-drawn).

::component-code
---
prettier: true
props:
  name: email
  label: Email
  description: We'll never share it.
slots:
  description: |

    We'll never share it. <a href="/docs/components/form/" class="underline">How we use your data</a>

  default: |

    <B24Input placeholder="Enter your email" class="w-full" />
---

#description
We'll never share it. [How we use your data](/docs/components/form/)

#default
:b24-input{placeholder="Enter your email" class="w-full"}
::

A link is safe here in a way it is not in `#label`: the description sits
outside the `<label>` element, so clicking it does not toggle the control.

The slot receives the `description` prop, so the wrapper decorates the string
rather than restating it — which matters when the text comes from a schema or
a translation, and is what keeps the prop and the visible text in step:

```vue
<B24FormField label="Email" name="email" description="We'll never share it.">
  <template #description="{ description }">
    {{ description }}
    <B24Link to="/docs/components/form/" raw class="underline">
      How we use your data
    </B24Link>
  </template>

  <B24Input placeholder="Enter your email" class="w-full" />
</B24FormField>
```

### Hint

Use the `hint` prop to display a hint message next to the label.

::component-code
---
prettier: true
ignore:
  - label
props:
  label: Email
  hint: Optional
slots:
  default: |

    <B24Input placeholder="Enter your email" />
---

:b24-input{placeholder="Enter your email"}
::

### Hint slot

Use the `#hint` slot when the hint carries state rather than a word — a
character count, a badge, an icon. It renders inside the label row, next to
the label itself.

Pass `hint` as well as the slot, for the same reason as `#description`: the
announcement follows the prop, not the slot.

::component-code
---
prettier: true
props:
  name: bio
  label: Bio
  hint: 0 / 140
slots:
  hint: |

    <B24Badge label="0 / 140" size="xs" color="air-secondary-accent-1" />

  default: |

    <B24Input placeholder="Tell us about yourself" class="w-full" />
---

#hint
:b24-badge{label="0 / 140" size="xs" color="air-secondary-accent-1"}

#default
:b24-input{placeholder="Tell us about yourself" class="w-full"}
::

::note
The hint is a sibling of the `<label>`, not part of it, so its content does not
join the control's accessible name — unlike `#label`. It is announced through
`aria-describedby` instead.
::

::caution
**A hint needs a label.** The hint renders inside the label row, and that row
is only drawn when `label` or `#label` is present — so a `hint` on a label-less
field renders nothing at all, and nothing is announced either. Silent, but at
least consistent: until
[#497](https://github.com/bitrix24/b24ui/issues/497) the control also
advertised `aria-describedby="…-hint"`, pointing at an element that was never
drawn.
::

### Help

Use the `help` prop to display a help message below the form control. When used together with the `error` prop, the `error` prop takes precedence.

::component-code
---
prettier: true
ignore:
  - label
props:
  label: Email
  help: Please enter a valid email address.
slots:
  default: |

    <B24Input placeholder="Enter your email" class="w-full" />
---

:b24-input{placeholder="Enter your email" class="w-full"}
::

### Error

Use the `error` prop to display an error message below the form control. When used together with the `help` prop, the `error` prop takes precedence.

When used inside a [Form](/docs/components/form/), this is automatically set when a validation error occurs.

::component-code
---
prettier: true
ignore:
  - label
props:
  label: Email
  error: Please enter a valid email address.
slots:
  default: |

    <b24Input placeholder="Enter your email" class="w-full" />
---

:b24-input{placeholder="Enter your email" class="w-full"}
::

### What is announced is what was drawn

Every one of the five blocks renders from `props.x || !!slots.x` — the prop or
the slot will do. `aria-describedby` follows the same rule: it names the blocks
that ended up in the document, and only those.

| what you pass | block on screen | named in `aria-describedby` |
|---|---|---|
| `description` prop | yes | yes |
| `#description` slot, no prop | yes | yes |
| `hint` prop, no `label` | no | no |
| `error` and `help` together | error only | error only |

Two conditions are worth knowing, because both hide a block you asked for:
`hint` lives in the label row and needs a `label` or `#label` to exist at all,
and `help` is the `v-else-if` of the error branch, so a rendered error takes
its place. In both cases nothing is drawn and nothing is announced.

::note
This is a deliberate divergence from `nuxt/ui`, which builds the attribute from
the props alone — so a slot with no prop went unannounced, and a prop whose
block never drew left the attribute naming an id that was not in the document.
Fixed here in [#497](https://github.com/bitrix24/b24ui/issues/497) and recorded
as an invariant in `.sync/PORTING.md` §2, so a later port does not revert it.
::

### Error and help slots

`#error` is where the rule above bites hardest, because the error block has a
second condition on it:

```
v-if="props.error !== false && ((typeof error === 'string' && error) || !!slots.error)"
v-else-if="props.help || !!slots.help"
```

An `#error` slot alone satisfies that `v-if` **whether or not there is an
error**. So the block renders permanently, `help` — the `v-else-if` of the same
branch — never renders at all, and the control still reads
`aria-invalid="false"`: that attribute reports the field's error state, and
there is none. The block is described, since it was drawn, but nothing tells
assistive technology the field is invalid:

```vue
<!-- Don't: the message is always visible, `help` never is, and a screen
     reader is told the field is valid. -->
<B24FormField label="Email" name="email" help="We'll only use it to sign you in.">
  <template #error>
    <WarningIcon class="size-4" /> Please enter a valid email address.
  </template>

  <B24Input placeholder="Enter your email" />
</B24FormField>
```

Bind `error` to the message — or to `false` when there is none — and use the
slot for markup only. Then the branch behaves exactly as it does with the prop:

```vue
<script setup lang="ts">
import WarningIcon from '@bitrix24/b24icons-vue/main/WarningIcon'

const value = ref('')
const message = computed<string | false>(() =>
  value.value.includes('@') ? false : 'Please enter a valid email address.'
)
</script>

<template>
  <B24FormField
    label="Email"
    name="email"
    :error="message"
    help="We'll only use it to sign you in."
  >
    <template #error="{ error }">
      <WarningIcon
        class="size-4"
        aria-hidden="true"
      /> {{ error }}
    </template>

    <B24Input
      v-model="value"
      placeholder="Enter your email"
    />
  </B24FormField>
</template>
```

| `message` | error block | help block | `aria-invalid` | `aria-describedby` |
|---|---|---|---|---|
| `false` | — | shown | `false` | `…-help` |
| `'Please enter…'` | your markup | — | `true` | `…-error` |

`help` and `error` are mutually exclusive on screen and in the attribute
alike — whichever block drew is the one named.

::note
Inside a [Form](/docs/components/form/) you do not set `error` at all — the
Form sets it from the schema, and it is a string or `undefined`. `undefined` is
not `false`, so an `#error` slot still renders permanently there. Use `#error`
only on fields whose `error` you control, or use the prop and style the block
through `b24ui.error`.
::

`#help` follows the general rule: pass `help` alongside it, or the help text
appears with nothing describing it. It disappears whenever an error is
showing, by design.

### Error pattern

Use the `error-pattern` prop to match form errors with a regular expression. This is especially relevant for components with array values such as [InputTags](/docs/components/input-tags/), where errors include array indices in their name (e.g. `tags.0`).

::tip{to="/docs/components/form/#error-reporting"}
See an example of using `error-pattern` within a Form.
::

### Size

Use the `size` prop to change the size of the FormField, the `size` is proxied to the form control.

::component-code
---
prettier: true
ignore:
  - label
  - description
  - hint
  - help
props:
  label: Email
  description: We'll never share your email with anyone else.
  hint: Optional
  help: Please enter a valid email address.
  size: lg
slots:
  default: |

    <B24Input placeholder="Enter your email" class="w-full" />
---

:b24-input{placeholder="Enter your email" class="w-full"}
::

### Orientation

Use the `orientation` prop to change the layout of the FormField. Defaults to `vertical`.

::component-code
---
prettier: true
ignore:
  - label
  - class
props:
  orientation: horizontal
  label: Email
  help: Please enter a valid email address.
  class: w-72
slots:
  default: |

    <B24Input placeholder="Enter your email" class="w-full" />
---

:b24-input{placeholder="Enter your email" class="w-full"}
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
### Slots

<ComponentSlots component="FormField" />

