export type MaintenanceData = {
  id: number
  title: string
  ata: string
  maintenanceMessage: string
  completed: boolean
  priority: string
  description: string
  shipId: string
  userId: string
}

export type InputMaintenance = {
  title: string
  ata: string
  maintenanceMessage: string
  completed: boolean
  priority: string
  description: string
  shipId: string
  userId: string | undefined
}