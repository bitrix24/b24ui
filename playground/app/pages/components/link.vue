<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'

usePageMeta.setPageTitle('Links')
</script>

<template>
  <div class="flex items-center gap-6">
    <div class="flex flex-col items-start gap-4 text-sm">
      <B24Link raw>
        Button raw
      </B24Link>

      <B24Link active>
        Button active
      </B24Link>
      <B24Link active class="font-medium" active-class="text-alert-link">
        Button active with class
      </B24Link>
      <B24Link active disabled>
        Button active disabled
      </B24Link>

      <B24Link>
        Button inactive
      </B24Link>
      <B24Link class="font-medium" inactive-class="hover:not-disabled:not-aria-disabled:text-alert-link">
        Button inactive with class
      </B24Link>
      <B24Link disabled>
        Button inactive disabled
      </B24Link>
    </div>

    <div class="flex flex-col items-start gap-4 text-sm">
      <B24Link to="/components/link" raw>
        Link raw
      </B24Link>

      <B24Link to="/components/link">
        Link active
      </B24Link>
      <B24Link to="/components/link" class="font-medium" active-class="text-alert-link">
        Link active with class
      </B24Link>
      <B24Link to="/components/link" disabled>
        Link active disabled
      </B24Link>

      <B24Link to="/components/button">
        Link inactive
      </B24Link>
      <B24Link to="/components/button" class="font-medium" inactive-class="hover:not-disabled:not-aria-disabled:text-alert-link">
        Link inactive with class
      </B24Link>
      <B24Link to="/components/button" disabled>
        Link inactive disabled
      </B24Link>
    </div>
  </div>
</template>
