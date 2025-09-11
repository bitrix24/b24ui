---
title: AvatarGroup
description: Pile multiple avatars into a single group.
category: element
---
<script setup>
import AvatarGroupExample from '/examples/avatargroup/AvatarGroup.vue';
import SizeExample from '/examples/avatargroup/Size.vue';
import MaxExample from '/examples/avatargroup/Max.vue';
import WithTooltipExample from '/examples/avatargroup/WithTooltip.vue';
import WithChipExample from '/examples/avatargroup/WithChip.vue';
import WithLinkExample from '/examples/avatargroup/WithLink.vue';
</script>
# AvatarGroup

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/avatar-group"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/AvatarGroup.vue"
  demo="/components/avatar"
>
  Pile multiple avatars into a single group.
</Description>

## Usage

Wrap multiple [Avatar](/docs/components/avatar/) within an AvatarGroup to stack them.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <AvatarGroupExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/avatargroup/demo/AvatarGroup.vue{2,6 vue:line-numbers}
:::

### Size

Use the `size` prop to change the size of all the avatars.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/avatargroup/demo/Size.vue{14 vue:line-numbers}
:::

### Max

Use the `max` prop to limit the number of avatars displayed. The rest is displayed as an `+X` avatar.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <MaxExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/avatargroup/demo/Max.vue{13 vue:line-numbers}
:::

## Examples

### With tooltip

Wrap each avatar with a [Tooltip](/docs/components/tooltip/) to display a tooltip on hover.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithTooltipExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/avatargroup/demo/WithTooltip.vue{3,6,9 vue:line-numbers}
:::

### With chip

Wrap each avatar with a [Chip](/docs/components/chip/) to display a chip around the avatar.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithChipExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/avatargroup/demo/WithChip.vue{7,13,20 vue:line-numbers}
:::

### With link

Wrap each avatar with a [Link](/docs/components/link/) to make them clickable.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithLinkExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/avatargroup/demo/WithLink.vue{3-8,10 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="AvatarGroup" />

### Slots

<ComponentSlots component="AvatarGroup" />
