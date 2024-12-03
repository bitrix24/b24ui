import { ref, type Ref } from 'vue'
import type { IMenuItem, IPageGroup, IPageItem } from '~/types'
import ItemIcon from '@bitrix24/b24icons-vue/crm/ItemIcon'
import { splitByCase, upperFirst } from 'scule'

const title = ref('PlayGround')

function setPageTitle(value: string): void {
  title.value = value
}

function getPageTitle(): Ref<string> {
  return title
}

const menuList: IMenuItem[] = [
  {
    title: 'API Docs',
    href: 'https://apidocs.bitrix24.com'
  },
  {
    title: '@bitrix24/b24jssdk',
    href: 'https://bitrix24.github.io/b24jssdk/'
  },
  {
    title: '@bitrix24/b24style',
    href: 'https://bitrix24.github.io/b24style/'
  },
  {
    title: '@bitrix24/b24icons',
    href: 'https://bitrix24.github.io/b24icons/'
  }
]

const components = [
  { id: 'button', descr: 'A button element that can act as a link or trigger an action.' },
  { id: 'button-group', descr: 'Group multiple button-like elements together.' },
  { id: 'input', descr: 'An input element to enter text.' },
  { id: 'link', descr: 'A wrapper around NuxtLink with extra props.' },
  { id: 'skeleton', descr: 'A placeholder to show while content is loading.' }
]

const groups: IPageGroup[] = [
  {
    id: `components`,
    label: 'Components',
    items: components.map(component => ({
      id: component.id,
      icon: ItemIcon,
      label: `<B24${upperName(component.id)}>`,
      description: component.descr,
      isActive: false
    } as IPageItem))
  } as IPageGroup
]

function upperName(name: string) {
  return splitByCase(name).map(p => upperFirst(p)).join('')
}

export default {
  setPageTitle,
  getPageTitle,
  menuList,
  components,
  groups
}
