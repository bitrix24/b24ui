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

`hint` and `description` take a slot the same way. The `required` asterisk is
drawn on the `<label>` element, so it survives a custom `#label` slot.

::caution
`#error` and `#help` are not interchangeable with their props: the error block
renders whenever an `#error` slot exists, with or without an actual error.
[Error and help slots](#error-and-help-slots) has the working pattern.
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
replaces the content of the same `<p>` the prop fills, so the
`aria-describedby` association the field already had is unchanged.

::component-code
---
prettier: true
props:
  name: email
  label: Email
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

The slot receives the `description` prop, so a wrapper can decorate a string
that comes from a schema or a translation rather than replace it:

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

::component-code
---
prettier: true
props:
  name: bio
  label: Bio
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
A hint needs a label. It renders inside the label row, and that row is only
drawn when `label` or `#label` is present — so `hint` on its own renders
nothing at all, silently.
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

### Error and help slots

`#hint` and `#description` are drop-in replacements for their props. `#error`
and `#help` are not, and the difference is worth understanding before you reach
for them.

The error block renders when `error` is not `false` **and** either the error is
a non-empty string *or* an `#error` slot exists. `help` is the `v-else-if` on
that same branch. So supplying `#error` and leaving `error` alone renders the
error block permanently and hides `help` entirely.

The accessible wiring does not follow, because it is computed from the props
rather than from the slots. The control keeps `aria-invalid="false"`, and if
`help` is set it keeps `aria-describedby="…-help"` — pointing at an element
that is no longer in the document. A red message on screen, a dangling
reference underneath it, and nothing announced:

```vue
<!-- Don't: the message is always visible, `help` never is, and a screen
     reader is never told the field is invalid. -->
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

With `message` at `false` the help text shows and the control reads
`aria-describedby="…-help"`. As soon as `message` holds a string the error
appears in your markup, `help` steps aside, and the control reads
`aria-invalid="true"` with `aria-describedby="…-error …-help"`.

::note
Inside a [Form](/docs/components/form/) you do not set `error` at all — the
Form sets it from the schema, and it is a string or `undefined`. `undefined` is
not `false`, so an `#error` slot still renders permanently there. Use `#error`
only on fields whose `error` you control, or use the prop and style the block
through `b24ui.error`.
::

`#help` has no such trap on its own — supply it when the help text needs a link
or a code sample. It disappears whenever an error is showing, by design.

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

