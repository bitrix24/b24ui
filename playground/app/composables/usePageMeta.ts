import { ref, type Ref } from 'vue'
import type { IMenuItem, IPageGroup, IPageItem, IComponentInfo } from '~/types'
import { splitByCase, upperFirst } from 'scule'
import ItemIcon from '@bitrix24/b24icons-vue/crm/ItemIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import FormIcon from '@bitrix24/b24icons-vue/crm/FormIcon'
import GroupIcon from '@bitrix24/b24icons-vue/main/GroupIcon'

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

const components: IComponentInfo[] = [
  { id: 'avatar', description: 'An img element with fallback and Nuxt Image support.', icon: PersonIcon },
  { id: 'button', description: 'A button element that can act as a link or trigger an action.', icon: GroupIcon },
  { id: 'button-group', description: 'Group multiple button-like elements together.', icon: GroupIcon },
  { id: 'checkbox', description: 'An input element to toggle between checked and unchecked states.', icon: FormIcon },
  { id: 'chip', description: 'An indicator of a numeric value or a state.', icon: ItemIcon, iconUi: 'pr-px' },
  { id: 'container', description: 'A container lets you center and constrain the width of your content.', icon: GroupIcon },
  { id: 'form-field', description: 'A wrapper for form elements that provides validation and error handling.', icon: FormIcon },
  { id: 'input', description: 'An input element to enter text.', icon: FormIcon },
  { id: 'kbd', description: 'A kbd element to display a keyboard key.', icon: ItemIcon, iconUi: 'pr-px' },
  { id: 'link', description: 'A wrapper around NuxtLink with extra props.', icon: GroupIcon },
  { id: 'progress', description: 'An indicator showing the progress of a task.', icon: GroupIcon },
  { id: 'radio-group', description: 'A set of radio buttons to select a single option from a list.', icon: FormIcon },
  { id: 'range', description: 'An input to select a numeric value within a range.', icon: FormIcon },
  { id: 'separator', description: 'Separates content horizontally or vertically.', icon: GroupIcon },
  { id: 'shortcuts', description: 'A composable to define keyboard shortcuts in your app.', icon: ItemIcon, iconUi: 'pr-px' },
  { id: 'skeleton', description: 'A placeholder to show while content is loading.', icon: ItemIcon, iconUi: 'pr-px' },
  { id: 'switch', description: 'A control that toggles between two states.', icon: FormIcon },
  { id: 'textarea', description: 'A textarea element to input multi-line text.', icon: FormIcon },
  { id: 'tooltip', description: 'A popup that reveals information when hovering over an element.', icon: GroupIcon }
]

const groups: IPageGroup[] = [
  {
    id: `components`,
    label: 'Components',
    items: components.map(component => ({
      id: component.id,
      icon: component.icon ?? ItemIcon,
      iconClass: { icon: component.iconUi ?? (component.icon ? '' : 'pr-px') },
      label: `${upperName(component.id)}`,
      description: component.description,
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
