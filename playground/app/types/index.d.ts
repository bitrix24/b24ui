export interface IUser {
  id: number
  name: string
  email: string
  phone: string
}

export interface IMenuItem {
  title: string
  href: string
}

export interface IComponentInfo {
  id: string
  description: string
  icon?: DefineComponent
  iconUi?: string
}

export interface IPageItem extends IComponentInfo {
  icon: DefineComponent
  label: string
  isActive: boolean
  iconClass: Record<'icon', string>
}

export interface IPageGroup {
  id: string
  label: string
  items: IPageItem[]
}

export interface IPageGroup {
  id: string
  label: string
  items: IPageItem[]
}
