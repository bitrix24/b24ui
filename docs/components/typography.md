---
title: Typography
description: 'Bitrix24 UI offers typography components for content styling.'
outline: deep
---
<script setup>
import pH1Example from '/examples/prose/pH1.vue';
import pH2Example from '/examples/prose/pH2.vue';
import pH3Example from '/examples/prose/pH3.vue';
import pH4Example from '/examples/prose/pH4.vue';
import pH5Example from '/examples/prose/pH5.vue';
import pH6Example from '/examples/prose/pH6.vue';
import pPExample from '/examples/prose/pP.vue';
import pAExample from '/examples/prose/pA.vue';
import pBlockquoteExample from '/examples/prose/pBlockquote.vue';
import pStrongExample from '/examples/prose/pStrong.vue';
import pEmExample from '/examples/prose/pEm.vue';
import pUlExample from '/examples/prose/pUl.vue';
import pOlExample from '/examples/prose/pOl.vue';
import pHrExample from '/examples/prose/pHr.vue';
import pTableExample from '/examples/prose/pTable.vue';
import pImgExample from '/examples/prose/pImg.vue';
import pCodeExample from '/examples/prose/pCode.vue';
import pPreExample from '/examples/prose/pPre.vue';
</script>
# Typography

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

<Description
  nuxt-ui="https://ui.nuxt.com/getting-started/typography"
  demo="/components/prose/show"
>
  Bitrix24 UI offers typography components for content styling.
</Description>

## Usage

When using Bitrix24 UI with [Nuxt Content v3](https://content.nuxt.com/), you get access to a set of pre-styled prose components.

When using the `<ContentRenderer>` component, your markdown content will be automatically styled with beautiful typography and consistent spacing. This includes headings, paragraphs, lists, tables, code blocks and more - no additional configuration required.

::: tip
You can follow [`@nuxt/content`](https://content.nuxt.com/docs/getting-started/installation) installation guide to get started.
:::

## Prose Components

Prose components are replacements for HTML typography tags introduced by the `@nuxtjs/mdc` module, Bitrix24 UI overrides each one to provide a consistent look and feel.

::: tip
You can learn more about [Prose components](https://content.nuxt.com/docs/components/prose) in the Nuxt Content documentation.
:::

::: info
You can use the prose components directly in your templates using the `Prose` prefix.

```vue
<template>
  <ProseTable>
    <ProseThead>
      <ProseTr>
        <ProseTh>Prop</ProseTh>
        <ProseTh>Default</ProseTh>
      </ProseTr>
    </ProseThead>
    <ProseTbody>
      <ProseTr>
        <ProseTd>
          <ProseCode>color</ProseCode>
        </ProseTd>
        <ProseTd>
          <ProseCode>collab</ProseCode>
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
```

:::

### h1

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pH1Example />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pH1.vue{2 vue:line-numbers}

### h2

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pH2Example />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pH2.vue{2 vue:line-numbers}

### h3

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pH3Example />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pH3.vue{2 vue:line-numbers}

### h4

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pH4Example />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pH4.vue{2 vue:line-numbers}

### h5

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pH5Example />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pH5.vue{2 vue:line-numbers}

### h6

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pH6Example />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pH6.vue{2 vue:line-numbers}

### p

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pPExample />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pP.vue{2 vue:line-numbers}

### a

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pAExample />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pA.vue{4 vue:line-numbers}

### blockquote

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pBlockquoteExample />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pBlockquote.vue{2,5 vue:line-numbers}

### strong

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pStrongExample />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pStrong.vue{2 vue:line-numbers}

### em

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pEmExample />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pEm.vue{2 vue:line-numbers}

### ul

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pUlExample />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pUl.vue{2,4,9 vue:line-numbers}

### ol

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pOlExample />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pOl.vue{2,4,9 vue:line-numbers}

### hr

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pHrExample />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pHr.vue{7 vue:line-numbers}

### table

::: info
You can use props `rounded`, `zebra`, `rowHover`, `bordered`.

See [`TableWrapper`](/components/table-wrapper) for more details
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pTableExample />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pTable.vue{2,3 vue:line-numbers}

### img

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pImgExample />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pImg.vue{2,3 vue:line-numbers}

### code

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pCodeExample />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pCode.vue{3,4 vue:line-numbers}

### pre

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <pPreExample />
  </ClientOnly>
</div>

<<< @/examples/prose/demo/pPre.vue{2,4,10 vue:line-numbers}
