<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import CrossCircle70Icon from '@bitrix24/b24icons-vue/actions/CrossCircle70Icon'
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'

usePageMeta.setPageTitle('Popover')

const openVer1 = ref(false)
const openVer2 = ref(false)
const openCustomAnchor = ref(false)
</script>

<template>
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="base" class="md:col-span-2">
      <ExampleCardSubTitle title="opening options" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Popover>
          <B24Button label="Click" color="link" depth="dark" />

          <template #content>
            <Placeholder class="size-48 m-4 inline-flex" />
          </template>
        </B24Popover>

        <B24Popover mode="hover">
          <B24Button label="Hover" color="default" depth="light" />

          <template #content>
            <Placeholder class="size-48 m-4 inline-flex" />
          </template>
        </B24Popover>

        <B24Popover
          mode="hover"
          :open-delay="500"
          :close-delay="300"
        >
          <B24Button label="delay" color="link" depth="dark" />

          <template #content>
            <Placeholder class="size-48 m-4 inline-flex" />
          </template>
        </B24Popover>

        <B24Popover
          mode="hover"
          :content="{
            align: 'center',
            side: 'right',
            sideOffset: 16
          }"
        >
          <B24Button label="content" color="default" depth="light" />

          <template #content>
            <Placeholder class="size-48 m-4 inline-flex" />
          </template>
        </B24Popover>

        <B24Popover
          mode="hover"
          arrow
        >
          <B24Button label="arrow" color="link" depth="dark" />

          <template #content>
            <Placeholder class="size-48 m-4 inline-flex" />
          </template>
        </B24Popover>
      </div>
    </ExampleCard>

    <ExampleCard title="full" class="md:col-span-2">
      <ExampleCardSubTitle title="different content" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Popover
          v-model:open="openVer1"
          arrow
          :dismissible="false"
          :b24ui="{ content: 'p-4' }"
        >
          <B24Button label="Non-dismissible" color="link" depth="dark" />

          <template #content>
            <div class="flex items-center justify-between gap-4 mb-2">
              <ProseH2>
                Popover non-dismissible
              </ProseH2>

              <B24Button
                color="link"
                :icon="CrossCircle70Icon"
                @click="openVer1 = false"
              />
            </div>

            <Placeholder class="size-full min-h-48" />
          </template>
        </B24Popover>
        <B24Popover
          v-model:open="openCustomAnchor"
          :dismissible="false"
          :b24ui="{ content: 'w-(--reka-popper-anchor-width) p-4' }"
        >
          <template #anchor>
            <B24Input
              placeholder="Search"
              class="w-full"
              @focus="openCustomAnchor = true"
            />
          </template>

          <template #content>
            <div class="flex items-center justify-between gap-4 mb-2">
              <ProseH2>
                Popover non-dismissible
              </ProseH2>

              <B24Button
                color="link"
                :icon="CrossCircle70Icon"
                @click="openCustomAnchor = false"
              />
            </div>
            <Placeholder class="size-full min-h-48" />
          </template>
        </B24Popover>

        <B24Popover arrow>
          <B24Button label="Long text" color="default" depth="light" />

          <template #content>
            <B24Container class="p-4 max-w-64 max-h-60 overflow-y-auto">
              <ProseP>Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an. Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Nec labore cetero theophrastus no, ei vero facer veritus nec. Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui.</ProseP>
              <ProseP>Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Ius dicat feugiat no, vix cu modo dicat principes. Ceteros assentior omittantur cum ad. Magna copiosae apeirian ius at. Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. Nisl omittam complectitur pro an, quem omnes munere id vix.</ProseP>
              <ProseP>Per in illud petentium iudicabit, integre sententiae pro no. Sale liber et vel. . Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. Solum vituperata definitiones te vis, vis alia falli doming ea. Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an.</ProseP>
              <ProseP>Nisl omittam complectitur pro an, quem omnes munere id vix. Odio contentiones sed cu, usu commodo prompta prodesset id. An eos iusto solet, id mel dico habemus. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula.</ProseP>
              <ProseP>Tation delenit percipitur at vix. An nam debet instructior, commodo mediocrem id cum. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Solum vituperata definitiones te vis, vis alia falli doming ea.</ProseP>
              <ProseP>Solum vituperata definitiones te vis, vis alia falli doming ea. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Solum vituperata definitiones te vis, vis alia falli doming ea. Tation delenit percipitur at vix. Sale liber et vel. Ius dicat feugiat no, vix cu modo dicat principes.</ProseP>
              <ProseP>Postulant assueverit ea his. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Per cu iracundia splendide. Magna copiosae apeirian ius at. Mandamus abhorreant deseruisse mea at, mea elit deserunt persequeris at, in putant fuisset honestatis qui. Lorem ipsum dolor sit amet, an eos lorem ancillae expetenda, vim et utamur quaestio.</ProseP>
              <ProseP>Postulant assueverit ea his. Sale liber et vel. Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an. Sale liber et vel. Eu cum iuvaret debitis voluptatibus, esse perfecto reformidans id has.</ProseP>
              <ProseP>Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. An eos iusto solet, id mel dico habemus. Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Per in illud petentium iudicabit, integre sententiae pro no.</ProseP>
              <ProseP>Per cu iracundia splendide. Per in illud petentium iudicabit, integre sententiae pro no. Ceteros assentior omittantur cum ad. Nisl omittam complectitur pro an, quem omnes munere id vix. Per in illud petentium iudicabit, integre sententiae pro no.</ProseP>
              <ProseP>Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an. Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Nec labore cetero theophrastus no, ei vero facer veritus nec. Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui.</ProseP>
              <ProseP>Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Ius dicat feugiat no, vix cu modo dicat principes. Ceteros assentior omittantur cum ad. Magna copiosae apeirian ius at. Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. Nisl omittam complectitur pro an, quem omnes munere id vix.</ProseP>
              <ProseP>Per in illud petentium iudicabit, integre sententiae pro no. Sale liber et vel. . Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. Solum vituperata definitiones te vis, vis alia falli doming ea. Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an.</ProseP>
              <ProseP>Nisl omittam complectitur pro an, quem omnes munere id vix. Odio contentiones sed cu, usu commodo prompta prodesset id. An eos iusto solet, id mel dico habemus. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula.</ProseP>
              <ProseP>Tation delenit percipitur at vix. An nam debet instructior, commodo mediocrem id cum. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Solum vituperata definitiones te vis, vis alia falli doming ea.</ProseP>
              <ProseP>Solum vituperata definitiones te vis, vis alia falli doming ea. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Solum vituperata definitiones te vis, vis alia falli doming ea. Tation delenit percipitur at vix. Sale liber et vel. Ius dicat feugiat no, vix cu modo dicat principes.</ProseP>
              <ProseP>Postulant assueverit ea his. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Per cu iracundia splendide. Magna copiosae apeirian ius at. Mandamus abhorreant deseruisse mea at, mea elit deserunt persequeris at, in putant fuisset honestatis qui. Lorem ipsum dolor sit amet, an eos lorem ancillae expetenda, vim et utamur quaestio.</ProseP>
              <ProseP>Postulant assueverit ea his. Sale liber et vel. Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an. Sale liber et vel. Eu cum iuvaret debitis voluptatibus, esse perfecto reformidans id has.</ProseP>
              <ProseP>Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. An eos iusto solet, id mel dico habemus. Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Per in illud petentium iudicabit, integre sententiae pro no.</ProseP>
              <ProseP>Per cu iracundia splendide. Per in illud petentium iudicabit, integre sententiae pro no. Ceteros assentior omittantur cum ad. Nisl omittam complectitur pro an, quem omnes munere id vix. Per in illud petentium iudicabit, integre sententiae pro no.</ProseP>
              <ProseP>Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an. Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Nec labore cetero theophrastus no, ei vero facer veritus nec. Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui.</ProseP>
              <ProseP>Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Ius dicat feugiat no, vix cu modo dicat principes. Ceteros assentior omittantur cum ad. Magna copiosae apeirian ius at. Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. Nisl omittam complectitur pro an, quem omnes munere id vix.</ProseP>
              <ProseP>Per in illud petentium iudicabit, integre sententiae pro no. Sale liber et vel. . Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. Solum vituperata definitiones te vis, vis alia falli doming ea. Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an.</ProseP>
              <ProseP>Nisl omittam complectitur pro an, quem omnes munere id vix. Odio contentiones sed cu, usu commodo prompta prodesset id. An eos iusto solet, id mel dico habemus. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula.</ProseP>
              <ProseP>Tation delenit percipitur at vix. An nam debet instructior, commodo mediocrem id cum. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Solum vituperata definitiones te vis, vis alia falli doming ea.</ProseP>
              <ProseP>Solum vituperata definitiones te vis, vis alia falli doming ea. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Solum vituperata definitiones te vis, vis alia falli doming ea. Tation delenit percipitur at vix. Sale liber et vel. Ius dicat feugiat no, vix cu modo dicat principes.</ProseP>
              <ProseP>Postulant assueverit ea his. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Per cu iracundia splendide. Magna copiosae apeirian ius at. Mandamus abhorreant deseruisse mea at, mea elit deserunt persequeris at, in putant fuisset honestatis qui. Lorem ipsum dolor sit amet, an eos lorem ancillae expetenda, vim et utamur quaestio.</ProseP>
              <ProseP>Postulant assueverit ea his. Sale liber et vel. Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an. Sale liber et vel. Eu cum iuvaret debitis voluptatibus, esse perfecto reformidans id has.</ProseP>
              <ProseP>Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. An eos iusto solet, id mel dico habemus. Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Per in illud petentium iudicabit, integre sententiae pro no.</ProseP>
              <ProseP>Per cu iracundia splendide. Per in illud petentium iudicabit, integre sententiae pro no. Ceteros assentior omittantur cum ad. Nisl omittam complectitur pro an, quem omnes munere id vix. Per in illud petentium iudicabit, integre sententiae pro no.</ProseP>
              <ProseP>Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an. Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Nec labore cetero theophrastus no, ei vero facer veritus nec. Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui.</ProseP>
              <ProseP>Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Ius dicat feugiat no, vix cu modo dicat principes. Ceteros assentior omittantur cum ad. Magna copiosae apeirian ius at. Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. Nisl omittam complectitur pro an, quem omnes munere id vix.</ProseP>
              <ProseP>Per in illud petentium iudicabit, integre sententiae pro no. Sale liber et vel. . Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. Solum vituperata definitiones te vis, vis alia falli doming ea. Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an.</ProseP>
              <ProseP>Nisl omittam complectitur pro an, quem omnes munere id vix. Odio contentiones sed cu, usu commodo prompta prodesset id. An eos iusto solet, id mel dico habemus. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula.</ProseP>
              <ProseP>Tation delenit percipitur at vix. An nam debet instructior, commodo mediocrem id cum. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Solum vituperata definitiones te vis, vis alia falli doming ea.</ProseP>
              <ProseP>Solum vituperata definitiones te vis, vis alia falli doming ea. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Solum vituperata definitiones te vis, vis alia falli doming ea. Tation delenit percipitur at vix. Sale liber et vel. Ius dicat feugiat no, vix cu modo dicat principes.</ProseP>
              <ProseP>Postulant assueverit ea his. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Per cu iracundia splendide. Magna copiosae apeirian ius at. Mandamus abhorreant deseruisse mea at, mea elit deserunt persequeris at, in putant fuisset honestatis qui. Lorem ipsum dolor sit amet, an eos lorem ancillae expetenda, vim et utamur quaestio.</ProseP>
              <ProseP>Postulant assueverit ea his. Sale liber et vel. Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an. Sale liber et vel. Eu cum iuvaret debitis voluptatibus, esse perfecto reformidans id has.</ProseP>
              <ProseP>Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. An eos iusto solet, id mel dico habemus. Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Per in illud petentium iudicabit, integre sententiae pro no.</ProseP>
              <ProseP>Per cu iracundia splendide. Per in illud petentium iudicabit, integre sententiae pro no. Ceteros assentior omittantur cum ad. Nisl omittam complectitur pro an, quem omnes munere id vix. Per in illud petentium iudicabit, integre sententiae pro no.</ProseP>
            </B24Container>
          </template>
        </B24Popover>

        <B24Popover
          v-model:open="openVer2"
          arrow
          :b24ui="{ content: 'p-4 max-w-60 max-h-72 overflow-y-auto' }"
        >
          <B24Button label="Upload file" color="link" depth="dark" />

          <template #content>
            <div class="mb-2.5 flex flex-col gap-2.5">
              <div class="w-full flex flex-row flex-nowrap items-center justify-start gap-3">
                <div class="size-8xl rounded-xs border border-base-100 dark:border-white/20 flex flex-col items-center justify-center">
                  <FileUploadIcon class="size-10 text-base-600" />
                </div>
                <div class="flex flex-col flex-nowrap gap-1">
                  <div class="font-bold text-h5">
                    start-ui.md
                  </div>
                  <div class="text-sm text-base-500 dark:text-base-600">
                    650 bytes
                  </div>
                </div>
              </div>
              <B24Separator />
              <div class="w-full">
                <B24Input autofocus placeholder="Add a comment" :rows="4" />
              </div>
            </div>

            <B24Separator />

            <div class="mt-2.5 flex flex-row gap-4">
              <B24Button
                rounded
                label="Send"
                color="primary"
                size="sm"
                @click="openVer2 = false"
              />
              <B24Button
                rounded
                label="Cancel"
                color="link"
                depth="dark"
                size="sm"
                @click="openVer2 = false"
              />
            </div>
          </template>
        </B24Popover>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
