---
title: Textarea
description: A textarea for entering multi-line text.
outline: deep
---
<script setup>
import TextareaExample from '/examples/textarea/Textarea.vue';
import PlaceholderExample from '/examples/textarea/Placeholder.vue';
import ColorExample from '/examples/textarea/Color.vue';
import TagExample from '/examples/textarea/Tag.vue';
</script>
# Textarea

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/textarea"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Textarea.vue"
>
  A textarea for entering multi-line text.
</Description>

## Usage

Use the `v-model` directive to control the value of the Textarea.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <TextareaExample />
  </ClientOnly>
</div>

<<< @/examples/textarea/demo/Textarea.vue{4,8 vue:line-numbers}

### Placeholder

Use the `placeholder` prop to set a placeholder text.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <PlaceholderExample />
  </ClientOnly>
</div>

<<< @/examples/textarea/demo/Placeholder.vue{4,8 vue:line-numbers}

### Color

Use the `color` prop to change the ring color when the Textarea is focused.

::: info
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

<<< @/examples/textarea/demo/Color.vue{17-18 vue:line-numbers}

### Tag

Use the `tag` property to display a small legend on top of the text area.

Use the `tagColor` property to set the color for `tag`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <TagExample />
  </ClientOnly>
</div>

<<< @/examples/textarea/demo/Tag.vue{17-18 vue:line-numbers}

### Size

Use the `size` prop to change the size of the Textarea.

::component-code
---
ignore:
  - placeholder
props:
  size: xl
  placeholder: 'Type something...'
---
::

### Disabled

Use the `disabled` prop to disable the Textarea.

::component-code
---
ignore:
  - placeholder
props:
  disabled: true
  placeholder: 'Type something...'
---
::

### Rows

Use the `rows` prop to set the number of rows. Defaults to `3`.

::component-code
---
props:
  rows: 12
---
::

### Autoresize

Use the `autoresize` prop to enable autoresizing the height of the Textarea.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 'This is a long text that will autoresize the height of the Textarea.'
  autoresize: true
---
::

Use the `maxrows` prop to set the maximum number of rows when autoresizing. If set to `0`, the Textarea will grow indefinitely.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 'This is a long text that will autoresize the height of the Textarea with a maximum of 4 rows.'
  maxrows: 4
  autoresize: true
---
::

## API

### Props

:component-props

### Slots

:component-slots

### Emits

:component-emits

### Expose

When accessing the component via a template ref, you can use the following:

| Name | Type |
| ---- | ---- |
| `textareaRef`{lang="ts-type"} | `Ref<HTMLTextAreaElement \| null>`{lang="ts-type"} |

## Theme

:component-theme
