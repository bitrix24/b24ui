# Landing Page Layout

Build public-facing pages — landing, blog, changelog, pricing — using the Header + Main + Footer shell with Page components.

## When to use

- Marketing sites, product pages, company sites
- Blog and content pages
- Pricing, changelog, portfolio pages
- Any public-facing page that isn't a dashboard or documentation

## App shell

```vue [app.vue]
<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Features',
  to: '#features'
}, {
  label: 'Pricing',
  to: '/pricing'
}, {
  label: 'Blog',
  to: '/blog'
}])
</script>

<template>
  <B24App>
    <B24Header>
      <template #title>
        <Logo class="h-6 w-auto" />
      </template>

      <B24NavigationMenu :items="items" />

      <template #right>
        <B24ColorModeButton />
        <B24Button label="Sign in" color="air-tertiary-no-accent" />
        <B24Button label="Get started" />
      </template>

      <template #body>
        <B24NavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      </template>
    </B24Header>

    <B24Main>
      <NuxtPage />
    </B24Main>

    <B24Footer>
      <template #left>
        <p class="text-muted text-sm">Copyright © {{ new Date().getFullYear() }}</p>
      </template>
      <template #right>
        <B24Button :icon="GitHubIcon" color="air-tertiary-no-accent" to="https://github.com" target="_blank" />
      </template>
    </B24Footer>
  </B24App>
</template>
```

### Common mistakes

- Forgetting the `#body` slot on `B24Header` — this is the mobile menu content. Without it, mobile users have no navigation.

## Landing page

```vue [pages/index.vue]
<script setup lang="ts">
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import PaletteIcon from '@bitrix24/b24icons-vue/outline/PaletteIcon'
import MobileIcon from '@bitrix24/b24icons-vue/outline/MobileIcon'

const features = [
  { title: 'Accessible', description: 'Built on Reka UI with full ARIA support.', icon: PersonIcon },
  { title: 'Customizable', description: 'Tailwind Variants theming with full control.', icon: PaletteIcon },
  { title: 'Responsive', description: 'Mobile-first components.', icon: MobileIcon }
]
</script>

<template>
  <B24PageSection
    id="features"
    headline="Features"
    title="Everything you need"
    description="A comprehensive suite of components and utilities."
    :features="features"
  />
</template>
```

`icon` is a **component reference**, never a string — Iconify-style names like `i-lucide-palette` are an upstream idiom and resolve to nothing here. See [icons](../guidelines/icons.md).

## Key components

- `B24PageSection` — content section with headline, title, description, and `features` grid. Use `id` for anchor links.
- `B24PageGrid` / `B24PageCard` — card grid for features, testimonials, etc.
- `B24PageFeature` — individual feature item.
- `B24FooterColumns` — multi-column footer with link groups (used inside `B24Footer`).

## Variations

### Alternating feature sections

```vue
<B24PageSection title="Feature A" orientation="horizontal">
  <img src="/feature-a.png" />
</B24PageSection>

<B24PageSection title="Feature B" orientation="horizontal" reverse>
  <img src="/feature-b.png" />
</B24PageSection>
```
