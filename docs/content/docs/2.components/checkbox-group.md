---
title: CheckboxGroup
description: Multi-select checklist using button controls.
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/CheckboxGroup.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/chip
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/checkbox-group
  - label: CheckboxGroup
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/checkbox#group-root
---

## Usage

Use the `v-model` directive to control the value of the CheckboxGroup or the `default-value` prop to set the initial value when you do not need to control its state.

::component-code
---
prettier: true
ignore:
  - modelValue
  - items
external:
  - items
  - modelValue
props:
  modelValue:
    - 'System'
  items:
    - 'System'
    - 'Light'
    - 'Dark'
---
::

### Items

Use the `items` prop as an array of strings or numbers:

::component-code
---
prettier: true
ignore:
  - modelValue
  - items
external:
  - items
  - modelValue
props:
  modelValue:
    - 'System'
  items:
    - 'System'
    - 'Light'
    - 'Dark'
---
::

You can also pass an array of objects with the following properties:

- `label?: string`{lang="ts-type"}
- `description?: string`{lang="ts-type"}
- [`value?: string`{lang="ts-type"}](#value-key)
- `disabled?: boolean`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, container?: ClassNameValue, base?: ClassNameValue, 'indicator'?: ClassNameValue, wrapper?: ClassNameValue, label?: ClassNameValue, description?: ClassNameValue }`{lang="ts-type"}

::component-code
---
ignore:
  - modelValue
  - items
external:
  - items
  - modelValue
externalTypes:
  - CheckboxGroupItem[]
props:
  modelValue:
    - 'system'
  items:
    - label: 'System'
      description: 'This is the first option.'
      value: 'system'
    - label: 'Light'
      description: 'This is the second option.'
      value: 'light'
    - label: 'Dark'
      description: 'This is the third option.'
      value: 'dark'
---
::

::caution
When using objects, you need to reference the `value` property of the object in the `v-model` directive or the `default-value` prop.
::

### Value Key

You can change the property that is used to set the value by using the `value-key` prop. Defaults to `value`.

::component-code
---
ignore:
  - modelValue
  - items
  - valueKey
external:
  - items
  - modelValue
externalTypes:
  - CheckboxGroupItem[]
props:
  modelValue:
    - 'light'
  valueKey: 'id'
  items:
    - label: 'System'
      description: 'This is the first option.'
      id: 'system'
    - label: 'Light'
      description: 'This is the second option.'
      id: 'light'
    - label: 'Dark'
      description: 'This is the third option.'
      id: 'dark'
---
::

### Legend

Use the `legend` prop to set the legend of the CheckboxGroup.

::component-code
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
props:
  legend: 'Theme'
  defaultValue:
    - 'System'
  items:
    - 'System'
    - 'Light'
    - 'Dark'
---
::

### Color

Use the `color` prop to change the color of the CheckboxGroup.

::component-code
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
props:
  color: air-primary-copilot
  defaultValue:
    - 'System'
  items:
    - 'System'
    - 'Light'
    - 'Dark'
---
::

### Variant

Use the `variant` prop to change the variant of the CheckboxGroup.

::component-code
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
items:
  variant:
    - list
    - card
    - table
props:
  color: 'air-primary-copilot'
  variant: 'card'
  defaultValue:
    - 'System'
  items:
    - 'System'
    - 'Light'
    - 'Dark'
---
::

### Size

Use the `size` prop to change the size of the CheckboxGroup.

::component-code
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
items:
  variant:
    - list
    - card
    - table
props:
  size: 'lg'
  variant: 'list'
  defaultValue:
    - 'System'
  items:
    - 'System'
    - 'Light'
    - 'Dark'
---
::

### Orientation

Use the `orientation` prop to change the orientation of the CheckboxGroup. Defaults to `vertical`.

::component-code
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
items:
  variant:
    - list
    - card
    - table
props:
  orientation: 'horizontal'
  variant: 'list'
  defaultValue:
    - 'System'
  items:
    - 'System'
    - 'Light'
    - 'Dark'
---
::

### Indicator

Use the `indicator` prop to change the position or hide the indicator. Defaults to `start`.

::component-code
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
items:
  indicator:
    - start
    - end
    - hidden
  variant:
    - list
    - card
    - table
props:
  indicator: 'end'
  variant: 'card'
  defaultValue:
    - 'System'
  items:
    - 'System'
    - 'Light'
    - 'Dark'
---
::

### Disabled

Use the `disabled` prop to disable the CheckboxGroup.

::component-code
---
prettier: true
ignore:
  - defaultValue
  - items
external:
- items
items:
  variant:
  - list
  - card
  - table
props:
  disabled: true
  variant: 'list'
  defaultValue:
    - 'System'
  items:
    - 'System'
    - 'Light'
    - 'Dark'
---
::

## Examples

### Settings layout :badge{label="Soon" class="align-text-top"}

Use the `card` variant together with the `#label` slot to render a settings-style picker where each option has a title, description, a "Learn more" link and a preview image. The label slot renders inside a `<span>`, so any phrasing-content layout (flex, link, image) works.

::component-example
---
collapse: true
name: 'checkbox-group-settings-example'
---
::

::prompt
---
description: Build a rich checkbox-card settings picker (preview + description + link).
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
Build a multi-toggle settings picker as `B24CheckboxGroup` with `variant="card"`. Each option renders a title, a multi-line description, an inline "Learn more" link and a preview image on the right side, laid out via the `#label` slot. Several options can be enabled at once — `v-model` binds to an array.

Before generating the code, ask me for the missing details — do not guess:
- How many capabilities there are and what their `value` / `title` / description text should be
- The URL behind each "Learn more" link (and whether all options share one or each has its own)
- Where the preview asset comes from: real image, `<Placeholder>` while artwork is in flight, or omit entirely
- Whether selection must be persisted (`v-model` target — local `ref<string[]>`, Pinia store, query param, server)
- Which `size` (`sm` / `md` / `lg`) and `color` token fit the surrounding page
- Whether the picker is inside a `B24Form` (then it should be wrapped in `B24FormField` with a label)
- Whether any combinations are mutually exclusive — if yes, that logic must live in the parent (e.g. a `watch` that prunes incompatible values), not in the markup

Requirements once details are confirmed:
- Declare a local `interface` for the item shape (`value`, `title`, `text`, `href`, optional `preview`) and type the array with it — do NOT use `CheckboxGroupItem[]` (that widens user fields to `any`)
- Inside the `#label` slot use `<span>` wrappers only (no `<div>` / `<p>` — the slot is rendered as `<span>` for the `card` variant)
- Apply semantic utilities (`text-description`, `text-(length:--ui-font-size-md)`, …) — never raw Tailwind palette colors
- Hide the preview below the `sm` breakpoint (`hidden sm:flex`)
- Add `@click.stop` to the inline `B24Link` so the link doesn't toggle the checkbox
- If `item.href` may come from an untrusted source, validate it (reject `javascript:` / `data:` / open-redirect URLs) before binding
::

::tip
Stop the click from toggling the checkbox when the user follows the inline link by adding `@click.stop` to it.
::

::note
Same recipe works for single-select — see [RadioGroup → Settings layout](/docs/components/radio-group#settings-layout). For icon-and-description grids (no preview image), reach for [`B24PageCardGroup`](/docs/components/page-card-group) instead.
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
