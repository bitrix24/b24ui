---
title: FormField
description: A container for form elements with built-in validation and error management.
category: form
---
<script setup>
import FormFieldExample from '/examples/formfield/FormField.vue';
import RequiredExample from '/examples/formfield/Required.vue';
import DescriptionExample from '/examples/formfield/Description.vue';
import HintExample from '/examples/formfield/Hint.vue';
import HelpExample from '/examples/formfield/Help.vue';
import ErrorExample from '/examples/formfield/Error.vue';
import SizeExample from '/examples/formfield/Size.vue';
</script>
# FormField

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/form-field"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/FormField.vue"
  demo="/components/form-field"
>
  A container for form elements with built-in validation and error management.
</Description>

## Usage

Wrap any form component with a FormField. Used in a [Form](/docs/components/form/), it provides validation and error handling.

### Label

Use the `label` prop to set the label for the form control.

::: info
The label `for` attribute and the form control are associated with a unique `id` if not provided.
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <FormFieldExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/formfield/demo/FormField.vue{12 vue:line-numbers}
:::

When using the `required` prop, an asterisk is added next to the label.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <RequiredExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/formfield/demo/Required.vue{16 vue:line-numbers}
:::

### Description

Use the `description` prop to provide additional information below the label.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DescriptionExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/formfield/demo/Description.vue{13 vue:line-numbers}
:::

### Hint

Use the `hint` prop to display a hint message next to the label.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <HintExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/formfield/demo/Hint.vue{13 vue:line-numbers}
:::

### Help

Use the `help` prop to display a help message below the form control.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <HelpExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/formfield/demo/Help.vue{13 vue:line-numbers}
:::

### Error

Use the `error` prop to display an error message below the form control. When used together with the `help` prop, the `error` prop takes precedence.

When used inside a [Form](/docs/components/form/), this is automatically set when a validation error occurs.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ErrorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/formfield/demo/Error.vue{13 vue:line-numbers}
:::

### Size

Use the `size` prop to change the size of the FormField, the `size` is proxied to the form control.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/formfield/demo/Size.vue{13 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="FormField" />

### Slots

<ComponentSlots component="FormField" />
