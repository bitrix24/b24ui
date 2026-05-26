---
title: Theme
description: A headless component for theming its child components.
category: layout
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Theme.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/theme
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/theme
---

## Usage

The Theme component allows you to override default **slot classes** and **props** of all child components without modifying each one individually. It uses Vue's `provide` / `inject` mechanism under the hood, so the overrides apply at any depth.

::note
The Theme component doesn't render any HTML element, it only provides theme overrides to its children.
::

### Slot classes

Use the `b24ui` prop to override slot classes of descendant components. Keys are component names (camelCase) and values are their slot class overrides.

::component-example
---
name: 'theme-ui-example'
---
::

### Prop defaults

Use the `props` prop to override the default value of any prop on descendant components. Each key maps to a partial of that component's props.

::component-example
---
name: 'theme-props-example'
---
::

::tip
Explicit props on a component (e.g. `<B24Button color="air-primary" />`) always win over `<B24Theme :props>`. Theme defaults only apply when the prop wasn't passed explicitly.
::

## Examples

### Multiple components

Use different keys in `b24ui` or `props` to theme multiple component types at once.

::component-example
---
name: 'theme-multiple-example'
---
::

### Nested themes

Nest multiple Theme components to compose overrides. The innermost Theme takes precedence, while unoverridden keys are inherited from the outer Theme.

::component-example
---
name: 'theme-nested-example'
---
::

### Explicit priority

Explicitly setting any prop (including `b24ui`) on an individual component always takes priority over the Theme component.

::component-example
---
name: 'theme-priority-example'
---
::

### Deep propagation

The overrides are available to all descendant components regardless of how deeply nested they are.

::component-example
---
name: 'theme-deep-example'
---
::

::note
In this example, `MyButton` is a custom component that renders a `B24Button` internally. The theme overrides still apply because they propagate through the entire component tree.
::

### Form components

Use the Theme component to apply consistent styling across a group of form components.

::component-example
---
name: 'theme-form-example'
collapse: true
---
::

::tip
`<B24FormField>`, `<B24FieldGroup>` and `<B24AvatarGroup>` keep precedence over `<B24Theme :props>` for `size`, `color` and `highlight`. Validation errors also force the `error` color over any theme value.
::

### Prose components

Use the `prose` namespace to theme typography components. Keys are nested under `prose` (e.g. `prose.p`, `prose.code`).

::component-example
---
name: 'theme-prose-example'
collapse: true
---
::

## API

### Props

:component-props

### Slots

:component-slots
