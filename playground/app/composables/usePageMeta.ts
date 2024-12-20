import { ref, type Ref } from 'vue'
import type { IMenuItem, IPageGroup, IPageItem, IComponentInfo } from '~/types'
import { splitByCase, upperFirst } from 'scule'
import ItemIcon from '@bitrix24/b24icons-vue/crm/ItemIcon'
import FourCubes2Icon from '@bitrix24/b24icons-vue/actions/FourCubes2Icon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import FormIcon from '@bitrix24/b24icons-vue/crm/FormIcon'

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
  { id: 'link', description: 'A wrapper around NuxtLink with extra props.', icon: FourCubes2Icon },
  { id: 'button', description: 'A button element that can act as a link or trigger an action.', icon: FourCubes2Icon },
  { id: 'button-group', description: 'Group multiple button-like elements together.', icon: FourCubes2Icon },
  { id: 'input', description: 'An input element to enter text.', icon: FormIcon },
  { id: 'textarea', description: 'A textarea element to input multi-line text.', icon: FormIcon },
  { id: 'switch', description: 'A control that toggles between two states.', icon: FormIcon },
  { id: 'checkbox', description: 'An input element to toggle between checked and unchecked states.', icon: FormIcon },
  { id: 'radio-group', description: 'A set of radio buttons to select a single option from a list.', icon: FormIcon },
  { id: 'form-field', description: 'A wrapper for form elements that provides validation and error handling.', icon: FormIcon },
  { id: 'chip', description: 'An indicator of a numeric value or a state.', icon: ItemIcon, iconUi: 'pr-px' },
  { id: 'kbd', description: 'A kbd element to display a keyboard key.', icon: ItemIcon, iconUi: 'pr-px' },
  { id: 'shortcuts', description: 'A composable to define keyboard shortcuts in your app.', icon: ItemIcon, iconUi: 'pr-px' },
  { id: 'skeleton', description: 'A placeholder to show while content is loading.', icon: ItemIcon, iconUi: 'pr-px' }
]

const groups: IPageGroup[] = [
  {
    id: `components`,
    label: 'Components',
    items: components.map(component => ({
      id: component.id,
      icon: component.icon ?? ItemIcon,
      iconClass: { icon: component.iconUi ?? (component.icon ? '' : 'pr-px') },
      label: `<B24${upperName(component.id)}>`,
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
