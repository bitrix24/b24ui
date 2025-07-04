<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'

usePageMeta.setPageTitle('Slideover')

const SlideoverExample = defineAsyncComponent(() => import('../../components/SlideoverExample.vue'))

const open = ref(false)
const count = ref(0)
const overlay = useOverlay()

const slideover = overlay.create(SlideoverExample, {
  props: {
    count: count.value
  }
})

function openSlideover() {
  count.value++

  slideover.open({
    description: 'And you can even provide a description!',
    count: count.value
  })
}
</script>

<template>
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="base" class="md:col-span-2">
      <ExampleCardSubTitle title="opening options" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Slideover
          title="First slideover"
          :b24ui="{ content: 'sm:max-w-1/2' }"
        >
          <B24Button color="link" depth="dark" label="Open with nested" />

          <template #body>
            <B24Container class="h-full w-full pb-4">
              <Placeholder class="h-full w-full" />
            </B24Container>
          </template>

          <template #footer>
            <B24Slideover title="Second slideover">
              <B24Button label="Open second" color="primary" />

              <template #body>
                <B24Container class="h-full w-full pb-4">
                  <Placeholder class="h-full w-full" />
                </B24Container>
              </template>
              <template #footer>
                <B24ModalDialogClose>
                  <B24Button label="Cancel" color="link" depth="dark" />
                </B24ModalDialogClose>
              </template>
            </B24Slideover>
          </template>
        </B24Slideover>

        <B24Slideover
          title="Slideover on left side"
          description="This slideover has `side: 'left'` prop."
          side="left"
        >
          <B24Button label="Open on left" color="default" depth="light" />

          <template #body>
            <Placeholder class="h-full w-full" />
          </template>
        </B24Slideover>

        <B24Slideover
          title="Slideover on top side"
          description="This slideover has `side: 'top'` prop."
          side="top"
        >
          <B24Button label="Open on top" color="link" depth="dark" />

          <template #body>
            <Placeholder class="h-48 w-full" />
          </template>
        </B24Slideover>

        <B24Slideover
          title="Slideover on bottom side"
          description="This slideover has `side: 'bottom'` prop."
          side="bottom"
        >
          <B24Button label="Open on bottom" color="default" depth="light" />

          <template #body>
            <Placeholder class="h-48 w-full" />
          </template>
        </B24Slideover>

        <B24Slideover
          v-model:open="open"
          title="Slideover with v-model"
          description="This is useful to control the state yourself."
        >
          <template #body>
            <Placeholder class="h-full w-full" />
          </template>
        </B24Slideover>

        <B24Button label="Open with v-model" color="link" depth="dark" @click="open = true" />

        <B24Button label="Open programmatically" color="default" depth="light" @click="openSlideover" />
      </div>

      <ExampleCardSubTitle title="overlay" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Slideover
          title="Slideover without overlay blur"
          description="This slideover has `overlay-blur: off` prop."
          overlay-blur="off"
        >
          <B24Button label="Open without overlay blur" color="link" depth="dark" />

          <template #body>
            <Placeholder class="h-full w-full" />
          </template>
        </B24Slideover>

        <B24Slideover
          title="Slideover without overlay"
          description="This slideover has `overlay: false` prop."
          :overlay="false"
        >
          <B24Button label="Open without overlay" color="default" depth="light" />

          <template #body>
            <Placeholder class="h-full w-full" />
          </template>
        </B24Slideover>

        <B24Slideover
          title="Slideover without modal & overlay"
          description="This slideover has `modal: false` and `overlay: false` to interact with outside content."
          :overlay="false"
          :modal="false"
        >
          <B24Button label="Open without modal" color="link" depth="dark" />

          <template #body>
            <Placeholder class="h-full w-full" />
          </template>
        </B24Slideover>
      </div>

      <ExampleCardSubTitle title="transition & portal & size" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Slideover
          title="Slideover without transition"
          description="This slideover has `transition: false` prop."
          :transition="false"
        >
          <B24Button label="Open without transition" color="link" depth="dark" />

          <template #body>
            <Placeholder class="h-full w-full" />
          </template>
        </B24Slideover>

        <B24Slideover
          title="Slideover without portal"
          description="This slideover has `portal: false` prop."
          :portal="false"
        >
          <B24Button label="Open without portal" color="default" depth="light" />

          <template #body>
            <Placeholder class="h-full w-full" />
          </template>
        </B24Slideover>
      </div>

      <ExampleCardSubTitle title="closing options" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Slideover
          title="Slideover prevent close"
          description="This slideover has `dismissible: false` prop so it won't close when clicking outside."
          :dismissible="false"
        >
          <B24Button label="Open unclosable" color="link" depth="dark" />

          <template #body>
            <Placeholder class="h-full w-full" />
          </template>
        </B24Slideover>

        <B24Slideover
          title="Slideover without close button"
          description="This slideover has `close: false` prop."
          :close="false"
        >
          <B24Button label="Open without close button" color="default" depth="light" />

          <template #body>
            <Placeholder class="h-full w-full" />
          </template>
        </B24Slideover>

        <B24Slideover
          title="Slideover with custom close button"
          description="The `close` prop inherits from the Button props."
          :close="{ color: 'danger', depth: 'dark', size: 'xs', rounded: true }"
          :b24ui="{ close: 'rounded-full py-4 px-2 -left-2' }"
        >
          <B24Button label="Open with custom close button" color="link" depth="dark" />

          <template #body>
            <Placeholder class="h-full w-full" />
          </template>
        </B24Slideover>

        <B24Slideover
          title="Slideover with scoped slot close"
          description="This slideover has a scoped slot close that can be used to close the slideover from within the content."
        >
          <B24Button label="Open with scoped slot close" color="default" depth="light" />

          <template #header="{ close }">
            <B24Button label="Close with scoped slot close" @click="close" />
          </template>

          <template #body="{ close }">
            <B24Button label="Close with scoped slot close" @click="close" />
          </template>

          <template #footer="{ close }">
            <B24Button label="Close with scoped slot close" @click="close" />
          </template>
        </B24Slideover>
      </div>
    </ExampleCard>

    <ExampleCard title="full" class="md:col-span-2">
      <ExampleCardSubTitle title="different content" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Slideover
          title="Vivendum dignissim conceptam."
          description="Magna copiosae apeirian ius at."
          :close="{ label: 'Test' }"
        >
          <B24Button label="Simple" color="link" depth="dark" />

          <template #body>
            <B24Container>
              Dividend dignissim conceptam pri ut, ei vel partem audiam sapientem. Solum vituperata definitiones te vis, vis alia falli doming ea. Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Lorem ipsum dolor sit amet, an eos lorem ancillae expetenda, vim et utamur quaestio.
            </B24Container>
          </template>
          <template #footer>
            <B24ModalDialogClose>
              <B24Button rounded label="Send" color="primary" size="sm" />
            </B24ModalDialogClose>
            <B24ModalDialogClose>
              <B24Button rounded label="Cancel" color="link" depth="dark" size="sm" />
            </B24ModalDialogClose>
          </template>
        </B24Slideover>

        <B24Slideover
          title="Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Magna copiosae apeirian ius at."
          description="Ius dicat feugiat no, vix cu modo dicat principes. Eu cum iuvaret debitis voluptatibus, esse perfecto reformidans id has."
          :b24ui="{ content: 'sm:max-w-[calc(100vw-4rem)]' }"
        >
          <B24Button label="Long text" color="default" depth="light" />

          <template #body>
            <B24Container>
              <p>Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an. Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Nec labore cetero theophrastus no, ei vero facer veritus nec. Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui.</p>
              <p>Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Ius dicat feugiat no, vix cu modo dicat principes. Ceteros assentior omittantur cum ad. Magna copiosae apeirian ius at. Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. Nisl omittam complectitur pro an, quem omnes munere id vix.</p>
              <p>Per in illud petentium iudicabit, integre sententiae pro no. Sale liber et vel. . Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. Solum vituperata definitiones te vis, vis alia falli doming ea. Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an.</p>
              <p>Nisl omittam complectitur pro an, quem omnes munere id vix. Odio contentiones sed cu, usu commodo prompta prodesset id. An eos iusto solet, id mel dico habemus. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula.</p>
              <p>Tation delenit percipitur at vix. An nam debet instructior, commodo mediocrem id cum. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Solum vituperata definitiones te vis, vis alia falli doming ea.</p>
              <p>Solum vituperata definitiones te vis, vis alia falli doming ea. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Solum vituperata definitiones te vis, vis alia falli doming ea. Tation delenit percipitur at vix. Sale liber et vel. Ius dicat feugiat no, vix cu modo dicat principes.</p>
              <p>Postulant assueverit ea his. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Per cu iracundia splendide. Magna copiosae apeirian ius at. Mandamus abhorreant deseruisse mea at, mea elit deserunt persequeris at, in putant fuisset honestatis qui. Lorem ipsum dolor sit amet, an eos lorem ancillae expetenda, vim et utamur quaestio.</p>
              <p>Postulant assueverit ea his. Sale liber et vel. Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an. Sale liber et vel. Eu cum iuvaret debitis voluptatibus, esse perfecto reformidans id has.</p>
              <p>Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. An eos iusto solet, id mel dico habemus. Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Per in illud petentium iudicabit, integre sententiae pro no.</p>
              <p>Per cu iracundia splendide. Per in illud petentium iudicabit, integre sententiae pro no. Ceteros assentior omittantur cum ad. Nisl omittam complectitur pro an, quem omnes munere id vix. Per in illud petentium iudicabit, integre sententiae pro no.</p>
              <p>Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an. Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Nec labore cetero theophrastus no, ei vero facer veritus nec. Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui.</p>
              <p>Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Ius dicat feugiat no, vix cu modo dicat principes. Ceteros assentior omittantur cum ad. Magna copiosae apeirian ius at. Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. Nisl omittam complectitur pro an, quem omnes munere id vix.</p>
              <p>Per in illud petentium iudicabit, integre sententiae pro no. Sale liber et vel. . Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. Solum vituperata definitiones te vis, vis alia falli doming ea. Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an.</p>
              <p>Nisl omittam complectitur pro an, quem omnes munere id vix. Odio contentiones sed cu, usu commodo prompta prodesset id. An eos iusto solet, id mel dico habemus. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula.</p>
              <p>Tation delenit percipitur at vix. An nam debet instructior, commodo mediocrem id cum. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Solum vituperata definitiones te vis, vis alia falli doming ea.</p>
              <p>Solum vituperata definitiones te vis, vis alia falli doming ea. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Solum vituperata definitiones te vis, vis alia falli doming ea. Tation delenit percipitur at vix. Sale liber et vel. Ius dicat feugiat no, vix cu modo dicat principes.</p>
              <p>Postulant assueverit ea his. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Per cu iracundia splendide. Magna copiosae apeirian ius at. Mandamus abhorreant deseruisse mea at, mea elit deserunt persequeris at, in putant fuisset honestatis qui. Lorem ipsum dolor sit amet, an eos lorem ancillae expetenda, vim et utamur quaestio.</p>
              <p>Postulant assueverit ea his. Sale liber et vel. Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an. Sale liber et vel. Eu cum iuvaret debitis voluptatibus, esse perfecto reformidans id has.</p>
              <p>Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. An eos iusto solet, id mel dico habemus. Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Per in illud petentium iudicabit, integre sententiae pro no.</p>
              <p>Per cu iracundia splendide. Per in illud petentium iudicabit, integre sententiae pro no. Ceteros assentior omittantur cum ad. Nisl omittam complectitur pro an, quem omnes munere id vix. Per in illud petentium iudicabit, integre sententiae pro no.</p>
              <p>Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an. Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Nec labore cetero theophrastus no, ei vero facer veritus nec. Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui.</p>
              <p>Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Ius dicat feugiat no, vix cu modo dicat principes. Ceteros assentior omittantur cum ad. Magna copiosae apeirian ius at. Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. Nisl omittam complectitur pro an, quem omnes munere id vix.</p>
              <p>Per in illud petentium iudicabit, integre sententiae pro no. Sale liber et vel. . Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. Solum vituperata definitiones te vis, vis alia falli doming ea. Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an.</p>
              <p>Nisl omittam complectitur pro an, quem omnes munere id vix. Odio contentiones sed cu, usu commodo prompta prodesset id. An eos iusto solet, id mel dico habemus. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula.</p>
              <p>Tation delenit percipitur at vix. An nam debet instructior, commodo mediocrem id cum. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Solum vituperata definitiones te vis, vis alia falli doming ea.</p>
              <p>Solum vituperata definitiones te vis, vis alia falli doming ea. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Solum vituperata definitiones te vis, vis alia falli doming ea. Tation delenit percipitur at vix. Sale liber et vel. Ius dicat feugiat no, vix cu modo dicat principes.</p>
              <p>Postulant assueverit ea his. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Per cu iracundia splendide. Magna copiosae apeirian ius at. Mandamus abhorreant deseruisse mea at, mea elit deserunt persequeris at, in putant fuisset honestatis qui. Lorem ipsum dolor sit amet, an eos lorem ancillae expetenda, vim et utamur quaestio.</p>
              <p>Postulant assueverit ea his. Sale liber et vel. Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an. Sale liber et vel. Eu cum iuvaret debitis voluptatibus, esse perfecto reformidans id has.</p>
              <p>Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. An eos iusto solet, id mel dico habemus. Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Per in illud petentium iudicabit, integre sententiae pro no.</p>
              <p>Per cu iracundia splendide. Per in illud petentium iudicabit, integre sententiae pro no. Ceteros assentior omittantur cum ad. Nisl omittam complectitur pro an, quem omnes munere id vix. Per in illud petentium iudicabit, integre sententiae pro no.</p>
              <p>Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an. Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Nec labore cetero theophrastus no, ei vero facer veritus nec. Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui.</p>
              <p>Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Ius dicat feugiat no, vix cu modo dicat principes. Ceteros assentior omittantur cum ad. Magna copiosae apeirian ius at. Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. Nisl omittam complectitur pro an, quem omnes munere id vix.</p>
              <p>Per in illud petentium iudicabit, integre sententiae pro no. Sale liber et vel. . Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. Solum vituperata definitiones te vis, vis alia falli doming ea. Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an.</p>
              <p>Nisl omittam complectitur pro an, quem omnes munere id vix. Odio contentiones sed cu, usu commodo prompta prodesset id. An eos iusto solet, id mel dico habemus. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula.</p>
              <p>Tation delenit percipitur at vix. An nam debet instructior, commodo mediocrem id cum. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Solum vituperata definitiones te vis, vis alia falli doming ea.</p>
              <p>Solum vituperata definitiones te vis, vis alia falli doming ea. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Solum vituperata definitiones te vis, vis alia falli doming ea. Tation delenit percipitur at vix. Sale liber et vel. Ius dicat feugiat no, vix cu modo dicat principes.</p>
              <p>Postulant assueverit ea his. Vel in dicant cetero phaedrum, usu populo interesset cu, eum ea facer nostrum pericula. Per cu iracundia splendide. Magna copiosae apeirian ius at. Mandamus abhorreant deseruisse mea at, mea elit deserunt persequeris at, in putant fuisset honestatis qui. Lorem ipsum dolor sit amet, an eos lorem ancillae expetenda, vim et utamur quaestio.</p>
              <p>Postulant assueverit ea his. Sale liber et vel. Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an. Sale liber et vel. Eu cum iuvaret debitis voluptatibus, esse perfecto reformidans id has.</p>
              <p>Vix paulo sanctus scripserit ex, te iriure insolens voluptatum qui. An eos iusto solet, id mel dico habemus. Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Per in illud petentium iudicabit, integre sententiae pro no.</p>
              <p>Per cu iracundia splendide. Per in illud petentium iudicabit, integre sententiae pro no. Ceteros assentior omittantur cum ad. Nisl omittam complectitur pro an, quem omnes munere id vix. Per in illud petentium iudicabit, integre sententiae pro no.</p>
            </B24Container>
          </template>

          <template #footer>
            <B24ModalDialogClose>
              <B24Button rounded label="Send" color="primary" size="sm" />
            </B24ModalDialogClose>
            <B24ModalDialogClose>
              <B24Button rounded label="Cancel" color="link" depth="dark" size="sm" />
            </B24ModalDialogClose>
          </template>
        </B24Slideover>

        <B24Slideover
          title="File upload"
          :b24ui="{
            body: 'm-5 p-5 bg-white dark:bg-white/10 rounded'
          }"
        >
          <B24Button label="Upload file" color="link" depth="dark" />

          <template #body>
            <div class="flex flex-col gap-4">
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
                <B24Textarea autofocus placeholder="Add a comment" autoresize :rows="1" :maxrows="4" />
              </div>
            </div>
          </template>

          <template #footer>
            <B24ModalDialogClose>
              <B24Button rounded label="Send" color="primary" size="sm" />
            </B24ModalDialogClose>
            <B24ModalDialogClose>
              <B24Button rounded label="Cancel" color="link" depth="dark" size="sm" />
            </B24ModalDialogClose>
          </template>
        </B24Slideover>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
