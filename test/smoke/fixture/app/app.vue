<!--
  A few components rather than one, because the failures this page exists to
  catch are not per-component: a runtime plugin that throws, a theme template
  that did not make it into the build, an injection key duplicated across two
  copies of a dependency. Any of those takes the whole page down, and it takes
  a rendered component to reach them at all.

  `The package booted.` is asserted by `test/smoke/run.mjs` — a Vue app that
  dies in `setup()` still returns 200 with an empty root, so the run has to
  check that something actually rendered.

  The counter is asserted too, and it is the stronger of the two: that text is
  in the server-rendered HTML before any client code runs, so it proves nothing
  about hydration. A click that moves the badge from 0 to 1 does — it needs the
  handler to have been attached in the browser. Hydration that hangs quietly,
  without throwing, passes every other check here.
-->
<template>
  <B24Container>
    <B24Alert
      title="Smoke"
      description="The package booted."
    />
    <B24Button
      data-testid="press"
      label="Press"
      @click="count++"
    />
    <B24Badge
      data-testid="counter"
      :label="String(count)"
    />
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
