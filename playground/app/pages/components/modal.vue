<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import Placeholder from '../../components/Placeholder.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'

usePageMeta.setPageTitle('Modal')

const LazyModalExample = defineAsyncComponent(() => import('../../components/ModalExample.vue'))

const open = ref(false)
const count = ref(0)
const overlay = useOverlay()

const modal = overlay.create(LazyModalExample, {
  props: {
    count: count.value
  }
})

function openModal() {
  count.value++

  modal.open({
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
          <B24Button label="Custom" />

          <template #content>
            <Placeholder class="h-40 -m-[24px]" />
          </template>
        </B24Modal>

        <B24Modal title="First modal">
          <B24Button label="Open with nested" />

          <template #footer>
            <div class="flex flex-row gap-[10px]">
              <B24Modal title="Second modal">
                <B24Button label="Open second" color="air-primary" />
              </B24Modal>
              <B24ModalDialogClose>
                <B24Button label="Cancel" color="air-tertiary" />
              </B24ModalDialogClose>
            </div>
          </template>
        </B24Modal>

        <B24Modal
          v-model:open="open"
          title="Modal with v-model"
          description="This can be useful to control the state of the modal yourself."
        />

        <B24Button label="Open with v-model" @click="open=true" />

        <B24Button label="Open programmatically" color="air-secondary-accent-1" @click="openModal" />
      </div>

      <ExampleCardSubTitle title="overlay" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Modal
          title="Modal with overlay blur"
          description="This modal has `overlay-blur: auto` prop."
          overlay-blur="auto"
        >
          <B24Button label="Open with overlay blur" />
        </B24Modal>

        <B24Modal
          title="Modal without overlay"
          description="This modal has `overlay: false` prop."
          :overlay="false"
        >
          <B24Button label="Open without overlay" />
        </B24Modal>

        <B24Modal
          title="Modal without modal & overlay"
          description="This modal has `modal: false` and `overlay: false` to interact with outside content."
          :overlay="false"
          :modal="false"
        >
          <B24Button label="Open without modal" />
        </B24Modal>
      </div>

      <ExampleCardSubTitle title="transition & portal & size" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Modal
          title="Modal without transition"
          description="This modal has `transition: false` prop."
          :transition="false"
        >
          <B24Button label="Open without transition" />
        </B24Modal>

        <B24Modal
          title="Modal without portal"
          description="This modal has `portal: false` prop."
          :portal="false"
        >
          <B24Button label="Open without portal" />
        </B24Modal>

        <B24Modal
          title="Modal fullscreen"
          description="This modal has `fullscreen: true` prop."
          fullscreen
        >
          <B24Button label="Open fullscreen" />
        </B24Modal>
      </div>

      <ExampleCardSubTitle title="closing options" />
      <div class="mb-4 flex flex-row flex-wrap gap-2">
        <B24Modal
          title="Modal prevent close"
          description="This modal has `dismissible: false` prop so it won't close when clicking outside."
          :dismissible="false"
        >
          <B24Button label="Open unclosable" />
        </B24Modal>

        <B24Modal
          title="Modal without close button"
          description="This modal has `close: false` prop."
          :close="false"
        >
          <B24Button label="Open without close button" />
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
          <B24Button label="Simple" />

          <template #body>
            Dividend dignissim conceptam pri ut, ei vel partem audiam sapientem. Solum vituperata definitiones te vis, vis alia falli doming ea. Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Lorem ipsum dolor sit amet, an eos lorem ancillae expetenda, vim et utamur quaestio.
          </template>
          <template #footer>
            <B24ModalDialogClose>
              <B24Button label="Send" color="air-primary" />
            </B24ModalDialogClose>
            <B24ModalDialogClose>
              <B24Button label="Cancel" color="air-tertiary" />
            </B24ModalDialogClose>
          </template>
        </B24Modal>

        <B24Modal
          title="Vivendum dignissim conceptam pri ut, ei vel partem audiam sapientem. Magna copiosae apeirian ius at."
          description="Ius dicat feugiat no, vix cu modo dicat principes. Eu cum iuvaret debitis voluptatibus, esse perfecto reformidans id has."
          :b24ui="{ content: 'sm:max-w-[calc(100vw-4rem)]' }"
        >
          <B24Button label="Long text" />

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
              <B24Button label="Send" color="air-primary" />
            </B24ModalDialogClose>
            <B24ModalDialogClose>
              <B24Button label="Cancel" color="air-tertiary" />
            </B24ModalDialogClose>
          </template>
        </B24Modal>

        <B24Modal
          title="File upload"
          :b24ui="{ footer: 'border-t-0 pt-0' }"
        >
          <B24Button label="Upload file" />

          <template #body>
            <div class="flex flex-col gap-[14px]">
              <B24Separator />
              <div class="w-full flex flex-row flex-nowrap items-center justify-start gap-3">
                <div class="size-8xl rounded-xs border border-(--ui-color-divider-default) flex flex-col items-center justify-center">
                  <FileUploadIcon class="size-10 text-(--ui-color-design-plain-na-content)" />
                </div>
                <div class="flex flex-col flex-nowrap gap-1">
                  <ProseH5 class="mb-0">
                    start-ui.md
                  </ProseH5>
                  <ProseP small accent="less-more">
                    650 bytes
                  </ProseP>
                </div>
              </div>
              <B24Separator />
              <div class="w-full mt-[6px]">
                <B24Textarea autofocus placeholder="Add a comment" autoresize :rows="1" :maxrows="4" />
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex flex-row gap-[10px]">
              <B24ModalDialogClose>
                <B24Button label="Send" color="air-primary" />
              </B24ModalDialogClose>
              <B24ModalDialogClose>
                <B24Button label="Cancel" color="air-tertiary" />
              </B24ModalDialogClose>
            </div>
            <div>
              <B24Button label="Full version" size="sm" color="air-tertiary-no-accent" />
            </div>
          </template>
        </B24Modal>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
