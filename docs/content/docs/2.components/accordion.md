---
title: Accordion
description: This is a stacked set of collapsible panels
category: data
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Accordion.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/accordion
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/accordion
  - label: Accordion
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/accordion
---

## Usage

Use the Accordion component to display a list of collapsible items.

::component-code
---
collapse: true
ignore:
  - items
external:
  - items
hide:
  - class
  - defaultValue
props:
  defaultValue: '0'
  class: 'px-4 max-w-[512px]'
  items:
    - label: 'Getting started with Bitrix24'
      content: 'Bitrix24 is an online service that offers useful tools for your company. This includes chats and calls, tasks and projects, CRM, and AI-powered assistant.'
    - label: 'Main features of Bitrix24'
      content: 'Bitrix24 is an online service that has all the tools for company operation and business management.'
    - label: 'Bitrix24 Cloud plans'
      content: 'Bitrix24 is an online service for business management and work automation. It contains tools for companies of all sizes and industries. Bitrix24 has several plans with different sets of tools that are suitable for different types of business.'
---
::

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `trailingIcon?: IconComponent`{lang="ts-type"}
- `content?: string`{lang="ts-type"}
- `value?: string`{lang="ts-type"}
- `disabled?: boolean`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, header?: ClassNameValue, trigger?: ClassNameValue, leadingIcon?: ClassNameValue, label?: ClassNameValue, trailingIcon?: ClassNameValue, content?: ClassNameValue, body?: ClassNameValue }`{lang="ts-type"}

::component-code
---
ignore:
  - items
external:
  - items
externalTypes:
  - AccordionItem[]
hide:
  - class
props:
  class: 'px-4'
  items:
    - label: 'Getting started with Bitrix24'
      content: 'Bitrix24 is an online service that offers useful tools for your company. This includes chats and calls, tasks and projects, CRM, and AI-powered assistant.'
    - label: 'Main features of Bitrix24'
      content: 'Bitrix24 is an online service that has all the tools for company operation and business management.'
    - label: 'Bitrix24 Cloud plans'
      content: 'Bitrix24 is an online service for business management and work automation. It contains tools for companies of all sizes and industries. Bitrix24 has several plans with different sets of tools that are suitable for different types of business.'
---
::

### Multiple

Set the `type` prop to `multiple` to allow multiple items to be active at the same time. Defaults to `single`.

::component-code
---
ignore:
  - type
  - items
external:
  - items
externalTypes:
  - AccordionItem[]
hide:
  - class
props:
  class: 'px-4'
  type: 'multiple'
  items:
    - label: 'Getting started with Bitrix24'
      content: 'Bitrix24 is an online service that offers useful tools for your company. This includes chats and calls, tasks and projects, CRM, and AI-powered assistant.'
    - label: 'Main features of Bitrix24'
      content: 'Bitrix24 is an online service that has all the tools for company operation and business management.'
    - label: 'Bitrix24 Cloud plans'
      content: 'Bitrix24 is an online service for business management and work automation. It contains tools for companies of all sizes and industries. Bitrix24 has several plans with different sets of tools that are suitable for different types of business.'
---
::

### Collapsible

When `type` is `single`, you can set the `collapsible` prop to `false` to prevent the active item from collapsing.

::component-code
---
ignore:
  - collapsible
  - items
external:
  - items
externalTypes:
  - AccordionItem[]
hide:
  - class
props:
  class: 'px-4'
  collapsible: false
  items:
    - label: 'Getting started with Bitrix24'
      content: 'Bitrix24 is an online service that offers useful tools for your company. This includes chats and calls, tasks and projects, CRM, and AI-powered assistant.'
    - label: 'Main features of Bitrix24'
      content: 'Bitrix24 is an online service that has all the tools for company operation and business management.'
    - label: 'Bitrix24 Cloud plans'
      content: 'Bitrix24 is an online service for business management and work automation. It contains tools for companies of all sizes and industries. Bitrix24 has several plans with different sets of tools that are suitable for different types of business.'
---
::

### Unmount

Use the `unmount-on-hide` prop to prevent the content from being unmounted when the accordion is collapsed. Defaults to `true`.

::component-code
---
ignore:
  - items
external:
  - items
externalTypes:
  - AccordionItem[]
hide:
  - class
props:
  class: 'px-4'
  unmountOnHide: false
  items:
    - label: 'Getting started with Bitrix24'
      content: 'Bitrix24 is an online service that offers useful tools for your company. This includes chats and calls, tasks and projects, CRM, and AI-powered assistant.'
    - label: 'Main features of Bitrix24'
      content: 'Bitrix24 is an online service that has all the tools for company operation and business management.'
    - label: 'Bitrix24 Cloud plans'
      content: 'Bitrix24 is an online service for business management and work automation. It contains tools for companies of all sizes and industries. Bitrix24 has several plans with different sets of tools that are suitable for different types of business.'
---
::

::note
You can inspect the DOM to see each item's content being rendered.
::

### Disabled

Use the `disabled` property to disable the Accordion.

You can also disable a specific item by using the `disabled` property in the item object.

::component-code
---
ignore:
  - items
external:
  - items
externalTypes:
  - AccordionItem[]
hide:
  - class
props:
  class: 'px-4'
  disabled: true
  items:
    - label: 'Getting started with Bitrix24'
      content: 'Bitrix24 is an online service that offers useful tools for your company. This includes chats and calls, tasks and projects, CRM, and AI-powered assistant.'
    - label: 'Main features of Bitrix24'
      content: 'Bitrix24 is an online service that has all the tools for company operation and business management.'
    - label: 'Bitrix24 Cloud plans'
      content: 'Bitrix24 is an online service for business management and work automation. It contains tools for companies of all sizes and industries. Bitrix24 has several plans with different sets of tools that are suitable for different types of business.'
---
::

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [Icon](https://bitrix24.github.io/b24icons/icons/) of each item.

::tip
You can also set an icon for a specific item by using the `trailingIcon` property in the item object.
::

::component-code
---
ignore:
  - items
  - trailingIcon
external:
  - items
externalTypes:
  - AccordionItem[]
hide:
  - class
cast:
  trailingIcon: 'RocketIcon'
props:
  class: 'px-4'
  trailingIcon: 'RocketIcon'
  items:
    - label: 'Icons'
      content: 'You have nothing to do, @nuxt/icon will handle it automatically.'
    - label: 'Colors'
      content: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
    - label: 'Components'
      content: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
---
::

## Examples

### Control active item(s)

You can control the active item by using the `default-value` prop or the `v-model` directive with the `value` of the item. If no `value` is provided, it defaults to the index **as a string**.

::component-example
---
name: 'accordion-model-value-example'
props:
  class: 'px-4'
---
::

::caution
When `type="multiple"`, ensure to pass an array to the `default-value` prop or the `v-model` directive.
::

### With drag and drop

Use the [`useSortable`](https://vueuse.org/integrations/useSortable/) composable from [`@vueuse/integrations`](https://vueuse.org/integrations/README.html) to enable drag and drop functionality on the Accordion. This integration wraps [Sortable.js](https://sortablejs.github.io/Sortable/) to provide a seamless drag and drop experience.

::component-example
---
name: 'accordion-drag-and-drop-example'
---
::

### With body slot

Use the `#body` slot to customize the body of each item.

::component-example
---
name: 'accordion-body-slot-example'
props:
  class: 'px-4'
---
::

::tip
The `#body` slot includes some pre-defined styles, use the [`#content` slot](#with-content-slot) if you want to start from scratch.
::

### With content slot

Use the `#content` slot to customize the content of each item.

::component-example
---
name: 'accordion-content-slot-example'
props:
  class: 'px-4'
---
::

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`{lang="ts-type"}
- `#{{ item.slot }}-body`{lang="ts-type"}

::component-example
---
name: 'accordion-custom-slot-example'
props:
  class: 'px-4'
---
::

### With markdown content

You can use the [MDC](https://github.com/nuxt-modules/mdc?tab=readme-ov-file#mdc) component from `@nuxtjs/mdc` to render markdown in the accordion items.

::component-example
---
collapse: true
name: 'accordion-markdown-example'
class: 'px-8'
---
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
