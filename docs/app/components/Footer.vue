<script setup lang="ts">
const route = useRoute()

const links = [{
  label: 'Docs',
  to: '/docs'
}, {
  label: 'Figma',
  to: '/figma'
}, {
  label: 'Templates',
  to: '/templates'
}, {
  label: 'Showcase',
  to: '/showcase'
}, {
  label: 'Team',
  to: '/team'
}, {
  label: 'Releases',
  to: 'https://github.com/nuxt/ui/releases',
  target: '_blank'
}]
</script>

<template>
  <B24Separator :icon="route.path === '/' ? undefined : 'i-simple-icons-nuxtdotjs'" class="h-px" />

  <B24Footer>
    <template #left>
      <NuxtLink to="https://github.com/nuxt/ui" target="_blank" class="text-sm text-muted">
        Published under <span class="text-highlighted">MIT License</span>
      </NuxtLink>
    </template>

    <B24NavigationMenu :items="links" variant="link" />

    <template #right>
      <B24Button
        aria-label="Nuxt Website"
        icon="i-simple-icons-nuxtdotjs"
        to="https://nuxt.com"
        target="_blank"
        size="sm"
      />
      <B24Button
        aria-label="Nuxt UI on GitHub"
        icon="i-simple-icons-github"
        to="https://github.com/nuxt/ui"
        target="_blank"
        size="sm"
      />
    </template>
  </B24Footer>
</template>
