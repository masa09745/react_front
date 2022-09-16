export type MaintenanceData = {
  id: number
  date: string
  ata: string
  title: string
  description: string
}

export type InputMaintenance = {
  title: string
  ATA: string
  MaintenanceMessage: string
  Completed: boolean
  Priority: number
  description: string
  shipId: string
  userId: number | undefined
}