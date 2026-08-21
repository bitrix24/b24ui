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
counter, an inline link. The field keeps its `for`/`id` association either way,
so the control stays reachable by clicking the label.

::component-code
---
prettier: true
props:
  name: email
slots:
  label: |

    Email
    <B24Badge label="Work" size="xs" />

  default: |

    <B24Input placeholder="Enter your email" />
---

#label
Email :b24-badge{label="Work" size="xs"}

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
    <B24Badge label="Work" size="xs" />
  </template>

  <B24Input placeholder="Enter your email" />
</B24FormField>
```

`hint`, `description`, `help` and `error` work the same way — each has a prop
for the plain case and a slot of the same name for the rich one.

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

