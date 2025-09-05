<script setup lang="ts">
/**
 * @todo add B24SelectMenu
 */
import FormExample from '../../../../../docs/app/components/content/examples/form/FormExample.vue'
import FormExampleOnError from '../../../../../docs/app/components/content/examples/form/FormExampleOnError.vue'
import FormExampleNested from '../../../../../docs/app/components/content/examples/form/FormExampleNested.vue'
import FormExampleNestedList from '../../../../../docs/app/components/content/examples/form/FormExampleNestedList.vue'
import FormExampleElements from '../../../../../docs/app/components/content/examples/form/FormExampleElements.vue'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('Form')
const validateOn = ref(['input', 'change', 'blur'])
const disabled = ref(false)
const isUseBg = ref(true)
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base" :use-bg="isUseBg">
      <ExampleCardSubTitle title="simple" />
      <FormExample />
    </ExampleCard>

    <ExampleCard title="nested" :use-bg="isUseBg">
      <ExampleCardSubTitle title="simple" />
      <FormExampleNested />
    </ExampleCard>

    <ExampleCard title="nested" :use-bg="isUseBg">
      <ExampleCardSubTitle title="list" />
      <FormExampleNestedList />
    </ExampleCard>

    <ExampleCard title="validate" :use-bg="isUseBg">
      <ExampleCardSubTitle title="external validate" />
      <FormExampleOnError />
    </ExampleCard>
  </ExampleGrid>
  <B24Separator accent="accent" class="my-4" label="Config" type="dotted" />
  <ExampleGrid v-once class="mb-4">
    <ExampleCard title="for elements" :use-bg="isUseBg" class="sm:col-span-2 md:col-span-4">
      <B24Separator class="my-3" type="dotted" />
      <div class="flex flex-col gap-4 items-start">
        <B24FormField label="Validate on" class="w-full">
          <B24Select v-model="validateOn" :items="['input', 'change', 'blur']" multiple class="w-full max-w-[240px]" />
        </B24FormField>
        <B24Checkbox v-model="disabled" label="Disabled" />
      </div>
    </ExampleCard>
    <ExampleCard title="elements" :use-bg="isUseBg" class="sm:col-span-2 md:col-span-4">
      <ExampleCardSubTitle title="form" />
      <FormExampleElements
        class="mx-auto w-full max-w-[400px]"
        :validate-on="validateOn"
        :disabled="disabled"
      />
    </ExampleCard>
  </ExampleGrid>
</template>
