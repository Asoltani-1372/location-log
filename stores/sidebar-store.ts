import type { mapPoints } from '~/lib/type'

export interface sidebarItem {
  label: string
  icon: string
  href: string
  id: string
  location: mapPoints | null
}

export const useSidebarStore = defineStore('useSidebarStore', () => {
  const sidebarItems = ref<sidebarItem[]>([])
  const loading = ref(false)
  return {
    sidebarItems,
    loading,
  }
})
