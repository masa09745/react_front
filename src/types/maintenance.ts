export type MaintenanceData = {
  id: number
  title: string
  ata: string
  completed: boolean
  priority: string
  description: string
  shipId: string
  userId: string
}

export type InputMaintenance = {
  title: string
  ATA: string
  maintenanceMessage: string
  completed: boolean
  priority: string
  description: string
  shipId: string
  userId: string | undefined
}