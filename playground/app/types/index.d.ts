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

export interface IPageItem {
  id: string
  icon: any
  label: string
  description: string
  isActive: boolean
}

export interface IPageGroup {
  id: string
  label: string
  items: IPageItem[]
}
