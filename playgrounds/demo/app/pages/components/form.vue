<script setup lang="ts">
import FormExample from '../../../../../docs/app/components/content/examples/form/FormExampleBasic.vue'
import FormExampleOnError from '../../../../../docs/app/components/content/examples/form/FormExampleOnError.vue'
import FormExampleNested from '../../../../../docs/app/components/content/examples/form/FormExampleNested.vue'
import FormExampleNestedList from '../../../../../docs/app/components/content/examples/form/FormExampleNestedList.vue'
import FormExampleElements from '../../../../../docs/app/components/content/examples/form/FormExampleElements.vue'

const validateOn = ref(['input', 'change', 'blur'])
const disabled = ref(false)
</script>

<template>
  <PlaygroundPage>
    <template #default="{ cardVariant, cardBorderClass }">
      <B24Card :variant="cardVariant" :class="[cardBorderClass, 'grow']">
        <template #header>
          <ProseH5 class="mb-0">
            Base
          </ProseH5>
        </template>
        <FormExample />
      </B24Card>

      <B24Card :variant="cardVariant" :class="[cardBorderClass, 'grow']">
        <template #header>
          <ProseH5 class="mb-0">
            Nested
          </ProseH5>
        </template>
        <FormExampleNested />
      </B24Card>

      <B24Card :variant="cardVariant" :class="[cardBorderClass, 'grow']">
        <template #header>
          <ProseH5 class="mb-0">
            Nested list
          </ProseH5>
        </template>
        <FormExampleNestedList />
      </B24Card>

      <B24Card :variant="cardVariant" :class="[cardBorderClass, 'grow']">
        <template #header>
          <ProseH5 class="mb-0">
            Validate
          </ProseH5>
        </template>
        <FormExampleOnError />
      </B24Card>

      <B24Card :variant="cardVariant" :class="[cardBorderClass, 'grow']" :b24ui="{ body: 'overflow-x-auto' }">
        <template #header>
          <div class="py-2 px-4 flex gap-4 items-center overflow-x-auto">
            <B24FormField label="Validate on" orientation="horizontal">
              <B24SelectMenu v-model="validateOn" :items="['input', 'change', 'blur']" multiple class="w-48" />
            </B24FormField>
            <B24Checkbox v-model="disabled" label="Disabled" />
          </div>
        </template>
        <FormExampleElements :validate-on="validateOn" :disabled="disabled" class="p-4 w-120" />
      </B24Card>
    </template>
  </PlaygroundPage>
</template>
