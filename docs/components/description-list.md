---
title: DescriptionList
description: 'For instances requiring the conversion of a table row into its own table to enhance page completeness.'
outline: deep
---
<script setup>
import IconsExample from '/examples/descriptionlist/Icons.vue';
import DescriptionListExample from '/examples/descriptionlist/DescriptionList.vue';
import ActionsExample from '/examples/descriptionlist/Actions.vue';
import CustomExample from '/examples/descriptionlist/Custom.vue';
</script>
# DescriptionList

<Description 
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DescriptionList.vue"
  demo="/components/description-list"
>
  For instances requiring the conversion of a table row into its own table to enhance page completeness.
</Description>

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{lang="ts"}
- `icon?: FunctionalComponent<HTMLAttributes & VNodeProps>`{lang="ts"}
- `avatar?: AvatarProps`{lang="ts"}
- `slot?: string`{lang="ts"}
- `description?: string`{lang="ts"}
- `orientation?: "horizontal" | "vertical"`{lang="ts"}
- `actions?: ButtonProps[]`{lang="ts"}
- `class?: any`{lang="ts"}
- `b24ui?: { labelWrapper?: ClassNameValue, icon?: ClassNameValue, avatar?: ClassNameValue, label?: ClassNameValue, descriptionWrapper?: ClassNameValue, description?: ClassNameValue, actions?: ClassNameValue }`{lang="ts"}

## Usage

### Simple

<div class="lg:min-h-[315px]">
  <ClientOnly>
    <DescriptionListExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/descriptionlist/demo/DescriptionList.vue{vue:line-numbers}
:::

### Icons

<div class="lg:min-h-[331px]">
  <ClientOnly>
    <IconsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/descriptionlist/demo/Icons.vue{vue:line-numbers}
:::

### Actions 

<div class="lg:min-h-[533px]">
  <ClientOnly>
    <ActionsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/descriptionlist/demo/Actions.vue{vue:line-numbers}
:::

### Custom 

<div class="lg:min-h-[400px]">
  <ClientOnly>
    <CustomExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/descriptionlist/demo/Custom.vue{vue:line-numbers}
:::

## API

### Props

<ComponentProps component="DescriptionList" />

### Slots

<ComponentSlots component="DescriptionList" />
