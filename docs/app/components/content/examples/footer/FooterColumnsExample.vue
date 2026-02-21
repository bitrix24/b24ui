<script setup lang="ts">
import type { FooterColumn } from '@bitrix24/b24ui-nuxt'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

const columns: FooterColumn[] = [
  {
    label: 'Community',
    children: [
      {
        label: 'Bitrix24 on GitHub',
        to: 'https://github.com/bitrix24',
        icon: GitHubIcon,
        target: '_blank'
      }
    ]
  },
  {
    label: 'Solutions',
    children: [
      {
        label: 'Bitrix24 JsSdk',
        to: 'https://bitrix24.github.io/b24jssdk/',
        target: '_blank'
      },
      {
        label: 'Bitrix24 Icons',
        to: 'https://bitrix24.github.io/b24icons/',
        target: '_blank'
      },
      {
        label: 'Bitrix24 UI',
        to: 'https://bitrix24.github.io/b24ui/',
        target: '_blank'
      }
    ]
  }
]
</script>

<template>
  <B24FooterColumns :columns="columns">
    <template #right>
      <B24FormField name="email" label="Subscribe to our newsletter" size="lg">
        <B24Input type="email" class="w-full">
          <template #trailing>
            <B24Button type="submit" size="xs" label="Subscribe" />
          </template>
        </B24Input>
      </B24FormField>
    </template>
  </B24FooterColumns>
</template>
