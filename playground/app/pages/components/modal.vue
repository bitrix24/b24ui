<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'

usePageMeta.setPageTitle('Modal')

const LazyModalExample = defineAsyncComponent(() => import('../../components/ModalExample.vue'))

const open = ref(false)
const count = ref(0)

const modal = useModal()

function openModal() {
  count.value++

  modal.open(LazyModalExample, {
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
        <B24Modal>
          <B24Button label="Custom" color="link" depth="dark" />

          <template #content>
            <Placeholder class="h-40 -m-4" />
          </template>
        </B24Modal>

        <B24Modal title="First modal">
          <B24Button color="default" depth="light" label="Open with nested" />

          <template #footer>
            <B24Modal title="Second modal">
              <B24Button label="Open second" color="primary" />
            </B24Modal>
            <B24ModalDialogClose>
              <B24Button label="Cancel" color="link" />
            </B24ModalDialogClose>
          </template>
        </B24Modal>

        <B24Modal
          v-model:open="open"
          title="Modal with v-model"
          description="This can be useful to control the state of the modal yourself."
        />

        <B24Button label="Open with v-model" color="link" depth="dark" @click="open = true" />

        <B24Button label="Open programmatically" color="default" depth="light" @click="openModal" />
      </div>
      <ExampleCardSubTitle title="overlay" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Modal
          title="Modal without overlay"
          description="This modal has `overlay: false` prop."
          :overlay="false"
        >
          <B24Button label="Open without overlay" color="link" depth="dark" />
        </B24Modal>

        <B24Modal
          title="Modal without modal & overlay"
          description="This modal has `modal: false` and `overlay: false` to interact with outside content."
          :overlay="false"
          :modal="false"
        >
          <B24Button label="Open without modal" color="default" depth="light" />
        </B24Modal>
      </div>

      <ExampleCardSubTitle title="transition & portal & size" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Modal
          title="Modal without transition"
          description="This modal has `transition: false` prop."
          :transition="false"
        >
          <B24Button label="Open without transition" color="link" depth="dark" />
        </B24Modal>

        <B24Modal
          title="Modal without portal"
          description="This modal has `portal: false` prop."
          :portal="false"
        >
          <B24Button label="Open without portal" color="default" depth="light" />
        </B24Modal>

        <B24Modal
          title="Modal fullscreen"
          description="This modal has `fullscreen: true` prop."
          fullscreen
        >
          <B24Button label="Open fullscreen" color="link" depth="dark" />
        </B24Modal>
      </div>

      <ExampleCardSubTitle title="closing options" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Modal
          title="Modal prevent close"
          description="This modal has `dismissible: false` prop so it won't close when clicking outside."
          :dismissible="false"
        >
          <B24Button label="Open unclosable" color="link" depth="dark" />
        </B24Modal>

        <B24Modal
          title="Modal without close button"
          description="This modal has `close: false` prop."
          :close="false"
        >
          <B24Button label="Open without close button" color="default" depth="light" />
        </B24Modal>

        <B24Modal
          title="Modal with custom close button"
          description="The `close` prop inherits from the Button props."
          :close="{ color: 'danger', depth: 'dark', size: 'xs', rounded: true }"
          :b24ui="{ close: '-top-3 -end-3' }"
        >
          <B24Button label="Open with custom close button" color="link" depth="dark" />
        </B24Modal>
      </div>
    </ExampleCard>

    <ExampleCard title="full" class="md:col-span-2">
      <ExampleCardSubTitle title="different content" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Modal
          title="Vivendum dignissim conceptam."
          description="Magna copiosae apeirian ius at."
        >
          <B24Button label="Simple" color="link" depth="dark" />

          <template #body>
            Dividend dignissim conceptam pri ut, ei vel partem audiam sapientem. Solum vituperata definitiones te vis, vis alia falli doming ea. Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Lorem ipsum dolor sit amet, an eos lorem ancillae expetenda, vim et utamur quaestio.
          </template>
          <template #footer>
            <B24ModalDialogClose>
              <B24Button rounded label="Send" color="primary" size="sm" />
            </B24ModalDialogClose>
            <B24ModalDialogClose>
              <B24Button rounded label="Cancel" color="link" depth="dark" size="sm" />
            </B24ModalDialogClose>
          </template>
        </B24Modal>

        <B24Modal
          title="Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Magna copiosae apeirian ius at."
          description="Ius dicat feugiat no, vix cu modo dicat principes. Eu cum iuvaret debitis voluptatibus, esse perfecto reformidans id has."
          :b24ui="{ content: 'sm:max-w-[calc(100vw-4rem)]' }"
        >
          <B24Button label="Long text" color="default" depth="light" />

          <template #body>
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
          </template>
          <template #footer>
            <B24ModalDialogClose>
              <B24Button rounded label="Send" color="primary" size="sm" />
            </B24ModalDialogClose>
            <B24ModalDialogClose>
              <B24Button rounded label="Cancel" color="link" depth="dark" size="sm" />
            </B24ModalDialogClose>
          </template>
        </B24Modal>

        <B24Modal
          title="File upload"
          :b24ui="{
            footer: 'border-t-0 mt-2.5 pt-0'
          }"
        >
          <B24Button label="Upload file" color="link" depth="dark" />

          <template #body>
            <div class="flex flex-col gap-4">
              <B24Separator />
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
        </B24Modal>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
