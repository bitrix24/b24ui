<script setup lang="ts">
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import CopilotIcon from '@bitrix24/b24icons-vue/outline/CopilotIcon'
import CrmLettersIcon from '@bitrix24/b24icons-vue/outline/CrmLettersIcon'
import TaskIcon from '@bitrix24/b24icons-vue/outline/TaskIcon'

const features = ref([
  {
    title: 'Online workspace for the whole team',
    description: 'Through its wide variety of communication and collaboration tools, Bitrix24 enables teams to work efficiently and smoothly wherever they are – at home, in the office, or on the go.',
    icon: CopilotIcon,
    to: 'https://www.bitrix24.com/tools/communications/'
  },
  {
    title: 'Free CRM software for your business',
    description: 'Sell more. Sell better. Sell faster with Bitrix24 a single platform to cover all your needs.',
    icon: CrmLettersIcon,
    to: 'https://www.bitrix24.com/tools/crm/'
  },
  {
    title: 'Free task management software for your business',
    description: 'Set tasks, manage deadlines, collect reports, track KPIs, and run projects from wherever you are.',
    icon: TaskIcon,
    to: 'https://www.bitrix24.com/tools/tasks_and_projects/'
  }
])
</script>

<template>
  <B24PageSection
    title="Bitrix24. Your ultimate workspace."
    description="An all-in-one free platform to manage your team and run your sales, Bitrix24 is designed to be seamlessly integrated into all your business processes and help you manage them with the highest precision and efficiency."
    headline="Features"
    :icon="RocketIcon"
    :features="features"
  />
</template>
