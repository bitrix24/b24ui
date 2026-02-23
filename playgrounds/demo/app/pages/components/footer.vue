<script setup lang="ts">
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'

const items = [
  {
    label: 'REST API',
    to: 'https://apidocs.bitrix24.com',
    target: '_blank'
  },
  {
    label: 'Releases',
    to: 'https://github.com/bitrix24/b24ui/releases',
    target: '_blank'
  }
]

const columns = [
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
  <PlaygroundPage>
    <B24Footer class="w-full border-t border-(--ui-color-divider-default) divide-y divide-(--ui-color-divider-default) min-h-0">
      <template #top>
        <B24Container>
          <B24FooterColumns :columns="columns">
            <template #right>
              <B24FormField name="email" label="Subscribe to our newsletter" size="lg">
                <B24Input type="email" class="w-full">
                  <template #trailing>
                    <B24Button type="submit" color="air-primary" size="xs" label="Subscribe" />
                  </template>
                </B24Input>
              </B24FormField>
            </template>
          </B24FooterColumns>
        </B24Container>
      </template>

      <template #left>
        <ProseP small accent="less">
          Copyright © {{ new Date().getFullYear() }}
        </ProseP>
      </template>

      <B24NavigationMenu :items="items" variant="link" />

      <template #right>
        <B24Button
          color="air-selection"
          :icon="Bitrix24Icon"
          to="https://apidocs.bitrix24.com"
          target="_blank"
          aria-label="Bitrix24 REST API"
        />
        <B24Button
          :icon="GitHubIcon"
          to="https://github.com/bitrix24/b24ui"
          target="_blank"
          aria-label="GitHub"
        />
      </template>
    </B24Footer>
  </PlaygroundPage>
</template>
