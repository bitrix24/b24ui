<script setup lang="ts">
import usePageMeta from './../../../composables/usePageMeta'
import ExampleGrid from '../../../components/ExampleGrid.vue'
import ExampleCard from '../../../components/ExampleCard.vue'
// import ExampleCardSubTitle from '../../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('Prose')
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="simple" class="col-span-2">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <ProseH1>
          Some H1
        </ProseH1>
        <ProseH2>
          Some H2
        </ProseH2>
        <ProseH3>
          Some H2
        </ProseH3>
        <B24Separator class="my-3" type="dotted" />
        <ProseP>
          Some p
        </ProseP>
        <B24Separator class="my-3" type="dotted" />
        <ProseUl>
          <ProseLi>Some ul/li</ProseLi>
          <ProseLi>
            Some ul/li
            <ProseOl>
              <ProseLi>Some ul/li/ol/li</ProseLi>
              <ProseLi>Some ul/li/ol/li</ProseLi>
              <ProseLi>Some ul/li/ol/li</ProseLi>
            </ProseOl>
          </ProseLi>
          <ProseLi>Some ul/li</ProseLi>
          <ProseLi>
            Some ul/li
            <ProseUl>
              <ProseLi>Some ul/li/ul/li</ProseLi>
              <ProseLi>Some ul/li/ul/li</ProseLi>
              <ProseLi>Some ul/li/ul/li</ProseLi>
            </ProseUl>
          </ProseLi>
          <ProseLi>Some ul/li</ProseLi>
        </ProseUl>
        <B24Separator class="my-3" type="dotted" />
        <ProseOl>
          <ProseLi>Some ol/li</ProseLi>
          <ProseLi>Some ol/li</ProseLi>
          <ProseLi>Some ol/li</ProseLi>
        </ProseOl>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
