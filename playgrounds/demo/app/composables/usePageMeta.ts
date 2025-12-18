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
import EditPencilIcon from '@bitrix24/b24icons-vue/main/EditPencilIcon'

const title = ref('Playground')

function setPageTitle(value: string): void {
  title.value = value
}

function getPageTitle(): Ref<string> {
  return title
}

const menuList: IMenuItem[] = [
  {
    label: 'b24icons',
    to: 'https://bitrix24.github.io/b24icons/',
    target: '_blank'
  },
  {
    label: 'b24jssdk',
    to: 'https://bitrix24.github.io/b24jssdk/',
    target: '_blank'
  }
]

const components: IComponentInfo[] = [
  { id: 'accordion', description: 'A stacked set of collapsible panels.', iconData: ItemIcon, iconUi: 'pr-px pb-[3px]' },
  { id: 'advice', description: 'A couple of lines of text and an avatar.', iconData: ChatMessageIcon, iconUi: 'pr-3xs' },
  { id: 'alert', description: 'A callout to draw user\'s attention.', iconData: AlertIcon },
  { id: 'avatar', description: 'An img element with fallback and Nuxt Image support.', iconData: PersonIcon },
  { id: 'badge', description: 'A short text to represent a status or a category.', iconData: ItemIcon, iconUi: 'pr-px pb-[3px]' },
  { id: 'breadcrumb', description: 'A breadcrumb navigation component.', iconData: GroupIcon },
  { id: 'button', description: 'A button element that can act as a link or trigger an action.', iconData: GroupIcon },
  { id: 'calendar', description: 'A calendar tool for choosing individual dates, multiple dates, or date spans.', iconData: Calendar1Icon },
  { id: 'card', description: 'Render the content within a card component comprising a header, body, and footer section.', iconData: GroupIcon },
  { id: 'checkbox', description: 'An input element to toggle between checked and unchecked states.', iconData: FormIcon },
  { id: 'checkbox-group', description: 'Multi-select checklist using button controls.', iconData: FormIcon },
  { id: 'collapsible', description: 'A collapsible component for showing or hiding its content.', iconData: ItemIcon, iconUi: 'pr-px pb-[3px]' },
  { id: 'color-mode', description: 'Toggle between light and dark mode.', iconData: FormIcon },
  { id: 'color-picker', description: 'A color picker component.', iconData: FormIcon },
  { id: 'chip', description: 'An indicator of a numeric value or a state.', iconData: ItemIcon, iconUi: 'pr-px pb-[3px]' },
  { id: 'confetti', description: 'Performant confetti animation in the browser.', iconData: BoldSparkleIcon },
  { id: 'command-palette', description: 'A searchable command palette powered by Fuse.js for fast, fuzzy text search.', iconData: GroupIcon },
  { id: 'container', description: 'A container lets you center and constrain the width of your content.', iconData: GroupIcon },
  { id: 'countdown', description: 'Countdown with options control.', iconData: Clock1Icon },
  { id: 'description-list', description: 'For cases where you need to convert data from one row of a table into a separate table to make the page look more complete.', iconData: GroupIcon },
  { id: 'dropdown-menu', description: 'A menu to display actions when clicking on an element.', iconData: GroupIcon },
  { id: 'context-menu', description: 'A context menu component.', iconData: GroupIcon },
  { id: 'editor', description: 'A rich text editor built on TipTap supporting markdown, HTML, and JSON content formats.', iconData: EditPencilIcon },
  { id: 'empty', description: 'An empty state component.', iconData: GroupIcon },
  { id: 'field-group', description: 'Group multiple button-like elements together.', iconData: GroupIcon },
  { id: 'file-upload', description: 'A file upload input component.', iconData: FormIcon },
  { id: 'form', description: 'A form component with built-in validation and submission handling.', iconData: FormSettingsIcon },
  { id: 'form-field', description: 'A wrapper for form elements that provides validation and error handling.', iconData: FormIcon },
  { id: 'input', description: 'An input element to enter text.', iconData: FormIcon },
  { id: 'input-menu', description: 'An autocomplete input with real-time suggestions.', iconData: FormIcon },
  { id: 'input-number', description: 'Input numerical values with a customizable range.', iconData: FormIcon },
  { id: 'input-tags', description: 'A tags input component with interactive tag elements.', iconData: FormIcon },
  { id: 'input-date', description: 'A date selection input field.', iconData: FormIcon },
  { id: 'input-time', description: 'A time selection input field.', iconData: FormIcon },
  { id: 'kbd', description: 'A kbd element to display a keyboard key.', iconData: ItemIcon, iconUi: 'pr-px pb-[3px]' },
  { id: 'modal', description: 'A dialog window that can be used to display a message or request user input.', iconData: GroupIcon },
  { id: 'navigation-menu', description: 'A link list that can be arranged in horizontal or vertical orientation.', iconData: GroupIcon },
  { id: 'link', description: 'A wrapper around NuxtLink with extra props.', iconData: GroupIcon },
  { id: 'page-card', description: 'A pre-styled card component featuring a title, description, and optional link.', iconData: GroupIcon },
  { id: 'page-links', description: 'A list of links to display on the page.', iconData: GroupIcon },
  { id: 'pagination', description: 'A navigation component with buttons or links for pagination.', iconData: GroupIcon },
  { id: 'pin-input', description: 'A PIN code input component.', iconData: GroupIcon },
  { id: 'popover', description: 'A non-modal popup window for showing messages or gathering user input.', iconData: GroupIcon },
  { id: 'progress', description: 'An indicator showing the progress of a task.', iconData: GroupIcon },
  { id: 'radio-group', description: 'A set of radio buttons to select a single option from a list.', iconData: FormIcon },
  { id: 'range', description: 'An input to select a numeric value within a range.', iconData: FormIcon },
  { id: 'scroll-area', description: 'A flexible scrollable viewport component that implements virtualization to handle large datasets with optimal performance.', iconData: GroupIcon },
  { id: 'select', description: 'A select element to choose from a list of options.', iconData: FormIcon },
  { id: 'select-menu', description: 'An advanced searchable select element.', iconData: FormIcon },
  { id: 'separator', description: 'Separates content horizontally or vertically.', iconData: GroupIcon },
  { id: 'shortcuts', description: 'A composable to define keyboard shortcuts in your app.', iconData: ItemIcon, iconUi: 'pr-px pb-[3px]' },
  { id: 'skeleton', description: 'A placeholder to show while content is loading.', iconData: ItemIcon, iconUi: 'pr-px pb-[3px]' },
  { id: 'slideover', description: 'A dialog that slides in from any side of the screen.', iconData: GroupIcon },
  { id: 'stepper', description: 'A stepper component to visualize progress in a multistep workflow.', iconData: FormIcon },
  { id: 'switch', description: 'A control that toggles between two states.', iconData: FormIcon },
  { id: 'tabs', description: 'A set of tab panels that are displayed one at a time.', iconData: FolderEmptyIcon },
  { id: 'textarea', description: 'A textarea element to input multi-line text.', iconData: FormIcon },
  { id: 'timeline', description: 'A component for displaying a chronological sequence of events, with dates, titles, and supporting icons or avatars.', iconData: GroupIcon },
  { id: 'toast', description: 'A succinct message to provide information or feedback to the user.', iconData: GroupIcon },
  { id: 'tooltip', description: 'A popup that reveals information when hovering over an element.', iconData: GroupIcon },
  { id: 'user', description: ' A component to display user details, including their name, bio, and profile picture.', iconData: GroupIcon },
  { id: 'table', description: 'A responsive data table component.', iconData: TableIcon },
  { id: 'table-wrapper', description: 'Wrapper for displaying a table.', iconData: TableIcon }
]

const componentsProse: IComponentInfo[] = [
  { id: 'show', description: 'Show same prose', iconData: TextCheckIcon }
]

const groups: IPageGroup[] = [
  {
    id: `components`,
    label: 'Components',
    children: components.map(component => ({
      id: component.id,
      to: `/components/${component.id}`,
      icon: component.iconData ?? ItemIcon,
      iconData: component.iconData ?? ItemIcon,
      iconClass: { icon: component.iconUi ?? (component.iconData ? '' : 'pr-px') },
      label: `${upperName(component.id)}`,
      description: component.description
    } as IPageItem))
  } as IPageGroup,
  {
    id: `components/prose`,
    label: 'Prose',
    children: componentsProse.map(component => ({
      id: component.id,
      to: `/components/prose/${component.id}`,
      icon: component.iconData ?? ItemIcon,
      iconData: component.iconData ?? ItemIcon,
      iconClass: { icon: component.iconUi ?? (component.iconData ? '' : 'pr-px') },
      label: `${upperName(component.id)}`,
      description: component.description
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
