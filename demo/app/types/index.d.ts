import type { NavigationMenuItem, IconComponent } from '@bitrix24/b24ui-nuxt/types'

export interface IUser {
  id: number
  name: string
  email: string
  phone: string
}

export interface IMenuItem extends NavigationMenuItem {}

export interface IComponentInfo extends NavigationMenuItem {
  id: string
  description: string
  iconData?: IconComponent
  iconUi?: string
}

export interface IPageItem extends IComponentInfo {
  iconData: IconComponent
  label: string
  to?: string
  isActive: boolean
  iconClass: Record<'icon', string>
}

export interface IPageGroup extends NavigationMenuItem {
  id: string
  label: string
  defaultOpen: boolean
  children: IPageItem[]
}

export interface IPageGroup {
  id: string
  label: string
  items: IPageItem[]
}
