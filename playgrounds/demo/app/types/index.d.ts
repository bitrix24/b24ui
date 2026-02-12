import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'

export interface IUser {
  id: number
  name: string
  email: string
  phone: string
}

export interface NavigationGroup {
  id: string
  label?: string
  items: NavigationMenuItem[]
}

export type Surround<T> = [T | undefined, T | undefined]
