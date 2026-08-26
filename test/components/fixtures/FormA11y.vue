<template>
  <B24Form>
    <B24FormField id="emailField" name="email" label="Email">
      <B24Input id="email" />
    </B24FormField>
    <B24FormField id="passwordField" name="password" label="Password">
      <B24Input id="password" />
    </B24FormField>

    <!--
      The labelled sub-section from #49, which the docs example
      `FormExampleEditSection.vue` builds by hand because b24ui has no
      `fieldset` primitive: a `<span>` heading tied to a `role="group"`
      container through `aria-labelledby`. Nothing exercised it, so a refactor
      that dropped the `useId()` or renamed the binding would have taken the
      grouping away silently (#50).

      A `<span>` is a valid label for `role="group"` via `aria-labelledby` —
      no `<legend>` needed — so axe passes here with no suppression.
    -->
    <span :id="clientGroupId">Client</span>
    <div
      role="group"
      :aria-labelledby="clientGroupId"
    >
      <B24FormField id="companyField" name="company" label="Company">
        <B24Input id="company" />
      </B24FormField>
      <B24FormField id="contactField" name="contact" label="Contact">
        <B24Input id="contact" />
      </B24FormField>
    </div>

    <B24Form name="nested" nested>
      <B24FormField id="nestedField" name="field" label="Nested Field">
        <B24Input id="nested" />
      </B24FormField>
    </B24Form>
  </B24Form>
</template>

<script setup lang="ts">
// Imported from `vue`, not left to Nuxt's auto-import: this fixture is mounted
// by both vitest projects, and the plain-Vue one has no `#imports`.
import { useId } from 'vue'

// `useId()` rather than a literal, because that is what the pattern under test
// uses — a hard-coded id would pass this fixture while the real one broke.
const clientGroupId = useId()
</script>
