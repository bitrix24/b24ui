<script setup lang="ts">
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'

const testimonials = ref([
  {
    user: {
      name: 'Employee Name',
      description: 'Clients Relations Manager',
      avatar: {
        src: '/b24ui/avatar/employee.png',
        alt: 'employee'
      }
    },
    quote: 'Bitrix24 has given us a crystal-clear overview of all our ongoing projects. The combination of task deadlines, time tracking, and visual workflow management in Kanban boards ensures that nothing falls through the cracks, significantly improving our on-time delivery and team accountability.'
  },
  {
    user: {
      name: 'Assistant Name',
      description: 'CEO',
      avatar: {
        src: '/b24ui/avatar/assistant.png',
        alt: 'Assistant Name'
      }
    },
    quote: 'The CRM and marketing automation tools in Bitrix24 have revolutionized our sales process. We can now track every customer interaction, automate follow-up emails, and segment our leads effectively, which has directly led to a higher conversion rate and more closed deals.'
  },
  {
    user: {
      name: '员工姓名',
      description: '客户关系经理',
      avatar: {
        src: '/b24ui/avatar/employee.png',
        alt: '员工姓名'
      }
    },
    quote: 'Bitrix24 帮助我们整个团队在一个功能丰富的统一平台上进行协作，彻底结束了之前需要在多个独立软件之间频繁切换的麻烦。这大大节省了我们的时间，并简化了工作流程。'
  },
  {
    user: {
      name: '助理姓名',
      description: '首席执行官',
      avatar: {
        src: '/b24ui/avatar/assistant.png',
        alt: '助理姓名'
      }
    },
    quote: '借助Bitrix24强大的任务管理、分析和信息共享工具，我们为内部流程的沟通和审批创建了自动化工作流。这极大地减少了手动操作和等待时间，从而显著提升了整体工作效率。'
  }
])
</script>

<template>
  <B24PageColumns>
    <B24PageCard
      variant="filled"
      to="https://www.bitrix24.com/tools/"
      :icon="Bitrix24Icon"
      title="Bitrix24 - Free online workspace for your business: CRM, tasks, online meetings, and more."
      description="An all-in-one free platform to manage your team and run your sales, Bitrix24 is designed to be seamlessly integrated into all your business processes and help you manage them with the highest precision and efficiency."
      :b24ui="{ leadingIcon: 'size-10' }"
    />

    <B24PageCard
      v-for="(testimonial, index) in testimonials"
      :key="index"
      variant="outline-no-accent"
      :description="testimonial.quote"
      :b24ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }"
    >
      <template #footer>
        <B24User v-bind="testimonial.user" size="xl" />
      </template>
    </B24PageCard>
  </B24PageColumns>
</template>
