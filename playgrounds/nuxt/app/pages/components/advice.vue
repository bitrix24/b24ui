<script setup lang="ts">
import { ref } from 'vue'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'

const description = ref('Let\'s signal the manager that the deal is not moving, the manager does not call the client back and does not respond to his messages. Let\'s assign a task to the manager on behalf of the manager')
</script>

<template>
  <ExampleGrid v-once custom-grid-cols class="mt-xs grid-cols-1">
    <ExampleCard title="base">
      <ExampleCardSubTitle title="simple" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Advice :description="description" />
        <B24Advice angle="top" :description="description" />
      </div>

      <ExampleCardSubTitle title="icon" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Advice :description="description" :icon="InfoIcon" />
        <B24Advice angle="top" :description="description" :icon="InfoIcon" />
      </div>

      <ExampleCardSubTitle title="avatar" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Advice :description="description" :avatar="{ src: '/avatar/assistant.png' }" />
        <B24Advice angle="top" :description="description" :avatar="{ src: '/avatar/employee.png' }" />
      </div>
    </ExampleCard>

    <ExampleCard title="html">
      <ExampleCardSubTitle title="avatar" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Advice :avatar="{ src: '/avatar/assistant.png' }">
          <span>Typically, instructions on how to add a SAML application and add the ACS URL and SP Entity ID can be found in the Microsoft Azure technical documentation. </span>
          <B24Link to="/components/advice">
            Read more
          </B24Link>
        </B24Advice>
        <B24Advice angle="top" :avatar="{ src: '/avatar/employee.png' }">
          <div class="flex flex-col items-start justify-between gap-1.5">
            <div class="font-(--ui-font-weight-bold)">
              Reference information
            </div>
            <div>Typically, instructions on how to add a SAML application and add the ACS URL and SP Entity ID can be found in the Microsoft Azure technical documentation.</div>
            <div class="mt-2 flex flex-row flex-wrap items-start justify-between gap-2">
              <B24Button size="sm" color="primary" label="some action 1" />
              <B24Button size="sm" color="link" depth="dark" label="some action 2" />
              <B24Button size="sm" color="link" depth="light" :icon="MoreMIcon" />
            </div>
          </div>
        </B24Advice>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
