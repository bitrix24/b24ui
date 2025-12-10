---
title: FileUpload
description: 'A file upload input component.'
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/FileUpload.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/file-upload
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/file-upload
---

## Usage

Use the `v-model` directive to control the value of the FileUpload.

::component-code
---
prettier: true
ignore:
  - modelValue
  - class
external:
  - modelValue
props:
  modelValue: null
  class: 'w-96 min-h-48'
---
::

### Multiple

Use the `multiple` prop to allow multiple files to be selected.

::component-code
---
prettier: true
ignore:
  - class
props:
  multiple: true
  class: 'w-96 min-h-48'
---
::

### Dropzone

Use the `dropzone` prop to enable/disable the droppable area. Defaults to `true`.

::component-code
---
prettier: true
ignore:
  - class
props:
  dropzone: false
  class: 'w-96 min-h-48'
---
::

### Interactive

Use the `interactive` prop to enable/disable the clickable area. Defaults to `true`.

::tip{to="#with-files-bottom-slot"}
This can be useful when adding a `Button` component in the `#actions` slot.
::

::component-code
---
ignore:
  - class
props:
  interactive: false
  class: 'w-96 min-h-48'
---
::

### Accept

Use the `accept` prop to specify the allowed file types for the input. Provide a comma-separated list of [MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types) or file extensions (e.g., `image/png,application/pdf,.jpg`). Defaults to `*` (all file types).

::component-code
---
ignore:
  - accept
  - class
props:
  accept: 'image/*'
  class: 'w-96 min-h-48'
---
::

### Label

Use the `label` prop to set the label of the FileUpload.

::component-code
---
prettier: true
ignore:
  - class
props:
  label: 'Drop your image here'
  class: 'w-96 min-h-48'
---
::

### Description

Use the `description` prop to set the description of the FileUpload.

::component-code
---
prettier: true
ignore:
  - label
  - class
props:
  label: 'Drop your image here'
  description: 'SVG, PNG, JPG or GIF (max. 2MB)'
  class: 'w-96 min-h-48'
---
::

### Icon

Use the `icon` prop to set the [Icon](https://bitrix24.github.io/b24icons/icons/) of the FileUpload.

::component-code
---
prettier: true
ignore:
  - label
  - description
  - class
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  label: 'Drop your image here'
  description: 'SVG, PNG, JPG or GIF (max. 2MB)'
  class: 'w-96 min-h-48'
---
::

### Color

Use the `color` prop to change the color of the FileUpload.

::component-code
---
prettier: true
ignore:
  - label
  - description
  - class
props:
  color: 'air-primary-alert'
  highlight: true
  label: 'Drop your image here'
  description: 'SVG, PNG, JPG or GIF (max. 2MB)'
  class: 'w-96 min-h-48'
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

### Variant

Use the `variant` prop to change the variant of the FileUpload.

::component-code
---
ignore:
  - class
props:
  variant: button
---
::

### Size

Use the `size` prop to change the size of the FileUpload.

::component-code
---
prettier: true
ignore:
  - label
  - description
  - class
props:
  size: lg
  variant: area
  label: 'Drop your image here'
  description: 'SVG, PNG, JPG or GIF (max. 2MB)'
---
::

### Layout

Use the `layout` prop to change how the files are displayed in the FileUpload. Defaults to `grid`.

::warning
This prop only works when `variant` is `area`.
::

::component-code
---
prettier: true
ignore:
  - label
  - description
  - multiple
  - class
  - b24ui.base
props:
  layout: list
  multiple: true
  label: 'Drop your images here'
  description: 'SVG, PNG, JPG or GIF (max. 2MB)'
  class: 'w-96'
  b24ui:
    base: 'min-h-48'
---
::

### Position

Use the `position` prop to change the position of the files in the FileUpload. Defaults to `outside`.

::warning
This prop only works when `variant` is `area` and when `layout` is `list`.
::

::component-code
---
prettier: true
ignore:
  - label
  - description
  - multiple
  - layout
  - class
  - b24ui.base
props:
  position: inside
  layout: list
  multiple: true
  label: 'Drop your images here'
  description: 'SVG, PNG, JPG or GIF (max. 2MB)'
  class: 'w-96'
  b24ui:
    base: 'min-h-48'
---
::

## Examples

### With Form validation

You can use the FileUpload within a [Form](/docs/components/form/) and [FormField](/docs/components/form-field/) components to handle validation and error handling.

::component-example
---
prettier: true
collapse: true
name: 'file-upload-form-validation-example'
---
::

### With default slot

You can use the default slot to make your own FileUpload component.

::component-example
---
prettier: true
collapse: true
name: 'file-upload-default-slot-example'
---
::

### With files-bottom slot

You can use the `files-bottom` slot to add a [Button](/docs/components/button/) under the files list to remove all files for example.

::component-example
---
prettier: true
collapse: true
name: 'file-upload-files-bottom-slot-example'
---
::

::note{to="#interactive"}
The `interactive` prop is set to `false` in this example to prevent the default clickable area.
::

### With files-top slot

You can use the `files-top` slot to add a [Button](/docs/components/button/) above the files list to add new files for example.

::component-example
---
prettier: true
collapse: true
name: 'file-upload-files-top-slot-example'
---
::

## API

### Props

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes" target="_blank"}
This component also supports all native `<input>` HTML attributes.
::

### Slots

:component-slots

### Emits

:component-emits

### Expose

When accessing the component via a template ref, you can use the following:

| Name | Type |
| ---- | ---- |
| `inputRef`{lang="ts-type"}    | `Ref<HTMLInputElement \| null>`{lang="ts-type"} |
| `dropzoneRef`{lang="ts-type"} | `Ref<HTMLDivElement \| null>`{lang="ts-type"}   |

## Theme

:component-theme
