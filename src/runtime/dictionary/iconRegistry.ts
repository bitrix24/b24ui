/**
 * Named icon registry for components that resolve icons by string name
 * (typically from markdown frontmatter, e.g. `icon-name: InfoCircleIcon`).
 *
 * Keys are PascalCase and match the icon component's display name.
 * Extend this registry as more components need to expose icons to authors.
 *
 * @see src/runtime/dictionary/icons.ts — short-alias dictionary used as a fallback
 */

import type { IconComponent } from '../types'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import InfoCircleIcon from '@bitrix24/b24icons-vue/outline/InfoCircleIcon'
import MdnwebdocsIcon from '@bitrix24/b24icons-vue/social/MdnwebdocsIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import DemonstrationOnIcon from '@bitrix24/b24icons-vue/outline/DemonstrationOnIcon'

const iconRegistry: Record<string, IconComponent> = {
  GitHubIcon,
  InfoCircleIcon,
  MdnWebDocIcon: MdnwebdocsIcon,
  Bitrix24Icon,
  DemonstrationOnIcon
}

export default iconRegistry
