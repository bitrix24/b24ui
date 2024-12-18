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
    title: 'b24style',
    href: 'https://bitrix24.github.io/b24style/'
  },
  {
    title: 'b24icons',
    href: 'https://bitrix24.github.io/b24icons/'
  },
  {
    title: 'b24jssdk',
    href: 'https://bitrix24.github.io/b24jssdk/'
  }
]

const components = [
  { id: 'avatar', descr: 'An img element with fallback and Nuxt Image support.' },
  { id: 'button', descr: 'A button element that can act as a link or trigger an action.' },
  { id: 'button-group', descr: 'Group multiple button-like elements together.' },
  { id: 'checkbox', descr: 'An input element to toggle between checked and unchecked states.' },
  { id: 'chip', descr: 'An indicator of a numeric value or a state.' },
  { id: 'input', descr: 'An input element to enter text.' },
  { id: 'link', descr: 'A wrapper around NuxtLink with extra props.' },
  { id: 'radio-group', descr: 'A set of radio buttons to select a single option from a list.' },
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
