<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('Links')
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="button" class="md:col-span-2">
      <ExampleCardSubTitle title="raw" />
      <div class="mb-4 flex flex-col items-start gap-4 text-(length:--ui-font-size-sm)">
        <B24Link raw>
          Button raw
        </B24Link>
      </div>
      <div class="mb-4 flex flex-col items-start gap-4 text-(length:--ui-font-size-sm)">
        <B24Link is-action>
          Some action
        </B24Link>
      </div>

      <ExampleCardSubTitle title="active" />
      <div class="mb-4 flex flex-col items-start gap-4 text-(length:--ui-font-size-sm)">
        <B24Link active>
          Button active
        </B24Link>
        <B24Link active class="font-(--ui-font-weight-medium)" active-class="text-(--ui-color-accent-main-alert)">
          Button active with class
        </B24Link>
        <B24Link active disabled>
          Button active disabled
        </B24Link>
      </div>

      <ExampleCardSubTitle title="inactive" />
      <div class="mb-4 flex flex-col items-start gap-4 text-(length:--ui-font-size-sm)">
        <B24Link>
          Button inactive
        </B24Link>
        <B24Link class="font-(--ui-font-weight-medium)" inactive-class="hover:not-disabled:not-aria-disabled:text-(--ui-color-accent-main-alert)">
          Button inactive with class
        </B24Link>
        <B24Link disabled>
          Button inactive disabled
        </B24Link>
      </div>
    </ExampleCard>
    <ExampleCard title="link" class="md:col-span-2">
      <ExampleCardSubTitle title="raw" />
      <div class="mb-4 flex flex-col items-start gap-4 text-(length:--ui-font-size-sm)">
        <B24Link to="/components/link" raw>
          Link raw
        </B24Link>
      </div>
      <div class="mb-4 flex flex-col items-start gap-4 text-(length:--ui-font-size-sm)">
        <B24Link to="/components/link" is-action>
          Some action
        </B24Link>
      </div>

      <ExampleCardSubTitle title="active" />
      <div class="mb-4 flex flex-col items-start gap-4 text-(length:--ui-font-size-sm)">
        <B24Link to="/components/link">
          Link active
        </B24Link>
        <B24Link to="/components/link" class="font-(--ui-font-weight-medium)" active-class="text-(--ui-color-accent-main-alert)">
          Link active with class
        </B24Link>
        <B24Link to="/components/link" disabled>
          Link active disabled
        </B24Link>
      </div>

      <ExampleCardSubTitle title="inactive" />
      <div class="mb-4 flex flex-col items-start gap-4 text-(length:--ui-font-size-sm)">
        <B24Link to="/components/button">
          Link inactive
        </B24Link>
        <B24Link to="/components/button" class="font-(--ui-font-weight-medium)" inactive-class="hover:not-disabled:not-aria-disabled:text-(--ui-color-accent-main-alert)">
          Link inactive with class
        </B24Link>
        <B24Link to="/components/button" disabled>
          Link inactive disabled
        </B24Link>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
