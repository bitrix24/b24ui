import { ref, type Ref } from 'vue'
import type { IMenuItem, IPageGroup, IPageItem, IComponentInfo } from '~/types'
import { splitByCase, upperFirst } from 'scule'
import ItemIcon from '@bitrix24/b24icons-vue/crm/ItemIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import FormSettingsIcon from '@bitrix24/b24icons-vue/crm/FormSettingsIcon'
import FormIcon from '@bitrix24/b24icons-vue/crm/FormIcon'
import GroupIcon from '@bitrix24/b24icons-vue/main/GroupIcon'
import Clock1Icon from '@bitrix24/b24icons-vue/main/Clock1Icon'
import ChatMessageIcon from '@bitrix24/b24icons-vue/main/ChatMessageIcon'
import AlertIcon from '@bitrix24/b24icons-vue/button/AlertIcon'
import FolderEmptyIcon from '@bitrix24/b24icons-vue/main/FolderEmptyIcon'
import BoldSparkleIcon from '@bitrix24/b24icons-vue/main/BoldSparkleIcon'
import TextCheckIcon from '@bitrix24/b24icons-vue/editor/TextCheckIcon'
import TableIcon from '@bitrix24/b24icons-vue/main/TableIcon'
import Calendar1Icon from '@bitrix24/b24icons-vue/main/Calendar1Icon'

const title = ref('Playground')

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
  { id: 'advice', description: 'A couple of lines of text and an avatar.', icon: ChatMessageIcon, iconUi: 'pr-3xs' },
  { id: 'alert', description: 'A callout to draw user\'s attention.', icon: AlertIcon },
  { id: 'avatar', description: 'An img element with fallback and Nuxt Image support.', icon: PersonIcon },
  { id: 'badge', description: 'A short text to represent a status or a category.', icon: ItemIcon, iconUi: 'pr-px pb-[3px]' },
  { id: 'button', description: 'A button element that can act as a link or trigger an action.', icon: GroupIcon },
  { id: 'button-group', description: 'Group multiple button-like elements together.', icon: GroupIcon },
  { id: 'calendar', description: 'A calendar tool for choosing individual dates, multiple dates, or date spans.', icon: Calendar1Icon },
  { id: 'checkbox', description: 'An input element to toggle between checked and unchecked states.', icon: FormIcon },
  { id: 'chip', description: 'An indicator of a numeric value or a state.', icon: ItemIcon, iconUi: 'pr-px pb-[3px]' },
  { id: 'confetti', description: 'Performant confetti animation in the browser.', icon: BoldSparkleIcon },
  { id: 'container', description: 'A container lets you center and constrain the width of your content.', icon: GroupIcon },
  { id: 'countdown', description: 'Countdown with options control.', icon: Clock1Icon },
  { id: 'description-list', description: 'For cases where you need to convert data from one row of a table into a separate table to make the page look more complete.', icon: GroupIcon },
  { id: 'dropdown-menu', description: 'A menu to display actions when clicking on an element.', icon: GroupIcon },
  { id: 'form', description: 'A form component with built-in validation and submission handling.', icon: FormSettingsIcon },
  { id: 'form-field', description: 'A wrapper for form elements that provides validation and error handling.', icon: FormIcon },
  { id: 'input', description: 'An input element to enter text.', icon: FormIcon },
  { id: 'input-menu', description: 'An autocomplete input with real-time suggestions.', icon: FormIcon },
  { id: 'input-number', description: 'Input numerical values with a customizable range.', icon: FormIcon },
  { id: 'kbd', description: 'A kbd element to display a keyboard key.', icon: ItemIcon, iconUi: 'pr-px pb-[3px]' },
  { id: 'modal', description: 'A dialog window that can be used to display a message or request user input.', icon: GroupIcon },
  { id: 'link', description: 'A wrapper around NuxtLink with extra props.', icon: GroupIcon },
  { id: 'popover', description: 'A non-modal popup window for showing messages or gathering user input.', icon: GroupIcon },
  { id: 'progress', description: 'An indicator showing the progress of a task.', icon: GroupIcon },
  { id: 'radio-group', description: 'A set of radio buttons to select a single option from a list.', icon: FormIcon },
  { id: 'range', description: 'An input to select a numeric value within a range.', icon: FormIcon },
  { id: 'select', description: 'A select element to choose from a list of options.', icon: FormIcon },
  { id: 'select-menu', description: 'An advanced searchable select element.', icon: FormIcon },
  { id: 'separator', description: 'Separates content horizontally or vertically.', icon: GroupIcon },
  { id: 'shortcuts', description: 'A composable to define keyboard shortcuts in your app.', icon: ItemIcon, iconUi: 'pr-px pb-[3px]' },
  { id: 'skeleton', description: 'A placeholder to show while content is loading.', icon: ItemIcon, iconUi: 'pr-px pb-[3px]' },
  { id: 'slideover', description: 'A dialog that slides in from any side of the screen.', icon: GroupIcon },
  { id: 'switch', description: 'A control that toggles between two states.', icon: FormIcon },
  { id: 'tabs', description: 'A set of tab panels that are displayed one at a time.', icon: FolderEmptyIcon },
  { id: 'textarea', description: 'A textarea element to input multi-line text.', icon: FormIcon },
  { id: 'toast', description: 'A succinct message to provide information or feedback to the user.', icon: GroupIcon },
  { id: 'tooltip', description: 'A popup that reveals information when hovering over an element.', icon: GroupIcon },
  { id: 'content/table-wrapper', description: 'Wrapper for displaying a table.', icon: TableIcon },
  { id: 'prose/show', description: 'Show same prose', icon: TextCheckIcon }
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
  if (name.includes('content/')) {
    return ['content / ', ...splitByCase(name.replace('content/', '')).map(p => upperFirst(p))].join('')
  } else if (name.includes('prose/')) {
    return ['prose / ', ...splitByCase(name.replace('prose/', '')).map(p => upperFirst(p))].join('')
  }
  return splitByCase(name).map(p => upperFirst(p)).join('')
}

export default {
  setPageTitle,
  getPageTitle,
  menuList,
  components,
  groups
}
