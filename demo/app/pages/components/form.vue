<script setup lang="ts">
/**
 * @todo add B24SelectMenu
 */
import FormExample from '../../../../docs/examples/form/FormExample.vue'
import FormExampleNested from '../../../../docs/examples/form/FormExampleNested.vue'
import FormExampleNestedList from '../../../../docs/examples/form/FormExampleNestedList.vue'
import FormExampleElements from '../../../../docs/examples/form/FormExampleElements.vue'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('Form')
const validateOn = ref(['input', 'change', 'blur'])
const disabled = ref(false)
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base">
      <ExampleCardSubTitle title="simple" />
      <FormExample />
    </ExampleCard>

    <ExampleCard title="nested">
      <ExampleCardSubTitle title="simple" />
      <FormExampleNested />
    </ExampleCard>

    <ExampleCard title="nested">
      <ExampleCardSubTitle title="list" />
      <FormExampleNestedList />
    </ExampleCard>
  </ExampleGrid>
  <ExampleGrid v-once class="mt-2">
    <ExampleCard title="config">
      <ExampleCardSubTitle title="for elements" class="mt-4" />
      <div class="flex flex-col gap-4 items-start">
        <B24FormField label="Validate on" class="w-full">
          <B24Select v-model="validateOn" :items="['input', 'change', 'blur']" multiple class="w-full" />
        </B24FormField>
        <B24Checkbox v-model="disabled" label="Disabled" />
      </div>
    </ExampleCard>
    <ExampleCard title="elements">
      <ExampleCardSubTitle title="form" />
      <FormExampleElements
        :validate-on="validateOn"
        :disabled="disabled"
      />
    </ExampleCard>
  </ExampleGrid>
</template>
