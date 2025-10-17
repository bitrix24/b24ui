<script setup lang="ts">
import CopilotIcon from '@bitrix24/b24icons-vue/outline/CopilotIcon'
import CrmLettersIcon from '@bitrix24/b24icons-vue/outline/CrmLettersIcon'
import TaskIcon from '@bitrix24/b24icons-vue/outline/TaskIcon'
import HrAutomationIcon from '@bitrix24/b24icons-vue/main/HrAutomationIcon'

const cards = ref([
  {
    title: 'Online workspace for the whole team',
    description: 'Through its wide variety of communication and collaboration tools, Bitrix24 enables teams to work efficiently and smoothly wherever they are – at home, in the office, or on the go.',
    icon: CopilotIcon,
    to: 'https://www.bitrix24.com/tools/communications/',
    class: 'lg:col-span-2',
    image: {
      path: '/assets/demo/communications-main.png.webp',
      width: 363,
      height: 152
    },
    orientation: 'horizontal' as const,
    variant: 'filled' as const
  },
  {
    title: 'Free CRM software for your business',
    description: 'Sell more. Sell better. Sell faster with Bitrix24 a single platform to cover all your needs.',
    icon: CrmLettersIcon,
    to: 'https://www.bitrix24.com/tools/crm/',
    variant: 'tinted-no-accent' as const
  },
  {
    title: 'Free task management software for your business',
    description: 'Set tasks, manage deadlines, collect reports, track KPIs, and run projects from wherever you are.',
    icon: TaskIcon,
    to: 'https://www.bitrix24.com/tools/tasks_and_projects/',
    variant: 'tinted-no-accent' as const
  },
  {
    title: 'HR management & workflow automation',
    description: 'Streamline workflows, automate your business processes, and manage employee data like a boss.',
    icon: HrAutomationIcon,
    to: 'https://www.bitrix24.com/tools/hr_automation/',
    image: {
      path: '/assets/demo/hr_automation-main.png.webp',
      width: 362,
      height: 184
    },
    class: 'lg:col-span-2',
    orientation: 'horizontal' as const,
    variant: 'tinted' as const,
    reverse: true
  }
])
</script>

<template>
  <B24PageGrid>
    <B24PageCard
      v-for="(card, index) in cards"
      :key="index"
      v-bind="card"
    >
      <img
        v-if="card.image"
        :src="card.image.path"
        :width="card.image.width"
        :height="card.image.height"
        :alt="card.title"
        class="w-full"
      />
    </B24PageCard>
  </B24PageGrid>
</template>
