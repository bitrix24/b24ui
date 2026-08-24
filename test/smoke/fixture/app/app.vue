<!--
  A few components rather than one, because the failures this page exists to
  catch are not per-component: a runtime plugin that throws, a theme template
  that did not make it into the build, an injection key duplicated across two
  copies of a dependency. Any of those takes the whole page down, and it takes
  a rendered component to reach them at all.

  `The package booted.` is asserted by `test/smoke/run.mjs` — a Vue app that
  dies in `setup()` still returns 200 with an empty root, so the run has to
  check that something actually rendered.
-->
<template>
  <B24Container>
    <B24Alert
      title="Smoke"
      description="The package booted."
    />
    <B24Button
      label="Press"
      @click="count++"
    />
    <B24Badge :label="String(count)" />
    <B24Link to="/">
      Home
    </B24Link>
  </B24Container>
</template>

<script setup lang="ts">
// Imported rather than auto-imported: this directory has no Nuxt-generated
// tsconfig, so the repo-root `vue-tsc` that sweeps `test/` cannot see Nuxt's
// ambient `ref`.
import { ref } from 'vue'

const count = ref(0)
</script>
