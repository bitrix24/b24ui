/**
 * Default icons
 * ---
 * @link https://bitrix24.github.io/b24icons/
 * @memo sync with docs/content/docs/1.getting-started/6.integrations/1.icons/1.nuxt.md
 * @memo sync with docs/content/docs/1.getting-started/6.integrations/1.icons/2.vue.md
 */

import { h } from 'vue'
import type { IconComponent } from '../types/icons'
import ArrowToTheLeftIcon from '@bitrix24/b24icons-vue/actions/ArrowToTheLeftIcon'
import ArrowToTheRightIcon from '@bitrix24/b24icons-vue/actions/ArrowToTheRightIcon'
import CheckIcon from '@bitrix24/b24icons-vue/outline/CheckLIcon'
import ChevronTopLIcon from '@bitrix24/b24icons-vue/outline/ChevronTopLIcon'
import ChevronToTheLeftIcon from '@bitrix24/b24icons-vue/outline/ChevronLeftLIcon'
import ChevronToTheRightIcon from '@bitrix24/b24icons-vue/outline/ChevronRightLIcon'
import DoubleShevronsRightIcon from '@bitrix24/b24icons-vue/actions/DoubleShevronsRightIcon'
import DoubleShevronsLeftIcon from '@bitrix24/b24icons-vue/actions/DoubleShevronsLeftIcon'
import CrossMIcon from '@bitrix24/b24icons-vue/outline/CrossMIcon'
import DotsIcon from '@bitrix24/b24icons-vue/button/DotsIcon'
import Refresh6Icon from '@bitrix24/b24icons-vue/actions/Refresh6Icon'
import Minus30Icon from '@bitrix24/b24icons-vue/actions/Minus30Icon'
import Plus30Icon from '@bitrix24/b24icons-vue/actions/Plus30Icon'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import LoaderWaitIcon from '@bitrix24/b24icons-vue/animated/LoaderWaitIcon'
import ChevronDownLIcon from '@bitrix24/b24icons-vue/outline/ChevronDownLIcon'
import ScreenIcon from '@bitrix24/b24icons-vue/outline/ScreenIcon'
import SunIconAir from '@bitrix24/b24icons-vue/outline/SunIcon'
import MoonIconAir from '@bitrix24/b24icons-vue/outline/MoonIcon'
import TagIcon from '@bitrix24/b24icons-vue/outline/TagIcon'
import InfoCircleIcon from '@bitrix24/b24icons-vue/outline/InfoCircleIcon'
import IdeaLampIcon from '@bitrix24/b24icons-vue/outline/IdeaLampIcon'
import WarningIcon from '@bitrix24/b24icons-vue/main/WarningIcon'
import AlertIcon from '@bitrix24/b24icons-vue/outline/AlertIcon'
import CopyIcon from '@bitrix24/b24icons-vue/outline/CopyIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'
import FileIcon from '@bitrix24/b24icons-vue/outline/FileIcon'
import UploadFileIcon from '@bitrix24/b24icons-vue/outline/UploadFileIcon'
import ArrowDownLIcon from '@bitrix24/b24icons-vue/outline/ArrowDownLIcon'
import ArrowTopLIcon from '@bitrix24/b24icons-vue/outline/ArrowTopLIcon'
import StopLIcon from '@bitrix24/b24icons-vue/outline/StopLIcon'
import RefreshIcon from '@bitrix24/b24icons-vue/outline/RefreshIcon'
import SendIcon from '@bitrix24/b24icons-vue/main/SendIcon'
import DragLIcon from '@bitrix24/b24icons-vue/outline/DragLIcon'
import GoToLIcon from '@bitrix24/b24icons-vue/outline/GoToLIcon'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'
import CloseChatIcon from '@bitrix24/b24icons-vue/outline/CloseChatIcon'
import OpenChatIcon from '@bitrix24/b24icons-vue/outline/OpenChatIcon'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import MdnwebdocsIcon from '@bitrix24/b24icons-vue/social/MdnwebdocsIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import DemonstrationOnIcon from '@bitrix24/b24icons-vue/outline/DemonstrationOnIcon'
import DesignIcon from '@bitrix24/b24icons-vue/outline/DesignIcon'
import FavoriteIcon from '@bitrix24/b24icons-vue/outline/FavoriteIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'
import NuxtIcon from '@bitrix24/b24icons-vue/file-type/NuxtIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'
import EncloseTextInCodeTagIcon from '@bitrix24/b24icons-vue/editor/EncloseTextInCodeTagIcon'
import PlayLIcon from '@bitrix24/b24icons-vue/outline/PlayLIcon'

// Inline brand icons — kept here until they ship in @bitrix24/b24icons-vue.
const CursorIcon: IconComponent = () => h('svg', {
  'xmlns': 'http://www.w3.org/2000/svg',
  'viewBox': '0 0 24 24',
  'aria-hidden': 'true',
  'data-slot': 'icon'
}, [
  h('path', {
    fill: 'currentColor',
    d: 'M11.503.131L1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23'
  })
])

const WindsurfIcon: IconComponent = () => h('svg', {
  'xmlns': 'http://www.w3.org/2000/svg',
  'viewBox': '0 0 24 24',
  'aria-hidden': 'true',
  'data-slot': 'icon'
}, [
  h('path', {
    fill: 'currentColor',
    d: 'M23.55 5.067a2.177 2.177 0 0 0-2.18 2.177v4.867a1.77 1.77 0 0 1-1.76 1.76a1.82 1.82 0 0 1-1.472-.766l-4.971-7.1a2.2 2.2 0 0 0-1.81-.942c-1.134 0-2.154.964-2.154 2.153v4.896c0 .972-.797 1.76-1.76 1.76c-.57 0-1.136-.287-1.472-.766L.408 5.16A.224.224 0 0 0 0 5.288v4.245c0 .215.066.423.188.6l5.475 7.818c.324.462.8.805 1.351.93a2.164 2.164 0 0 0 2.645-2.098V11.89c0-.972.787-1.76 1.76-1.76h.002a1.8 1.8 0 0 1 1.472.766l4.972 7.1a2.172 2.172 0 0 0 3.96-1.212v-4.895a1.76 1.76 0 0 1 1.76-1.76h.195a.22.22 0 0 0 .22-.22V5.287a.22.22 0 0 0-.22-.22Z'
  })
])

export default {
  arrowLeft: ArrowToTheLeftIcon,
  arrowRight: ArrowToTheRightIcon,
  check: CheckIcon,
  chevronDoubleLeft: DoubleShevronsLeftIcon,
  chevronDoubleRight: DoubleShevronsRightIcon,
  chevronDown: ChevronDownLIcon,
  chevronLeft: ChevronToTheLeftIcon,
  chevronRight: ChevronToTheRightIcon,
  chevronUp: ChevronTopLIcon,
  close: CrossMIcon,
  ellipsis: DotsIcon,
  external: GoToLIcon,
  file: FileIcon,
  loading: LoaderWaitIcon,
  refresh: Refresh6Icon,
  minus: Minus30Icon,
  plus: Plus30Icon,
  search: Search2Icon,
  upload: UploadFileIcon,
  system: ScreenIcon,
  light: SunIconAir,
  dark: MoonIconAir,
  hash: TagIcon,
  warning: WarningIcon,
  tip: IdeaLampIcon,
  info: InfoCircleIcon,
  // this for error
  caution: AlertIcon,
  copyCheck: CircleCheckIcon,
  copy: CopyIcon,
  imSend: SendIcon,
  arrowDown: ArrowDownLIcon,
  arrowUp: ArrowTopLIcon,
  stop: StopLIcon,
  reload: RefreshIcon,
  drag: DragLIcon,
  menu: HamburgerMenuIcon,
  panelClose: CloseChatIcon,
  panelOpen: OpenChatIcon,
  // Named icons exposed to markdown authors via `iconName`
  // (ProseCallout, ProsePrompt, page header / hero CTAs, dropdown actions, ...)
  GitHubIcon, // GitHub repository / source link
  NuxtIcon, // Nuxt-specific docs / framework references
  Bitrix24Icon, // Bitrix24 brand link
  MdnwebdocsIcon, // MDN documentation references
  MdnWebDocIcon: MdnwebdocsIcon, // legacy alias used in many ::callout blocks
  InfoCircleIcon, // generic info / about link
  DemonstrationOnIcon, // demo / playground / showcase
  DesignIcon, // "Edit this page" entry point
  FavoriteIcon, // "Star on GitHub" / favorite CTA
  MoreMIcon, // dropdown menu trigger
  AiStarsIcon, // "Explain with AI" / AI assistant entry
  EncloseTextInCodeTagIcon, // source / "View code" CTA
  PlayLIcon, // "Try it" / playground / REPL CTA
  CursorIcon, // Cursor IDE — open prompt in app
  WindsurfIcon // Windsurf IDE — open prompt in app
}
